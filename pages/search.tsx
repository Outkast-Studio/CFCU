import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { getClient, getGlobalSettings } from 'lib/sanity.client'
import Link from 'next/link'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { GlobalSettingsType } from 'types/sanity'
import { Layout } from 'components/layouts/Layout'
import SearchResultsPage from 'components/pages/SearchResultsPage'
import { SearchResult } from 'types/sanity'
import Pagination from 'components/search/pagination'
// Define the type for our search results

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const searchQuery = query.q as string
  const page = parseInt(query.page as string) || 1

  if (!searchQuery) {
    return { props: { results: [] } }
  }
  const client = getClient()
  const globalSettings = await getGlobalSettings(client)

  const ITEMS_PER_PAGE = 30

  // Perform the Sanity query
  const [results, totalResults] = await Promise.all([
    client.fetch<SearchResult[]>(`
    *[_type in ["subPage", "rates", "location", "homepage", 'post'] && (title match "${searchQuery}*")] {
...,
    }
  `),
    client.fetch<number>(`
    count(*[_type in ["subPage", "rates", "location", "homepage", 'post'] && (title match "${searchQuery}*")])
  `),
  ])

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE)

  return {
    props: {
      results,
      initialQuery: searchQuery,
      globalSettings,
      totalPages,
      currentPage: page,
    },
  }
}

export default function SearchResults({
  results,
  initialQuery,
  globalSettings,
  totalPages,
  currentPage,
}: {
  results: SearchResult[]
  initialQuery: string
  globalSettings: GlobalSettingsType
  totalPages: number
  currentPage: number
}) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )

  useEffect(() => {
    setGlobalSettings(globalSettings)
  }, [setGlobalSettings, globalSettings])

  const prevUrl = `/search?q=${searchQuery}&page=${currentPage == 1 ? 1 : currentPage - 1}`
  const nextUrl = `/search?q=${searchQuery}&page=${currentPage == totalPages ? currentPage : currentPage + 1}`

  const generateButtonUrl = (page: number) => {
    return `/search?q=${searchQuery}&page=${page}`
  }
  const seo = {
    title: 'Search | CFCU',
    description: '',
    image: '',
    keywords: '',
  }

  return (
    <Layout seo={seo}>
      <SearchResultsPage results={results} initialQuery={initialQuery} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        generateButtonUrl={generateButtonUrl}
      />
    </Layout>
  )
}
