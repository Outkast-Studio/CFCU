import { HomepageType, GlobalSettingsType } from 'types/sanity'
import { clsx } from 'clsx'
export default function Page({
  globalSettings,
  homepage,
}: {
  globalSettings: GlobalSettingsType
  homepage: HomepageType
}) {
  return <main className={clsx('bg-green h-[100vh]')}></main>
}
