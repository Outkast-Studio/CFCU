import LocationGrid from 'components/locations/LocationGrid'
import LocationHomeHero from 'components/locations/LocationHomeHero'
import React from 'react'
import {
  LocationHomepageType,
  LocationPage,
  GlobalSettingsType,
  ATMLocation,
} from 'types/sanity'
import LocationMap from 'components/locations/LocationMap'
import { clsx } from 'clsx'

const LocationHomePage = ({
  data,
  allLocations,
  globalSettings,
  atmLocations,
}: {
  data: LocationHomepageType
  allLocations: LocationPage[]
  globalSettings: GlobalSettingsType
  atmLocations: ATMLocation[]
}) => {
  return (
    <main className={clsx('overflow-hidden')}>
      <LocationHomeHero data={data?.pageHero} />
      <LocationMap locations={allLocations} atmLocations={atmLocations} />
      <LocationGrid data={allLocations} />
    </main>
  )
}

export default LocationHomePage
