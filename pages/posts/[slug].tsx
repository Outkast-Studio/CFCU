import { readToken } from 'lib/sanity.api'
import {
  getGlobalSettings,
  getClient,
  getRatePageBySlug,
  getAllRatePageSlugs,
  getAllIndividualPostSlugs,
  getIndividualPostBySlug,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import type { SharedPageProps, Seo } from 'pages/_app'
import { QueryParams } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
import { RatePageType, GlobalSettingsType, PostPageType } from 'types/sanity'
import { individualPostBySlugQuery } from 'lib/sanity.queries'
import PostPage from 'components/pages/PostPage'
import { useEffect } from 'react'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'

interface PageProps extends SharedPageProps {
  postPage: PostPageType
  globalSettings: GlobalSettingsType
  params: QueryParams
  seo: Seo
}

interface Query {
  [key: string]: string
}

export default function PostSlugRoute(props: PageProps) {
  const [data] = useLiveQuery<PostPageType>(
    props.postPage,
    individualPostBySlugQuery,
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
      <PostPage data={data} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [globalSettings, postPage] = await Promise.all([
    getGlobalSettings(client),
    getIndividualPostBySlug(client, params.slug),
  ])

  if (!postPage) {
    return {
      notFound: true,
    }
  }

  const seo = {
    title: postPage?.title || '',
    description: postPage?.metaDescription || '',
    image: postPage?.mainImage || '',
    keywords: postPage?.keywords || '',
  }
  return {
    props: {
      postPage,
      params,
      globalSettings,
      draftMode,
      seo,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllIndividualPostSlugs()
  return {
    paths: slugs?.map(({ slug }) => `/posts/${slug}`) || [],
    fallback: 'blocking',
  }
}
