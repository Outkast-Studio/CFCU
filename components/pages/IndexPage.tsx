import { HomepageType, GlobalSettingsType } from 'types/sanity'
import { clsx } from 'clsx'
import Hero from '../home/Hero'
export default function Page({
  globalSettings,
  homepage,
}: {
  globalSettings: GlobalSettingsType
  homepage: HomepageType
}) {
  return (
    <main className={clsx('bg-lavendar')}>
      <Hero />
    </main>
  )
}
