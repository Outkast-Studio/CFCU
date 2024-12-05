import { GetStaticProps, GetStaticPaths } from 'next'
import {
  getClient,
  getSubPageBySlug,
  getPostBySlug,
  getGlobalSettings,
} from 'lib/sanity.client'
import { readToken } from 'lib/sanity.api'
import PostPage from '../components/pages/PostPage'
import SubPage from '../components/pages/SubPage'
import { SubPageType, PostPageType, GlobalSettingsType } from 'types/sanity'
import type { SharedPageProps, Seo } from 'pages/_app'
import { QueryParams } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import { postBySlugQuery, subPageBySlugQuery } from 'lib/sanity.queries'
import { useEffect } from 'react'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { Layout } from 'components/layouts/Layout'
import { stegaClean } from '@sanity/client/stega'

//TODO; Fix the type isues in this file.
type PageData = SubPageType | PostPageType

interface Query {
  [key: string]: string
}

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

  // const postData = useLiveQuery<PageData>(
  //   stegaClean(props.pageType) === 'post' ? props.pageData : null,
  //   postBySlugQuery,
  //   props.params,
  // )[0]

  const [subPageData] = useLiveQuery<PageData>(
    props.pageData,
    subPageBySlugQuery,
    props.params,
  )

  const data = subPageData

  return (
    <Layout seo={props.seo}>
      <SubPage data={data as SubPageType} childrenPages={props.childrenPages} />
    </Layout>
  )
  // Conditionally render based on page type
  // switch (stegaClean(props.pageType)) {
  //   case 'post':
  //     return (
  //       <Layout seo={props.seo}>
  //         <PostPage data={data as PostPageType} />
  //       </Layout>
  //     )
  //   case 'subPage':
  //     return (
  //       <Layout seo={props.seo}>
  //         <SubPage
  //           data={data as SubPageType}
  //           childrenPages={props.childrenPages}
  //         />
  //       </Layout>
  //     )
  //   default:
  //     return <></>
  // }
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)
  // First, fetch the page type based on the slug
  const pageType = await client.fetch(
    `
      *[slug.current == $slug][0]._type
    `,
    //@ts-ignore
    { slug: params.slug.join('/') },
  )
  if (!pageType) {
    return { notFound: true }
  }
  //

  let childrenPages = []

  let pageData
  //@ts-ignore
  pageData = await getSubPageBySlug(client, params.slug.join('/'))
  childrenPages = await client.fetch(
    `
    *[_type == "subPage" && parent->slug.current == $slug]
  `, //@ts-ignore
    { slug: params.slug.join('/') },
  )

  if (!pageData) {
    return { notFound: true }
  }
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
      globalSettings,
      params: {
        ...params,
        //@ts-ignore
        slug: params.slug.join('/'),
      },
      draftMode,
      token: draftMode ? readToken : '',
      seo,
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

  return {
    paths: paths.map((slug: string) => ({
      params: { slug: slug.split('/') },
    })),
    fallback: 'blocking', // or false if you want to show a 404 for non-existent slugs
  }
}
