import 'styles/global.css'

import { AppProps } from 'next/app'
import { lazy, Suspense } from 'react'
import { clsx } from 'clsx'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Header from 'components/global/Header'
import {
  CodecPro,
  CodecProBold,
  CodecExtraBold,
  CodecNews,
  CodecFat,
  CodecHeavy,
  CodecRegular,
  CodecUltra,
} from 'font'
export interface SharedPageProps {
  draftMode: boolean
  token: string
}

export interface Seo {
  title: string
  description: string
  image: string
  keywords: string
}

export const myPortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        src={urlForImage(value).quality(80).width(2440).url()}
        alt={String(value.alt)}
        width={2440}
        height={2440}
        className={clsx('my-[22px] ')}
      />
    ),
  },
}

const PreviewProvider = lazy(() => import('components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <div
      className={clsx(
        'antialiased font-codec-pro',
        CodecPro.variable,
        CodecProBold.variable,
        CodecExtraBold.variable,
        CodecNews.variable,
        CodecFat.variable,
        CodecHeavy.variable,
        CodecRegular.variable,
        CodecUltra.variable,
      )}
    >
      <Header />
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  )
}
