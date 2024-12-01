import { readToken } from 'lib/sanity.api'
import {
  getGlobalSettings,
  getClient,
  getAllPosts,
  getBlogHomepage,
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

interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
  allPosts: PostPageType[]
  blogHomepage: BlogHomepageType
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

  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  useEffect(() => {
    setGlobalSettings(data)
  }, [data, setGlobalSettings])

  return (
    <Layout>
      <PostHomePage allPosts={allPosts} data={blogHomepage} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)
  const blogHomepage = await getBlogHomepage(client)
  const allPosts = await getAllPosts(client)

  return {
    props: {
      globalSettings,
      allPosts,
      params,
      draftMode,
      blogHomepage,
      token: draftMode ? readToken : '',
    },
  }
}
