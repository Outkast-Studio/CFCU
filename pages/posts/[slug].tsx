import { readToken } from 'lib/sanity.api'
import {
  getGlobalSettings,
  getClient,
  getAllIndividualPostSlugs,
  getIndividualPostBySlug,
  getTopicBySlug,
  getAllTopicSlugs,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import type { SharedPageProps, Seo } from 'pages/_app'
import { QueryParams } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
import {
  RatePageType,
  GlobalSettingsType,
  PostPageType,
  TopicPageType,
} from 'types/sanity'
import { individualPostBySlugQuery, topicBySlugQuery } from 'lib/sanity.queries'
import PostPage from 'components/pages/PostPage'
import { useEffect } from 'react'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { stegaClean } from '@sanity/client/stega'
import PostHomePage from 'components/pages/PostHomePage'

type TopicPageData = {
  data: TopicPageType
  relatedPosts: PostPageType[]
}

type PageData = PostPageType | TopicPageData

interface PageProps extends SharedPageProps {
  pageData: PageData
  globalSettings: GlobalSettingsType
  params: QueryParams
  pageType: 'post' | 'topic'
  seo: Seo
}

interface Query {
  [key: string]: string
}

export default function PostSlugRoute(props: PageProps) {
  const postData = useLiveQuery<PageData>(
    stegaClean(props.pageType) === 'post' ? props.pageData : null,
    individualPostBySlugQuery,
    props.params,
  )[0]

  const topicPageData = useLiveQuery<PageData>(
    stegaClean(props.pageType) === 'topic' ? props.pageData : null,
    topicBySlugQuery,
    props.params,
  )[0]

  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )

  useEffect(() => {
    setGlobalSettings(props.globalSettings)
  }, [setGlobalSettings, props.globalSettings])

  const data = stegaClean(props.pageType) === 'post' ? postData : topicPageData

  switch (stegaClean(props.pageType)) {
    case 'post':
      return (
        <Layout seo={props.seo}>
          <PostPage data={data as PostPageType} />
        </Layout>
      )
    case 'topic':
      return (
        <Layout seo={props.seo}>
          <PostHomePage
            data={data as unknown as TopicPageData['data']}
            // TODO: Fix this type
            //@ts-ignore
            allPosts={data.relatedPosts as PostPageType[]}
          />
        </Layout>
      )
    default:
      return <></>
  }
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const postSlug = 'posts/' + params.slug
  const pageType = await client.fetch(
    `
      *[slug.current == $slug][0]._type
    `,
    { slug: postSlug },
  )

  console.log(params.slug)
  if (!pageType) {
    return { notFound: true }
  }

  let pageData
  switch (pageType) {
    case 'post':
      pageData = await getIndividualPostBySlug(client, postSlug)
      break
    case 'topic':
      pageData = await getTopicBySlug(client, postSlug)
      break
    // Add more cases for other page types
    default:
      return { notFound: true }
  }

  if (!pageData) {
    return { notFound: true }
  }

  const globalSettings = await getGlobalSettings(client)

  const seo = {
    title: pageData?.metaTitle || pageData?.title + ' | CFCU',
    description: pageData?.metaDescription || '',
    image: pageData?.ogImage || '',
    keywords: pageData?.keywords || '',
  }
  return {
    props: {
      pageData,
      pageType,
      params,
      globalSettings,
      draftMode,
      seo,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = (await getAllIndividualPostSlugs()).map((slug) =>
    removePostPrefix(slug.slug),
  )
  const topicSlugs = await (
    await getAllTopicSlugs()
  ).map((slug) => removePostPrefix(slug.slug))

  return {
    paths: [...slugs, ...topicSlugs]?.map(({ slug }) => `/posts/${slug}`) || [],
    fallback: 'blocking',
  }
}
function removePostPrefix(slug) {
  // Check if the slug starts with 'post/'
  if (slug.startsWith('posts/')) {
    // If it does, remove 'post/' and return the rest
    return slug.slice(6)
  } // If it doesn't start with 'post/', return the original slug
  return slug
}
