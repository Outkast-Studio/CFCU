import { readToken } from 'lib/sanity.api'
import {
  getGlobalSettings,
  getClient,
  getRatePageBySlug,
  getAllRatePageSlugs,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import type { SharedPageProps, Seo } from 'pages/_app'
import { QueryParams } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
import { RatePageType, GlobalSettingsType } from 'types/sanity'
import { ratePageBySlugQuery } from 'lib/sanity.queries'
import RatePageComponent from 'components/pages/RatePage'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { useEffect } from 'react'

interface PageProps extends SharedPageProps {
  ratePage: RatePageType
  globalSettings: GlobalSettingsType
  params: QueryParams
  seo: Seo
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const [data] = useLiveQuery<RatePageType>(
    props.ratePage,
    ratePageBySlugQuery,
    props.params,
  )
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )

  useEffect(() => {
    setGlobalSettings(props.globalSettings)
  }, [setGlobalSettings, props.globalSettings])
  return (
    <Layout seo={props.seo}>
      <RatePageComponent data={data} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [globalSettings, ratePage] = await Promise.all([
    getGlobalSettings(client),
    getRatePageBySlug(client, 'rates/' + params.slug),
  ])

  if (!ratePage) {
    return {
      notFound: true,
    }
  }

  const seo = {
    title: ratePage?.metaTitle || ratePage?.title + ' | CFCU',
    description: ratePage?.metaDescription || '',
    image: ratePage?.ogImage || '',
    keywords: ratePage?.keywords || '',
  }

  return {
    props: {
      ratePage,
      params,
      globalSettings,
      draftMode,
      seo,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = (await getAllRatePageSlugs()).map((slug) =>
    removeRatePrefix(slug.slug),
  )
  return {
    paths: slugs?.map(({ slug }) => `/rates/${slug}`) || [],
    fallback: 'blocking',
  }
}

function removeRatePrefix(slug) {
  // Check if the slug starts with 'post/'
  if (slug.startsWith('rates/')) {
    // If it does, remove 'post/' and return the rest
    return slug.slice(6)
  } // If it doesn't start with 'post/', return the original slug
  return slug
}
