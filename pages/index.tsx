import { readToken } from 'lib/sanity.api'
import { getGlobalSettings, getClient, getHomepage } from 'lib/sanity.client'
import { globalSettingsQuery, homepageQuery } from 'lib/sanity.queries'
import { HomepageType, GlobalSettingsType } from 'types/sanity'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import { QueryParams, SanityDocument } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'
import { useLiveQuery } from 'next-sanity/preview'
import IndexPage from 'components/IndexPage'
import { Layout } from 'components/layouts/Layout'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { useEffect } from 'react'

interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
  homepage: HomepageType
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
  }, [data])

  return (
    <Layout>
      <IndexPage globalSettings={data} homepage={homepage} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)
  const homepage = await getHomepage(client)

  return {
    props: {
      globalSettings,
      homepage,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
