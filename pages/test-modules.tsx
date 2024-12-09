import { readToken } from 'lib/sanity.api'
import {
  getGlobalSettings,
  getClient,
  getHomepage,
  getTestModules,
} from 'lib/sanity.client'
import {
  globalSettingsQuery,
  homepageQuery,
  testModulesQuery,
} from 'lib/sanity.queries'
import { TestModulesType, GlobalSettingsType } from 'types/sanity'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import { QueryParams, SanityDocument } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'
import { useLiveQuery } from 'next-sanity/preview'
import IndexPage from 'components/pages/IndexPage'
import { Layout } from 'components/layouts/Layout'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { useEffect } from 'react'
import ModuleFactory from 'components/global/modules/ModuleFactory'
interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
  testModules: TestModulesType
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [globalSettings] = useLiveQuery<GlobalSettingsType>(
    props.globalSettings,
    globalSettingsQuery,
  )
  const [data] = useLiveQuery<TestModulesType>(
    props.testModules,
    testModulesQuery,
  )
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  useEffect(() => {
    setGlobalSettings(globalSettings)
  }, [data, setGlobalSettings, globalSettings])

  return (
    <Layout>
      <ModuleFactory modules={data.modules} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)
  const testModules = await getTestModules(client)

  return {
    props: {
      globalSettings,
      testModules,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
