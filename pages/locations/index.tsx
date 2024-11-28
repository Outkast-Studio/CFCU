import { readToken } from 'lib/sanity.api'
import {
  getGlobalSettings,
  getClient,
  getLocationHomepage,
  getAllLocations,
} from 'lib/sanity.client'
import {
  globalSettingsQuery,
  homepageQuery,
  locationHomepageQuery,
  locationsQuery,
} from 'lib/sanity.queries'
import {
  LocationHomepageType,
  GlobalSettingsType,
  LocationPage,
} from 'types/sanity'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import { QueryParams, SanityDocument } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'
import { useLiveQuery } from 'next-sanity/preview'
import IndexPage from 'components/pages/IndexPage'
import { Layout } from 'components/layouts/Layout'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { useEffect } from 'react'
import LocationHomePage from 'components/pages/LocationHomePage'

interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
  locationHomepage: LocationHomepageType
  allLocations: LocationPage[]
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<GlobalSettingsType>(
    props.globalSettings,
    globalSettingsQuery,
  )
  const [locationHomepage] = useLiveQuery<LocationHomepageType>(
    props.locationHomepage,
    locationHomepageQuery,
  )
  const [allLocations] = useLiveQuery<LocationPage[]>(
    props.allLocations,
    locationsQuery,
  )

  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  useEffect(() => {
    setGlobalSettings(data)
  }, [data, setGlobalSettings])

  return (
    <Layout>
      <LocationHomePage
        globalSettings={data}
        data={locationHomepage}
        allLocations={allLocations}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)
  const locationHomepage = await getLocationHomepage(client)
  const allLocations = await getAllLocations(client)

  return {
    props: {
      globalSettings,
      locationHomepage,
      allLocations,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
