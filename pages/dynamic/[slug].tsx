import { readToken } from 'lib/sanity.api'
import {
  getGlobalSettings,
  getAllDynamicPageSlugs,
  getDynamicPageBySlug,
  getClient,
} from 'lib/sanity.client'
import {
  dynamicPageBySlugQuery,
  type GlobalSettingsType,
} from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps, Seo } from 'pages/_app'
import WorkPage from 'components/Work'
import { QueryParams } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
interface PageProps extends SharedPageProps {
  dynamicPage: any
  globalSettings: GlobalSettingsType
  params: QueryParams
  seo: Seo
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const [data] = useLiveQuery<any>(
    props.dynamicPage,
    dynamicPageBySlugQuery,
    props.params,
  )
  return (
    <Layout seo={props.seo}>
      <WorkPage work={data} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [globalSettings, dynamicPage] = await Promise.all([
    getGlobalSettings(client),
    getDynamicPageBySlug(client, params.slug),
  ])

  if (!dynamicPage) {
    return {
      notFound: true,
    }
  }

  const seo = {
    title: dynamicPage?.title || '',
    description: dynamicPage?.metaDescription || '',
    image: dynamicPage?.mainImage || '',
    keywords: dynamicPage?.keywords || '',
  }
  return {
    props: {
      dynamicPage,
      params,
      globalSettings,
      draftMode,
      seo,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllDynamicPageSlugs()
  return {
    paths: slugs?.map(({ slug }) => `/work/${slug}`) || [],
    fallback: 'blocking',
  }
}
