import React from 'react'
import { CtaInContentType } from 'types/sanity'
import { clsx } from 'clsx'
import { getThemeClasses } from 'lib/themeConfig'
import MediaComponent from '../ui/Media'
import { PortableText } from '@portabletext/react'
import PortableTextComponents from 'lib/portabletTextComponents'
import PageLink from '../ui/PageLink'
import Button from '../ui/Button'
import { stegaClean } from '@sanity/client/stega'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const CtaInContent = ({ data }: { data: CtaInContentType }) => {
  const theme = getThemeClasses(data?.theme?.label)
  const targetRef = useRef(null)
  // const { scrollYProgress } = useScroll({
  //   target: targetRef,
  // })
  // const y = useTransform(scrollYProgress, [0, 1], ['0', `50%`])
  return (
    <section
      ref={targetRef}
      className={clsx(
        'mt-[65px] title-s pt-[51px] pb-[59px]',
        'lg:!bg-white lg:pt-[178px] lg:relative lg:pb-[119px] lg:max-w-[1800px] lg:mx-auto',
      )}
      style={{ backgroundColor: theme?.background, color: theme?.heading }}
    >
      <div
        className={clsx(
          'pl-[24px]',
          stegaClean(data?.ctaCard?.contentPosition) === 'left'
            ? 'lg:pl-[164px] lg:pr-[48px]'
            : 'lg:pr-[164px] lg:pl-[48px]',
        )}
      >
        {data?.ctaCard.subtitle?.type === 'text' && (
          <h2
            className={clsx(
              'w-[140px] text-[21px] tracking-[-0.16px] leading-[20.58px] font-codec-bold',
              'lg:hidden',
            )}
          >
            {data?.ctaCard?.subtitle?.text}
          </h2>
        )}
        {data?.ctaCard?.subtitle?.type === 'svg' && (
          <div
            className={clsx('w-[140px]', 'lg:hidden')}
            dangerouslySetInnerHTML={{ __html: data?.ctaCard?.subtitle?.svg }}
          />
        )}
        <div
          className={clsx(
            'aspect-w-6 aspect-h-4 relative mt-[26px]',
            'lg:aspect-w-7 lg:mt-[0px]',
          )}
        >
          <MediaComponent media={data?.backgroundImage} />
        </div>
      </div>
      <motion.article
        className={clsx(
          'mt-[22px] px-[24px]',
          'lg:px-[48px] lg:pt-[48px] lg:w-[585px] lg:h-[705px] lg:flex lg:flex-col lg:justify-between lg:pb-[54px] lg:absolute lg:top-[71px]',
          stegaClean(data?.ctaCard?.contentPosition) === 'left'
            ? 'lg:left-[0px]'
            : 'lg:right-[0px]',
        )}
        style={{ backgroundColor: theme.background, color: theme.heading }}
      >
        <div className={clsx('hidden', 'lg:block')}>
          {data?.ctaCard?.subtitle?.type === 'text' && (
            <h2
              className={clsx(
                'w-[185px] text-[28px] tracking-[-0.16px] leading-[27.44px] font-codec-bold',
              )}
            >
              {data?.ctaCard?.subtitle?.text}
            </h2>
          )}
          {data?.ctaCard?.subtitle?.type === 'svg' && (
            <div
              className={clsx('w-[140px]')}
              dangerouslySetInnerHTML={{ __html: data?.ctaCard?.subtitle?.svg }}
            />
          )}
        </div>
        <div>
          <h3
            className={clsx(
              'text-extra-bold text-[32px] leading-[35.2px]',
              'lg:title-s-desktop',
            )}
          >
            {data?.ctaCard?.title}
          </h3>

          {data?.ctaCard?.description ? (
            <div
              className={clsx(
                'font-codec-news text-[18px] leading-[27px] mt-[14px]',
                'lg:text-[21px] lg:leading-[31.5px] lg:mt-[16px]',
              )}
            >
              <PortableText
                value={data?.ctaCard?.description}
                components={PortableTextComponents as any}
              />
            </div>
          ) : (
            <div className={clsx('h-[48px', 'lg:h-[64px]')}></div>
          )}
          <PageLink
            data={data?.ctaCard?.cta}
            className={clsx('mt-[21px] block', 'lg:mt-[24px]')}
          >
            <Button label={data?.ctaCard?.cta?.title} />
          </PageLink>
        </div>
      </motion.article>
    </section>
  )
}

export default CtaInContent
