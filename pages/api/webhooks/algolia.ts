import { NextApiRequest, NextApiResponse } from 'next'
import { algoliasearch } from 'algoliasearch'
import {
  getClient,
  getAllLocations,
  getAllSubpages,
  getAllPostsWithoutPagination,
} from 'lib/sanity.client'

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!
const algoliaApiKey = process.env.ALGOLIA_API_KEY!
const indexName = process.env.ALGOLIA_INDEX_NAME!

const algoliaClient = algoliasearch(algoliaAppId, algoliaApiKey)

// Function to transform location data
function transformLocationData(doc: any) {
  return {
    objectID: doc._id,
    title: doc.title,
    slug: doc.slug?.current,
    services: doc.services || [],
    appointmentLink: doc.appointmentLink,
    type: doc._type,
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
    searchData: doc.searchData,
    // Create searchable text field combining key information
    searchableText: [
      doc.title,
      doc.address,
      doc.phoneNumber,
      ...(doc.services || []),
      doc.metaTitle,
      doc.metaDescription,
      doc.searchData,
      doc._type,
    ]
      .filter(Boolean)
      .join(' '),
  }
}

// Function to transform subpage data
function transformSubpageData(doc: any) {
  return {
    objectID: doc._id,
    title: doc.title,
    slug: doc.slug?.current,
    pageHero: doc.pageHero,
    type: doc._type,
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
    searchData: doc.searchData,
    // Create searchable text field
    searchableText: [
      doc.title,
      doc.metaTitle,
      doc.metaDescription,
      doc._type,
      doc.pageHero?.title,
      doc.pageHero?.subtitle,
      doc.searchData,
    ]
      .filter(Boolean)
      .join(' '),
  }
}

// Function to transform post data
function transformPostData(doc: any) {
  return {
    objectID: doc._id,
    title: doc.title,
    slug: doc.slug?.current,
    type: doc._type,
    date: doc.date,
    excerpt: doc.excerpt,
    topics: doc.topics || [],
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
    searchData: doc.searchData,

    // Create searchable text field
    searchableText: [
      doc.title,
      doc.excerpt,
      doc._type,
      doc.metaTitle,
      doc.metaDescription,
      doc.searchData,
      ...(doc.topics?.map((topic: any) => topic.title) || []),
    ]
      .filter(Boolean)
      .join(' '),
  }
}

// Function to perform initial indexing
async function performInitialIndexing() {
  console.log('Starting initial indexing...')

  const client = getClient()

  // Fetch all documents from Sanity
  const [locations, subpages, posts] = await Promise.all([
    getAllLocations(client),
    getAllSubpages(client),
    getAllPostsWithoutPagination(client),
  ])

  console.log(
    `Found ${locations.length} locations, ${subpages.length} subpages, ${posts.length} posts`,
  )

  // Transform all documents
  const allRecords = [
    ...locations.map(transformLocationData),
    ...subpages.map(transformSubpageData),
    ...posts.map(transformPostData),
  ]

  // Save all records to Algolia
  await algoliaClient.saveObjects({
    indexName,
    objects: allRecords,
  })

  console.log(
    `Initial indexing completed. Indexed ${allRecords.length} total documents (${locations.length} locations, ${subpages.length} subpages, ${posts.length} posts).`,
  )
  return {
    message: `Successfully completed initial indexing of ${allRecords.length} documents!`,
    breakdown: {
      locations: locations.length,
      subpages: subpages.length,
      posts: posts.length,
      total: allRecords.length,
    },
  }
}

// Function to transform webhook data based on document type
function transformWebhookData(_id: string, value: any) {
  switch (value._type) {
    case 'location':
      return transformLocationData({ _id, ...value })
    case 'subPage':
      return transformSubpageData({ _id, ...value })
    case 'post':
      return transformPostData({ _id, ...value })
    default:
      console.warn(`Unknown document type: ${value._type}`)
      return null
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { initialIndex } = req.query

    // Perform initial indexing
    if (initialIndex === 'true') {
      const response = await performInitialIndexing()
      return res.status(200).json(response)
    }

    // Incremental updates based on webhook payload
    const payload = req.body

    if (!payload) {
      console.warn('No JSON payload provided')
      return res.status(400).json({ error: 'No payload provided' })
    }

    console.log('Parsed Payload:', JSON.stringify(payload))

    const { _id, operation, value } = payload

    if (!operation || !_id) {
      return res.status(400).json({
        error: 'Invalid payload, missing required fields',
      })
    }

    if (operation === 'delete') {
      // Handle delete operation
      await algoliaClient.deleteObject({
        indexName,
        objectID: _id,
      })
      console.log(`Deleted document with ID: ${_id}`)
      return res.status(200).json({
        message: `Successfully deleted document with ID: ${_id}`,
      })
    } else {
      // For create/update operations, we need the value
      if (!value) {
        return res.status(400).json({
          error: 'Invalid payload, missing value for create/update operation',
        })
      }

      // Transform the data based on document type
      const algoliaRecord = transformWebhookData(_id, value)

      if (!algoliaRecord) {
        return res.status(400).json({
          error: `Unsupported document type: ${value._type}`,
        })
      }

      // Add or update the document in Algolia
      await algoliaClient.saveObject({
        indexName,
        body: algoliaRecord,
      })

      console.log(`Indexed/Updated ${value._type} with ID: ${_id}`)
      return res.status(200).json({
        message: `Successfully processed ${value._type} with ID: ${_id}!`,
      })
    }
  } catch (error: any) {
    console.error('Error indexing documents:', error.message)
    return res.status(500).json({
      error: 'Error indexing documents',
      details: error.message,
    })
  }
}
