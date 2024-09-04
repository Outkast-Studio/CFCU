import PreviewComponent from 'components/PreviewComponent'
import { readToken } from 'lib/sanity.api'
import { getGlobalSettings, getClient } from 'lib/sanity.client'
import { GlobalSettingsType, globalSettingsQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import { QueryParams, SanityDocument } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'
import { useLiveQuery } from 'next-sanity/preview'
import IndexPage from 'components/IndexPage'
import { Layout } from 'components/layouts/Layout'
interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<GlobalSettingsType>(
    props.globalSettings,
    globalSettingsQuery,
  )

  return (
    <Layout>
      <IndexPage globalSettings={data} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)

  return {
    props: {
      globalSettings,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
