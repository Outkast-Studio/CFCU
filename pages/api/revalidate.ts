/**
 * This code is responsible for revalidating the cache when a post or author is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Dataset: Choose desired dataset or leave at default "all datasets"
 * 5. Trigger on: "Create", "Update", and "Delete"
 * 6. Filter: _type == "post" || _type == "author" || _type == "settings"
 * 7. Projection: Leave empty
 * 8. Status: Enable webhook
 * 9. HTTP method: POST
 * 10. HTTP Headers: Leave empty
 * 11. API version: v2021-03-25
 * 12. Include drafts: No
 * 13. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random secret if you haven't yet)
 * 14. Save the cofiguration
 * 15. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 16. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

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
      case 'post':
        return await getIndividualPostSlugs(client, body._id)
      case 'topic':
        return await getTopicPostPageSlugs(client, body._id)
      case 'subPage':
        return await querySubPageRoutes(client, body._id)
      case 'post':
        return await queryPostRoutes(client)
      default:
        console.log(body)
    }
  }
}

async function _queryAllRoutes(client: SanityClient): Promise<string[]> {
  return await client.fetch(groq`*[_type == "article"].slug.current`)
}

async function queryAllRoutes(client: SanityClient): Promise<StaleRoute[]> {
  const postRoutes = await client.fetch(groq`*[_type == "post"].slug.current`)

  const subPageRoutes = await client.fetch(
    groq`*[_type == "subPage"].slug.current`,
  )

  //TODO see if theres an elegant way to find where the data is being used and revalidate that component.
  return [
    '/',
    '/test-modules',
    ...postRoutes.map((slug) => `/${slug}`),
    ...subPageRoutes.map((slug) => `/${slug}`),
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
  if (subPage.parent) {
    return [`/${subPage.slug.current}`, `/${subPage.parent.slug.current}`]
  }
  return [`/${subPage.slug.current}`]
}

async function queryPostRoutes(client: SanityClient): Promise<StaleRoute[]> {
  const postRoutes = await client.fetch(
    groq`*[_type == "openPosition"].slug.current`,
  )
  return [...postRoutes.map((slug) => `/${slug}`)]
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
    _type in ["subPage", "post", "location", "homepage", "locationHomepage"] 
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
  console.log(post, 'This is the post')

  const topicPagesThatNeedToBeRevalidated = await Promise.all(
    post.topics.map(async (topic) => {
      const slugs = await getTopicPostPageSlugs(client, topic._id)
      return slugs
    }),
  ).then((slugArrays) => slugArrays.flat())

  console.log(topicPagesThatNeedToBeRevalidated, 'These are the topics')
  return [
    ...allPostPages,
    `/${post.slug.current}`,
    ...topicPagesThatNeedToBeRevalidated,
  ]
}

export async function getTopicPostPageSlugs(
  client: SanityClient,
  topicId: string,
): Promise<string[]> {
  // Fetch the total number of blog posts for the given topic
  const totalPosts = await client.fetch(
    groq`count(*[_type == "post" && references($topicId)])`,
    { topicId },
  )
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
  return Array.from({ length: totalPages }, (_, i) => `/${topicSlug}/${i + 1}`)
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

//Functions needed:
//ModuleHandler.
//Handle Post type.
//Handle Homepage type.
//Handle topic type.
//Handle blogHomepage Type.
//Handle individualPost type.
//Handle location type.
//Handle locationHomepage type.

// {
//   _createdAt: '2024-11-27T00:44:04Z',
//   _rev: 'ghY242dzA1Js3AqZtHhGE2',
//   _id: '25d36294-a973-4386-aa81-09eae71237ff',
//   _updatedAt: '2024-12-11T20:55:03Z',
//   _type: 'ctaText',
//   title: 'Become a Member today',
//   theme: { label: 'Yellow', value: '#FFC600' },
//   cta: {
//     link: {
//       _type: 'reference',
//       _ref: 'd6113c1f-933a-40dc-9fba-7c5062620baa'
//     },
//     title: 'Apply Today',
//     _type: 'pageLink'
//   },
//   subtitle: 'THE BIG STUFF, DONE BETTER',
//   description: [
//     {
//       _key: '3928d44ebef4',
//       _type: 'block',
//       children: [Array],
//       markDefs: [],
//       style: 'normal'
//     }
//   ]
// }
