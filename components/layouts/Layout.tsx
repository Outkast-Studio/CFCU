import { CustomHead } from './CustomHead'
import { clsx } from 'clsx'
import Footer from 'components/global/Footer'
export function Layout({
  children,
  seo = {
    title: '',
    description: '',
    image: '',
    keywords: '',
    jsonLD: '',
  },
}) {
  return (
    <div className={clsx('')}>
      <CustomHead {...seo} />
      {children}
      <Footer />
    </div>
  )
}
