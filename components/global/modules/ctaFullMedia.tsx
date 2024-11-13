import { CtaFullMediaType, ThemeLabel } from 'types/sanity'
import { clsx } from 'clsx'
import MediaComponent from '../ui/Media'
import { getThemeClasses } from 'lib/themeConfig'
import PortableTextComponents from 'lib/portabletTextComponents'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Button from '../ui/Button'

const CtaFullMedia = ({ data }: { data: CtaFullMediaType }) => {
  console.log(data)
  const theme = getThemeClasses(data.theme.label as ThemeLabel)

  return (
    <section
      className={clsx(
        'px-[24px] relative pt-[36px] flex flex-col gap-y-[314px] justify-between pb-[61px]',
      )}
    >
      {data.needsOverlay && (
        <div
          className={clsx(
            'w-full h-full absolute z-[2] ctaFullMediaGradient inset-0',
          )}
        />
      )}
      <div className={clsx('w-full h-full absolute inset-0 z-[1]')}>
        <MediaComponent media={data.backgroundMedia} />
      </div>
      <div className={clsx('relative z-[2]')}>
        <div className={clsx('mt-[15px]')}>
          {data.topContent.title.type === 'svg' ? (
            <div
              className={clsx('w-[199px]')}
              dangerouslySetInnerHTML={{ __html: data.topContent.title.svg }}
            />
          ) : (
            <h2
              className={clsx(
                'w-[199px] text-[32px] font-codec-ultra uppercase leading-[28.8px] tracking-[-0.16px]',
              )}
              style={{ color: theme.background }}
            >
              {data.topContent.title.text}
            </h2>
          )}
          {data.topContent.subtitle && (
            <p
              className={clsx(
                'font-codec-heavy text-[16px] leading-[24px] text-white mt-[13px] max-w-[310px]',
              )}
            >
              {data.topContent.subtitle}
            </p>
          )}
        </div>
      </div>
      <div className={clsx('relative z-[2]')}>
        <h3
          style={{ color: theme.background }}
          className={clsx('title-s max-w-[330px]')}
        >
          {data.lowerContent?.title}
        </h3>
        {data.lowerContent?.description && (
          <div
            className={clsx('w-paragraph mt-[14px] max-w-[330px] text-white')}
          >
            <PortableText
              value={data.lowerContent.description}
              components={PortableTextComponents}
            />
          </div>
        )}
        <Link href={data.cta.path} className={clsx('mt-[18px] block')}>
          <Button label={data.cta.title} />
        </Link>
      </div>
    </section>
  )
}

export default CtaFullMedia
