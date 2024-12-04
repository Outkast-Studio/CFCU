import { readToken } from 'lib/sanity.api'
import {
  getGlobalSettings,
  getClient,
  getAllPosts,
  getBlogHomepage,
  getAllTopics,
} from 'lib/sanity.client'
import {
  allPostsQuery,
  globalSettingsQuery,
  blogHomepageQuery,
} from 'lib/sanity.queries'
import {
  GlobalSettingsType,
  BlogHomepageType,
  PostPageType,
  TopicWithRelatedPosts,
} from 'types/sanity'
import { GetStaticProps } from 'next'
import { QueryParams } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { useEffect } from 'react'
import LocationHomePage from 'components/pages/LocationHomePage'
import PostHomePage from 'components/pages/PostHomePage'
import { Seo } from 'pages/_app'

interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
  allPosts: PostPageType[]
  blogHomepage: BlogHomepageType
  allTopics?: TopicWithRelatedPosts[]
  seo: Seo
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<GlobalSettingsType>(
    props.globalSettings,
    globalSettingsQuery,
  )
  const [allPosts] = useLiveQuery<PostPageType[]>(props.allPosts, allPostsQuery)
  const [blogHomepage] = useLiveQuery<BlogHomepageType>(
    props.blogHomepage,
    blogHomepageQuery,
  )

  const [allTopics] = useLiveQuery<TopicWithRelatedPosts[]>(
    props.allTopics,
    allPostsQuery,
  )

  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  useEffect(() => {
    setGlobalSettings(data)
  }, [data, setGlobalSettings])

  return (
    <Layout seo={props.seo}>
      <PostHomePage
        allPosts={allPosts}
        data={blogHomepage}
        allTopics={allTopics}
        isBlogHome={true}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)
  const blogHomepage = await getBlogHomepage(client)
  const allPosts = await getAllPosts(client)
  const allTopics = await getAllTopics(client)

  const seo = {
    title: blogHomepage?.metaTitle || 'Get Inspired | CFCU',
    description: blogHomepage?.metaDescription || '',
    image: blogHomepage?.ogImage || '',
    keywords: blogHomepage?.keywords || '',
  }

  return {
    props: {
      globalSettings,
      allPosts,
      params,
      allTopics,
      draftMode,
      blogHomepage,
      token: draftMode ? readToken : '',
      seo,
    },
  }
}
