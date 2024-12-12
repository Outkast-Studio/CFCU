import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createClient,
  groq,
  type SanityClient,
  type SanityDocument,
} from 'next-sanity'
import { parseBody, type ParsedBody } from 'next-sanity/webhook'

export { config } from 'next-sanity/webhook'

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )
    if (!isValidSignature) {
      const message = 'Invalid signature'
      return res.status(401).send(message)
    }

    if (typeof body?._id !== 'string' || !body?._id) {
      const invalidId = 'Invalid _id'
      console.error(invalidId, { body })
      return res.status(400).send(invalidId)
    }
    const staleRoutes = await queryStaleRoutes(body as any)
    console.log(staleRoutes)
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
}

type StaleRoute = '/' | `/${string}` | '/test-modules' | string

async function queryStaleRoutes(
  body: Pick<
    ParsedBody<SanityDocument>['body'],
    '_type' | '_id' | 'date' | 'slug'
  >,
): Promise<StaleRoute[]> {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

  // return queryAllRoutes(client)

  //Check if type is a module -> If it is, run the moduleHandler to find all slugs that reference that module. Then return them.
  // If the type is not a module -> return the appropriate route for that type.
  if (moduleTypes.includes(body._type)) {
    return await moduleHandler(client, body)
  } else {
    switch (body._type) {
      case 'globalSettings':
        return await queryAllRoutes(client)
      case 'blogHomepage':
        return await getAllPostHomePageSlugs(client)
      case 'homepage':
        return ['/']
      case 'location':
        return await getIndividualLocationSlugs(client, body._id)
      case 'locationHomepage':
        return ['/locations']
      case 'post':
        return await getIndividualPostSlugs(client, body._id)
      case 'topic':
        return await getTopicPostPageSlugs(client, body._id)
      case 'subPage':
        return await querySubPageRoutes(client, body._id)
      default:
        console.log(body)
    }
  }
}

async function _queryAllRoutes(client: SanityClient): Promise<string[]> {
  return await client.fetch(groq`*[_type == "article"].slug.current`)
}

async function queryAllRoutes(client: SanityClient): Promise<StaleRoute[]> {
  const routes = await client.fetch(
    groq`*[_type in ["post", "location", "subPage"]].slug.current`,
  )
  const allTopics = await client.fetch(groq`*[_type == "topic"]`)

  const topicPagesThatNeedToBeRevalidated = await Promise.all(
    allTopics.map(async (topic) => {
      const slugs = await getTopicPostPageSlugs(client, topic._id)
      return slugs
    }),
  ).then((slugArrays) => slugArrays.flat())

  const postHomeRoutes = await getAllPostHomePageSlugs(client)

  return [
    '/',
    '/locations',
    '/test-modules',
    ...routes.map((slug) => `/${slug}`),
    ...topicPagesThatNeedToBeRevalidated,
    ...postHomeRoutes,
  ]
}

async function querySubPageRoutes(
  client: SanityClient,
  subPageId: string,
): Promise<StaleRoute[]> {
  const subPage = await client.fetch(
    groq`*[_type == "post" && _id == $subPageId][0]{
      _id,
      slug,
      parent->{
        slug
      }
    }`,
    { subPageId },
  )
  const allOtherSlugs = await getAllRefercingSlugs(
    client,
    subPageId,
    moduleTypes,
  )
  ///TODO Query all pages that reference this subPage.
  if (subPage.parent) {
    return [
      `/${subPage.slug.current}`,
      `/${subPage.parent.slug.current}`,
      ...allOtherSlugs,
    ]
  }
  return [`/${subPage.slug.current}`, ...allOtherSlugs]
}

// Mapping for pages without slugs
const pagesWithoutSlugs = {
  homepage: '/',
  locationHomepage: '/locations',
}

async function moduleHandler(client: SanityClient, body: any) {
  const moduleId = body._id
  const allRoutesRefferedTo = await client.fetch(
    groq`*[
    _type in ["subPage", "post", "location", "homepage", "locationHomepage", 'testModules'] 
    && references($moduleId)
  ]{
    _type,
    "slug": coalesce(slug.current, null)
  }
  `,
    { moduleId },
  )

  // Process the results to handle pages without slugs and format routes
  const processedRoutes = allRoutesRefferedTo
    .map((route: { _type: string; slug: string | null }) => {
      if (route.slug === null && route._type in pagesWithoutSlugs) {
        // Use predefined slug for pages without slugs
        return {
          _type: route._type,
          slug: pagesWithoutSlugs[
            route._type as keyof typeof pagesWithoutSlugs
          ],
        }
      } else if (route.slug) {
        // Format slug for pages with slugs
        return {
          _type: route._type,
          slug: '/' + route.slug, // Special case for homepage
        }
      } else {
        console.warn(`Unexpected document type without slug: ${route._type}`)
        return null
      }
    })
    .filter((route) => route !== null)
    .map((route) => route.slug)

  return processedRoutes
}

//This will calculate the amount of pages based on the total number of posts and the number of posts per page.
async function getAllPostHomePageSlugs(
  client: SanityClient,
): Promise<string[]> {
  // Fetch the total number of blog posts
  const totalPosts = await client.fetch(groq`count(*[_type == "post"])`)
  const postsPerPage = 10 // Adjust this based on your pagination setup

  // Calculate the number of pages
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  // Generate routes for each page
  return Array.from(
    { length: totalPages },
    (_, i) => `/posts/page/${String(i + 1)}`,
  )
}

