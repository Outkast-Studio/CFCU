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
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
}

type StaleRoute = '/' | `/${string}` | '/test-modules'

async function queryStaleRoutes(
  body: Pick<
    ParsedBody<SanityDocument>['body'],
    '_type' | '_id' | 'date' | 'slug'
  >,
): Promise<StaleRoute[]> {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false })
  switch (body._type) {
    case 'globalSettings':
      return await queryAllRoutes(client)
    case 'homepage':
      return ['/']
    case 'subPage':
      return await querySubPageRoutes(client)
    case 'post':
      return await queryPostRoutes(client)
    default:
      console.log(body)
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

  return [
    '/',
    '/test-modules',
    ...postRoutes.map((slug) => `/${slug}`),
    ...subPageRoutes.map((slug) => `/${slug}`),
  ]
}

async function querySubPageRoutes(client: SanityClient): Promise<StaleRoute[]> {
  const postRoutes = await client.fetch(
    groq`*[_type == "subPage"].slug.current`,
  )
  return [...postRoutes.map((slug) => `/${slug}`)]
}

async function queryPostRoutes(client: SanityClient): Promise<StaleRoute[]> {
  const postRoutes = await client.fetch(
    groq`*[_type == "openPosition"].slug.current`,
  )
  return [...postRoutes.map((slug) => `/${slug}`)]
}
