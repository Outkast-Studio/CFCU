import { HomepageType, GlobalSettingsType } from 'types/sanity'
import { clsx } from 'clsx'
import Hero from 'components/home/Hero'
import EmotionalNavigation from 'components/home/EmotionalNavigation'
import ModuleFactory from 'components/global/modules/ModuleFactory'
export default function Page({
  globalSettings,
  homepage,
}: {
  globalSettings: GlobalSettingsType
  homepage: HomepageType
}) {
  return (
    <main className={clsx('bg-white')}>
      <div className={clsx('bg-lavendar')}>
        <Hero data={homepage.hero} />
        <EmotionalNavigation data={homepage.emotionalNavigation} />
      </div>
      {homepage.modules.map((module, index) => (
        <ModuleFactory module={module} key={index} />
      ))}
    </main>
  )
}