async function getIndividualPostSlugs(
  client: SanityClient,
  postId: string,
): Promise<string[]> {
  const allPostPages = await getAllPostHomePageSlugs(client)
  //FOR each of the topic pages we have to revalidate all pages.
  const post = await client.fetch(
    groq`*[_type == "post" && _id == $postId][0]{
      _id,
      slug,
      topics[]->{
        _id,
        slug
      }
    }`,
    { postId },
  )

  const topicPagesThatNeedToBeRevalidated = await Promise.all(
    post.topics.map(async (topic) => {
      const slugs = await getTopicPostPageSlugs(client, topic._id)
      return slugs
    }),
  ).then((slugArrays) => slugArrays.flat())

  // Find modules that reference this post
  const referencingModules = await client.fetch(
    groq`*[_type in ["getInspired", "relatedStories"] && references($postId)]._id`,
    { postId },
  )

  // Use moduleRevalidation for each referencing module
  const moduleRevalidationSlugs = await Promise.all(
    referencingModules.map(async (moduleId) => {
      return moduleHandler(client, { _id: moduleId })
    }),
  ).then((slugArrays) => slugArrays.flat())

  const allOtherSlugs = await getAllRefercingSlugs(client, postId, moduleTypes)

  return [
    ...allPostPages,
    `/${post.slug.current}`,
    ...topicPagesThatNeedToBeRevalidated,
    ...moduleRevalidationSlugs,
    ...allOtherSlugs,
  ]
}

async function getAllRefercingSlugs(
  client: SanityClient,
  id: string,
  modules: string[],
): Promise<string[]> {
  const referencingPages = await client.fetch(
    groq`*[references($id) && _type in ["subPage", "post", "topic", 'homepage', 'locationHomePage', 'blogHomePage', 'globalSettings']]{
      _type,
      "slug": slug.current
    }`,
    { id },
  )

  if (referencingPages.find((page) => page._type === 'globalSettings')) {
    const allRoutes = await queryAllRoutes(client)
    return allRoutes
  }

  const referencingPagesSlugs = referencingPages
    .map((route: { _type: string; slug: string | null }) => {
      if (route.slug === null && route._type in pagesWithoutSlugs) {
        // Use predefined slug for pages without slugs
        return {
          _type: route._type,
          slug: pagesWithoutSlugs[
            route._type as keyof typeof pagesWithoutSlugs
          ],
        }
      } else if (route.slug) {
        // Format slug for pages with slugs
        return {
          _type: route._type,
          slug: '/' + route.slug, // Special case for homepage
        }
      } else {
        console.warn(`Unexpected document type without slug: ${route._type}`)
        return null
      }
    })
    .filter((route) => route !== null)
    .map((route) => route.slug)

  // Find modules that reference this location
  const referencingModules = await client.fetch(
    groq`*[_type in $modules && references($id)]._id`,
    { id, modules },
  )

  console.log(referencingModules, 'This is the referencing modules')
  // Use moduleRevalidation for each referencing module
  const moduleRevalidationSlugs = await Promise.all(
    referencingModules.map(async (moduleId) => {
      return moduleHandler(client, { _id: moduleId })
    }),
  ).then((slugArrays) => slugArrays.flat())

  const slugsToRevalidate = [
    ...referencingPagesSlugs,
    ...moduleRevalidationSlugs,
  ]
  // Remove duplicates
  return Array.from(new Set(slugsToRevalidate))
}

async function getIndividualLocationSlugs(
  client: SanityClient,
  locationId: string,
): Promise<string[]> {
  const location = await client.fetch(
    groq`*[_type == "location" && _id == $locationId][0]{
      _id,
      slug,
    }`,
    { locationId },
  )

  const allOtherSlugs = await getAllRefercingSlugs(
    client,
    locationId,
    moduleTypes,
  )

  // Combine all slugs
  const slugsToRevalidate = [
    `/${location.slug.current}`,
    '/locations',
    ...allOtherSlugs,
  ]

  // Remove duplicates
  return Array.from(new Set(slugsToRevalidate))
}

export async function getTopicPostPageSlugs(
  client: SanityClient,
  topicId: string,
): Promise<string[]> {
  // Fetch the total number of blog posts for the given topic

  ///TODO Query all pages that reference this topic.
  const totalPosts = await client.fetch(
    groq`count(*[_type == "post" && references($topicId)])`,
    { topicId },
  )

  const allOtherSlugs = await getAllRefercingSlugs(client, topicId, moduleTypes)

  const postsPerPage = 10 // Adjust this based on your pagination setup
  // Calculate the number of pages
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  // Fetch the topic slug
  const topicSlug = await client.fetch(
    groq`*[_type == "topic" && _id == $topicId][0].slug.current`,
    { topicId },
  )
  if (!topicSlug) {
    throw new Error(`Topic with ID ${topicId} not found`)
  }
  // Generate routes for each page
  return [
    ...Array.from({ length: totalPages }, (_, i) => `/${topicSlug}/${i + 1}`),
    ...allOtherSlugs,
  ]
}

const moduleTypes = [
  'ctaInContent',
  'ctaTopicRow',
  'ctaCardGridHome',
  'ctaCardGrid',
  'ctaText',
  'ctaFullMedia',
  'getInspired',
  'textCardGrid',
  'relatedStories',
  'accordion',
  'siteAlert',
  'tabs',
  'columnSplit',
  'imageGrid',
  'quickExit',
  'wysiwyg',
  'teamGrid',
  'embed',
  'rateTable',
]
