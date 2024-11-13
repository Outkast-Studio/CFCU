import React from 'react'
import { CtaInContentType } from 'types/sanity'
import { clsx } from 'clsx'
import { getThemeClasses } from 'lib/themeConfig'
import MediaComponent from '../ui/Media'
import { PortableText } from '@portabletext/react'
import PortableTextComponents from 'lib/portabletTextComponents'
import Link from 'next/link'
import Button from '../ui/Button'
const CtaInContent = ({ data }: { data: CtaInContentType }) => {
  console.log(data)
  const theme = getThemeClasses(data.theme.label)
  return (
    <section
      className={clsx('mt-[65px] title-s pt-[51px] pb-[59px]')}
      style={{ backgroundColor: theme.background, color: theme.heading }}
    >
      <div className={clsx('pl-[24px]')}>
        {data.ctaCard.subtitle?.type === 'text' && (
          <h2
            className={clsx(
              'w-[140px] text-[21px] tracking-[-0.16px] leading-[20.58px] font-codec-bold',
            )}
          >
            {data.ctaCard.subtitle.text}
          </h2>
        )}
        {data.ctaCard.subtitle?.type === 'svg' && (
          <div
            className={clsx('w-[140px]')}
            dangerouslySetInnerHTML={{ __html: data.ctaCard.subtitle.svg }}
          />
        )}
        <div className={clsx('aspect-w-6 aspect-h-4 relative mt-[26px]')}>
          <MediaComponent media={data.backgroundImage} />
        </div>
      </div>{' '}
      <article className={clsx('mt-[22px] px-[24px] ')}>
        <h3 className={clsx('text-extra-bold text-[32px] leading-[35.2px]')}>
          {data.ctaCard.title}
        </h3>

        {data.ctaCard.description && (
          <div
            className={clsx(
              'font-codec-news text-[18px] leading-[27px] mt-[14px]',
            )}
          >
            <PortableText
              value={data.ctaCard.description}
              components={PortableTextComponents}
            />
          </div>
        )}
        <Link href={data.ctaCard.cta.url} className={clsx('mt-[21px] block')}>
          <Button label={data.ctaCard.cta.title} />
        </Link>
      </article>
    </section>
  )
}

export default CtaInContent
