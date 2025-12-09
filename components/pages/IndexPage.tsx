import { clsx } from 'clsx'
import React from 'react'
import { GlobalSettingsType, HomepageType } from 'types/sanity'

import Footer from '@/components/global/Footer'
import ModuleFactory from '@/components/global/modules/ModuleFactory'
import { renderModule } from '@/components/global/modules/ModuleFactory'
import EmotionalNavigation from '@/components/home/EmotionalNavigation'
import Hero from '@/components/home/Hero'
export default function Page({
  globalSettings,
  homepage,
}: {
  globalSettings: GlobalSettingsType
  homepage: HomepageType
}) {
  const siteAlerts = homepage?.homepageModules?.filter(
    //@ts-ignore
    (module) => module?._type === 'siteAlert',
  )
  return (
    <main className={clsx('bg-white')}>
      <div className={clsx('bg-lavender')}>
        {siteAlerts?.map((module, index) => (
          <React.Fragment key={`site-alert-${index}`}>
            {renderModule(module)}
          </React.Fragment>
        ))}
        <Hero data={homepage?.hero} />
        <EmotionalNavigation data={homepage?.emotionalNavigation} />
      </div>
      {homepage?.homepageModules && (
        <ModuleFactory modules={homepage?.homepageModules} />
      )}
    </main>
  )
}
