import { clsx } from 'clsx'
import { Layout } from 'components/layouts/Layout'
import SearchResultsPage from 'components/pages/SearchResultsPage'
import Pagination from 'components/search/pagination'
import { Search } from 'components/search/Search'
import { readToken } from 'lib/sanity.api'
import { getClient, getGlobalSettings } from 'lib/sanity.client'
import { GetServerSideProps } from 'next'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { QueryParams, SanityDocument } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'
import { useEffect, useState } from 'react'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { GlobalSettingsType } from 'types/sanity'
import { SearchResult } from 'types/sanity'

interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
}
interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)
  return {
    props: {
      globalSettings,
      token: '',
      draftMode,
      params,
    },
  }
}
export default function Page(props: PageProps) {
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  useEffect(() => {
    setGlobalSettings(props.globalSettings)
  }, [props.globalSettings, setGlobalSettings])

  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(props.params.q as string)

  const seo = {
    title: `Search Results for "${searchQuery}" | CFCU`,
    description: `r`,
    image: '',
    keywords: '',
  }

  useEffect(() => {
    setSearchQuery(router.query.q as string)
  }, [router.query])

  return (
    <Layout seo={seo}>
      <Search />
    </Layout>
  )
}
