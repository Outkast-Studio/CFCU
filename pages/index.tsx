import { stegaClean } from '@sanity/client/stega'
import { Layout } from 'components/layouts/Layout'
import IndexPage from 'components/pages/IndexPage'
import { readToken } from 'lib/sanity.api'
import { getClient, getGlobalSettings, getHomepage } from 'lib/sanity.client'
import { globalSettingsQuery, homepageQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import { QueryParams, SanityDocument } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import type { SharedPageProps } from 'pages/_app'
import { Seo } from 'pages/_app'
import { useEffect } from 'react'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { GlobalSettingsType,HomepageType } from 'types/sanity'

interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
  homepage: HomepageType
  seo: Seo & { jsonLD: any }
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<GlobalSettingsType>(
    props.globalSettings,
    globalSettingsQuery,
  )
  const [homepage] = useLiveQuery<HomepageType>(props.homepage, homepageQuery)
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  useEffect(() => {
    setGlobalSettings(data)
  }, [data, setGlobalSettings])

  return (
    <Layout seo={props.seo}>
      <IndexPage globalSettings={data} homepage={homepage} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)
  const homepage = await getHomepage(client)

  const seo = {
    title: homepage?.metaTitle || 'CFCU',
    description: homepage?.metaDescription || '',
    image: homepage?.ogImage || '',
    keywords: homepage?.keywords || '',
    jsonLD:
      typeof homepage?.jsonLd === 'string'
        ? JSON.parse(stegaClean(homepage?.jsonLd))
        : '',
  }

  return {
    props: {
      seo,
      globalSettings,
      homepage,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
    revalidate: 3600,
  }
}
