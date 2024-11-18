import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import {
  globalSettingsQuery,
  dynamicPageSlugsQuery,
  dynamicPageBySlugQuery,
  homepageQuery,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    encodeSourceMap: preview?.token ? true : false,
    studioUrl,
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}

export const getSanityImageConfig = () => getClient()

export async function getGlobalSettings(client: SanityClient) {
  return (await client.fetch(globalSettingsQuery)) || {}
}

export async function getDynamicPageBySlug(client: SanityClient, slug: string) {
  return (await client.fetch(dynamicPageBySlugQuery, { slug })) || ({} as any)
}

export async function getAllDynamicPageSlugs() {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(dynamicPageSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getHomepage(client: SanityClient) {
  return (await client.fetch(homepageQuery)) || {}
}
