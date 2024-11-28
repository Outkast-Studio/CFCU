import LocationGrid from 'components/locations/LocationGrid'
import LocationHomeHero from 'components/locations/LocationHomeHero'
import React from 'react'
import {
  LocationHomepageType,
  LocationPage,
  GlobalSettingsType,
} from 'types/sanity'
import { clsx } from 'clsx'

const LocationHomePage = ({
  data,
  allLocations,
  globalSettings,
}: {
  data: LocationHomepageType
  allLocations: LocationPage[]
  globalSettings: GlobalSettingsType
}) => {
  console.log(data, allLocations)
  return (
    <main className={clsx('overflow-hidden w-screen')}>
      <LocationHomeHero title={data?.title} subTitle={data?.subtitle} />
      <LocationGrid data={allLocations} />
    </main>
  )
}

export default LocationHomePage
