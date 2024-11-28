import { readToken } from 'lib/sanity.api'
import {
  getGlobalSettings,
  getClient,
  getRatePageBySlug,
  getAllRatePageSlugs,
  getAllLocationSlugs,
  getLocationBySlug,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import type { SharedPageProps, Seo } from 'pages/_app'
import { QueryParams } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
import { LocationPage, GlobalSettingsType } from 'types/sanity'
import { locationBySlugQuery } from 'lib/sanity.queries'

import LocationPageComponent from 'components/pages/LocationPage'
interface PageProps extends SharedPageProps {
  locationPage: LocationPage
  globalSettings: GlobalSettingsType
  params: QueryParams
  seo: Seo
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const [data] = useLiveQuery<LocationPage>(
    props.locationPage,
    locationBySlugQuery,
    props.params,
  )
  return (
    <Layout seo={props.seo}>
      <LocationPageComponent data={data} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [globalSettings, locationPage] = await Promise.all([
    getGlobalSettings(client),
    getLocationBySlug(client, params.slug),
  ])

  if (!locationPage) {
    return {
      notFound: true,
    }
  }

  const seo = {
    title: locationPage?.title || '',
    description: locationPage?.metaDescription || '',
    image: locationPage?.mainImage || '',
    keywords: locationPage?.keywords || '',
  }
  return {
    props: {
      locationPage,
      params,
      globalSettings,
      draftMode,
      seo,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllLocationSlugs()
  return {
    paths: slugs?.map(({ slug }) => `/locations/${slug}`) || [],
    fallback: 'blocking',
  }
}
