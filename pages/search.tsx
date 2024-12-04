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
import { clsx } from 'clsx'
// Define the type for our search results

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const searchQuery = query.q as string
  const page = parseInt(query.page as string) || 1
  const client = getClient()
  const globalSettings = await getGlobalSettings(client)
  if (!searchQuery) {
    return {
      props: { results: [], globalSettings, totalPages: 0, currentPage: 1 },
    }
  }

  const ITEMS_PER_PAGE = 30 // You can adjust this value as needed

  // Calculate start and end for pagination
  const start = (page - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  // Perform the Sanity query with pagination
  const [results, totalResults] = await Promise.all([
    client.fetch<SearchResult[]>(`
      *[_type in ["subPage", "rates", "location", "homepage", 'post'] && (metaTitle match "${searchQuery}*" || metaDescription match "${searchQuery}*")] {
        ...,
      } | order(_createdAt desc) [${start}...${end}]
    `),
    client.fetch<number>(`
      count(*[_type in ["subPage", "rates", "location", "homepage", 'post'] && (metaTitle match "${searchQuery}*" || metaDescription match "${searchQuery}*")])
    `),
  ])

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE)

  return {
    props: {
      results,
      globalSettings,
      initialQuery: searchQuery,
      totalPages,
      currentPage: page,
      totalResults,
    },
  }
}

export default function SearchResults({
  results,
  initialQuery,
  globalSettings,
  totalPages,
  currentPage,
  totalResults,
}: {
  results: SearchResult[]
  initialQuery: string
  globalSettings: GlobalSettingsType
  totalPages: number
  currentPage: number
  totalResults: number
}) {
  console.log(globalSettings)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )

  const prevUrl = `/search?q=${searchQuery}&page=${Math.max(1, currentPage - 1)}`
  const nextUrl = `/search?q=${searchQuery}&page=${Math.min(totalPages, currentPage + 1)}`

  const generateButtonUrl = (page: number) => {
    return `/search?q=${searchQuery}&page=${page}`
  }
  const seo = {
    title: `Search Results for "${searchQuery}" | CFCU`,
    description: `Page ${currentPage} of ${totalPages} - ${totalResults} results found for "${searchQuery}"`,
    image: '',
    keywords: '',
  }

  return (
    <Layout seo={seo}>
      <SearchResultsPage
        results={results}
        initialQuery={initialQuery}
        globalSettings={globalSettings}
        totalResults={totalResults}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <div
        className={clsx(
          'px-[24px]',
          'lg:px-[48px] lg:max-w-[1800px] mx-auto',
          'xl:px-[0px]',
        )}
      >
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          prevUrl={prevUrl}
          nextUrl={nextUrl}
          generateButtonUrl={generateButtonUrl}
        />
      </div>
    </Layout>
  )
}
