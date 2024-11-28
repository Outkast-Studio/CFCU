import { GetStaticProps, GetStaticPaths } from 'next'
import {
  getClient,
  getSubPageBySlug,
  getPostBySlug,
  getGlobalSettings,
} from 'lib/sanity.client'
import PostPage from '../components/pages/PostPage'
import SubPage from '../components/pages/SubPage'
import { SubPageType, PostPageType, GlobalSettingsType } from 'types/sanity'
import type { SharedPageProps, Seo } from 'pages/_app'
import { QueryParams } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import { postBySlugQuery, subPageBySlugQuery } from 'lib/sanity.queries'
import { useEffect } from 'react'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'

// Define the props type

type PageData = SubPageType | PostPageType

interface PageProps extends SharedPageProps {
  globalSettings: GlobalSettingsType
  pageData: PageData
  pageType: 'subPage' | 'post'
  params: QueryParams
  seo: Seo
  childrenPages?: SubPageType[]
}

export default function DynamicPage(props: PageProps) {
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )

  useEffect(() => {
    setGlobalSettings(props.globalSettings)
  }, [setGlobalSettings, props.globalSettings])

  const postData = useLiveQuery<PageData>(
    props.pageType === 'post' ? props.pageData : null,
    postBySlugQuery,
    props.params,
  )[0]

  const subPageData = useLiveQuery<PageData>(
    props.pageType === 'subPage' ? props.pageData : null,
    subPageBySlugQuery,
    props.params,
  )[0]

  const data = props.pageType === 'post' ? postData : subPageData

  // Conditionally render based on page type
  switch (props.pageType) {
    case 'post':
      return <PostPage data={data as PostPageType} />
    case 'subPage':
      return (
        <SubPage
          data={data as SubPageType}
          childrenPages={props.childrenPages}
        />
      )
    default:
      return <></>
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string[]
  const client = getClient()
  const globalSettings = await getGlobalSettings(client)
  console.log(params)
  // First, fetch the page type based on the slug
  const pageType = await client.fetch(
    `
      *[slug.current == $slug][0]._type
    `,
    { slug: slug.join('/') },
  )
  if (!pageType) {
    return { notFound: true }
  }
  //

  let childrenPages = []

  let pageData
  switch (pageType) {
    case 'subPage':
      pageData = await getSubPageBySlug(client, slug.join('/'))
      childrenPages = await client.fetch(
        `
        *[_type == "subPage" && parent->slug.current == $slug]
      `,
        { slug: slug.join('/') },
      )
      break
    case 'post':
      pageData = await getPostBySlug(client, slug.join('/'))
      break
    // Add more cases for other page types
    default:
      return { notFound: true }
  }

  if (!pageData) {
    return { notFound: true }
  }

  return {
    props: {
      pageData,
      pageType,
      globalSettings,
      childrenPages, // Include the page type in the props
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all slugs from Sanity
  const client = getClient()
  const paths = await client.fetch(`
    *[_type in ["subPage", "post"]].slug.current
  `)

  console.log(paths)
  return {
    paths: paths.map((slug: string) => ({
      params: { slug: slug.split('/') },
    })),
    fallback: 'blocking', // or false if you want to show a 404 for non-existent slugs
  }
}
