import { CtaFullMediaType, ThemeLabel } from 'types/sanity'
import { clsx } from 'clsx'
import MediaComponent from '../ui/Media'
import { getThemeClasses } from 'lib/themeConfig'
import PortableTextComponents from 'lib/portabletTextComponents'
import { PortableText } from '@portabletext/react'
import PageLink from '../ui/PageLink'
import Button from '../ui/Button'
import { stegaClean } from '@sanity/client/stega'
import PlayPause from '../ui/PlayPause'
import { useState } from 'react'

const CtaFullMedia = ({ data }: { data: CtaFullMediaType }) => {
  const theme = getThemeClasses(data?.theme?.label as ThemeLabel)
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className={clsx('lg:py-[48px]')}>
      <section
        className={clsx(
          'px-[24px] relative pt-[36px] flex flex-col gap-y-[314px] justify-between pb-[61px]',
          'lg:px-[48px] lg:pt-[58px] lg:gap-y-[272px]',
        )}
      >
        {data?.needsOverlay && (
          <div
            className={clsx(
              'w-full h-full absolute z-[2] ctaFullMediaGradient inset-0',
            )}
          />
        )}
        <div className={clsx('w-full h-full absolute inset-0 z-[1]')}>
          <MediaComponent media={data.backgroundMedia} isPlaying={isPlaying} />
        </div>
        <div className={clsx('relative z-[2]')}>
          <div className={clsx('mt-[15px]')}>
            {stegaClean(data?.topContent?.title?.type) === 'svg' ? (
              <div
                className={clsx('w-[199px]')}
                dangerouslySetInnerHTML={{
                  __html: data?.topContent?.title?.svg,
                }}
              />
            ) : (
              <h2
                className={clsx(
                  'w-[199px] text-[32px] font-codec-ultra uppercase leading-[28.8px] tracking-[-0.16px]',
                  'lg:text-[52px] lg:leading-[43.68px] lg:w-[299px]',
                )}
                style={{ color: theme.background }}
              >
                {data?.topContent?.title?.text}
              </h2>
            )}
            {data?.topContent?.subtitle && (
              <p
                className={clsx(
                  'font-codec-heavy text-[16px] leading-[24px] text-white mt-[13px] max-w-[310px]',
                  'lg:max-w-[389px]',
                )}
              >
                {data?.topContent?.subtitle}
              </p>
            )}
          </div>
        </div>
        <div className={clsx('flex justify-between items-end')}>
          <div className={clsx('relative z-[2]')}>
            <h3
              style={{ color: theme.background }}
              className={clsx(
                'title-s max-w-[330px]',
                'lg:max-w-[408px] lg:title-s-desktop',
              )}
            >
              {data.lowerContent?.title}
            </h3>
            {data.lowerContent?.description && (
              <div
                className={clsx(
                  'w-paragraph mt-[14px] max-w-[330px] text-white',
                  'lg:max-w-[454px] lg:w-paragraph-l-desktop',
                )}
              >
                <PortableText
                  value={data.lowerContent.description}
                  components={PortableTextComponents}
                />
              </div>
            )}
            <PageLink data={data?.cta} className={clsx('mt-[18px] block')}>
              <Button
                label={data?.cta?.title}
                className={clsx(
                  stegaClean(data?.theme?.label) === 'Lavender' &&
                    '!bg-lavender text-black',
                )}
              />
            </PageLink>
          </div>
          {stegaClean(data?.backgroundMedia?.mediaType) === 'video' && (
            <button
              className={clsx('relative z-[2]')}
              onClick={() => setIsPlaying((prev) => !prev)}
            >
              <PlayPause isPlaying={isPlaying} />
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

export default CtaFullMedia
