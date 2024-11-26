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
import { useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'
const CtaInContent = ({ data }: { data: CtaInContentType }) => {
  const theme = getThemeClasses(data?.theme?.label)

  const articleRef = useRef(null)

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  useIsomorphicLayoutEffect(() => {
    if (!inView) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(articleRef.current)
      gsap
        .timeline({})
        .fromTo(
          articleRef.current,
          {
            clipPath: 'inset(0% 0% 100% 0%)',
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power4.inOut',
            duration: 0.7,
          },
        )
        .fromTo(
          q('.animateArticle'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power4.out',
            stagger: 0.1,
          },
          '<+=0.5',
        )
    })
    return () => {
      ctx.revert()
    }
  }, [inView])
  return (
    <section
      ref={ref}
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
      <article
        ref={articleRef}
        className={clsx(
          'mt-[22px] px-[24px]',
          'lg:px-[48px] lg:pt-[48px] lg:w-[585px] lg:h-[705px] lg:flex lg:flex-col lg:justify-between lg:pb-[54px] lg:absolute lg:top-[71px] [clip-path:inset(0%_0%_100%_0%)]',
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
                'w-[185px] text-[28px] tracking-[-0.16px] leading-[27.44px] font-codec-bold animateArticle',
              )}
            >
              {data?.ctaCard?.subtitle?.text}
            </h2>
          )}
          {data?.ctaCard?.subtitle?.type === 'svg' && (
            <div
              className={clsx('w-[140px] animateArticle')}
              dangerouslySetInnerHTML={{ __html: data?.ctaCard?.subtitle?.svg }}
            />
          )}
        </div>
        <div>
          <h3
            className={clsx(
              'text-extra-bold text-[32px] leading-[35.2px] animateArticle',
              'lg:title-s-desktop',
            )}
          >
            {data?.ctaCard?.title}
          </h3>

          {data?.ctaCard?.description ? (
            <div
              className={clsx(
                'font-codec-news text-[18px] leading-[27px] mt-[14px] animateArticle',
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
            className={clsx('mt-[21px] block', 'lg:mt-[24px] animateArticle')}
          >
            <Button label={data?.ctaCard?.cta?.title} />
          </PageLink>
        </div>
      </article>
    </section>
  )
}

export default CtaInContent
