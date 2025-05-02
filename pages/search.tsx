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

  const ITEMS_PER_PAGE = 10 // You can adjust this value as needed

  // Fetch ALL results without pagination
  const [allResults, totalResults] = await Promise.all([
    client.fetch<SearchResult[]>(`
      *[_type in ["subPage", "location", "homepage", 'post', 'topic', 'blogHomePage', 'locationHomePage'] && (metaTitle match "${searchQuery}*" || metaDescription match "${searchQuery}*")]{
        ...,
      } | order(_createdAt desc)
    `),
    client.fetch<number>(`
      count(*[_type in ["subPage", "location", "homepage", 'post', 'topic', 'blogHomePage', 'locationHomePage'] && (metaTitle match "${searchQuery}*" || metaDescription match "${searchQuery}*")])
    `),
  ])

  // Sort all results to ensure subpages appear first
  const sortedResults = [...allResults].sort((a, b) => {
    // If a is a subPage and b is not, a comes first
    if (a._type === 'subPage' && b._type !== 'subPage') return -1
    // If b is a subPage and a is not, b comes first
    if (b._type === 'subPage' && a._type !== 'subPage') return 1
    // Otherwise, maintain the original order (by creation date)
    return 0
  })

  // Apply pagination to the sorted results
  const start = (page - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const paginatedResults = sortedResults.slice(start, end)

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE)

  return {
    props: {
      results: paginatedResults,
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
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )

  const generateButtonUrl = (page: number) => {
    return `/search?q=${searchQuery}&page=${page}`
  }
  const seo = {
    title: `Search Results for "${searchQuery}" | CFCU`,
    description: `Page ${currentPage} of ${totalPages} - ${totalResults} results found for "${searchQuery}"`,
    image: '',
    keywords: '',
  }

  useEffect(() => {
    setSearchQuery(router.query.q as string)
  }, [router.query])

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
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            searchQuery={searchQuery}
            generateButtonUrl={generateButtonUrl}
          />
        )}
      </div>
    </Layout>
  )
}
