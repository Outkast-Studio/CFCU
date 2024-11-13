import { GlobalSettingsType } from 'types/sanity'
import { clsx } from 'clsx'

const Footer = ({ data }: { data: GlobalSettingsType['footer'] }) => {
  console.log(data)
  return (
    <footer className={clsx('bg-lavendar px-[24px] py-[66px]')}>Footer</footer>
  )
}

export default Footer
