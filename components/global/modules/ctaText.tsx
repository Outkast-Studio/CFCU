import { CtaTextType, ThemeLabel } from 'types/sanity'
import { clsx } from 'clsx'
import { getThemeClasses } from 'lib/themeConfig'

import { PortableText } from '@portabletext/react'
import { WysiwygComponentsWithoutPadding } from 'lib/portabletTextComponents'
import Button from '../ui/Button'
import PageLink from '../ui/PageLink'
import { useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'

const CtaText = ({ data }: { data: CtaTextType }) => {
  const theme = getThemeClasses(data?.theme?.label as ThemeLabel)

  const contentRef = useRef(null)

  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  })

  useIsomorphicLayoutEffect(() => {
    const q = gsap.utils.selector(contentRef.current)
    gsap.set(q('.animateContent'), { y: 30, opacity: 0 })
    if (!inView) return
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.15 }).fromTo(
        q('.animateContent'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: 'power4.out',
          stagger: 0.1,
        },
      )
    })
    return () => {
      ctx.revert()
    }
  }, [inView])

  return (
    <div
      ref={ref}
      className={clsx('overflow-hidden', 'lg:px-[48px] lg:py-[63px]')}
    >
      <section
        ref={contentRef}
        style={{ backgroundColor: theme?.background }}
        className={clsx(
          'px-[45px] py-[57px] flex flex-col items-center',
          'lg:pt-[122px] lg:pb-[122px]',
        )}
      >
        {data?.subtitle && (
          <h2
            style={{ color: theme?.subtitle }}
            className={clsx(
              'text-[14px] leading-[16px] tracking-[1.6px] uppercase mb-[6px] animateContent opacity-0',
              'lg:subtitle-l  lg:mb-[16px]',
            )}
          >
            {data.subtitle}
          </h2>
        )}
        <h3
          className={clsx(
            'title-l text-center',
            'lg:title-l-desktop animateContent opacity-0',
          )}
          style={{ color: theme?.heading }}
        >
          {data?.title}
        </h3>
        {data.description && (
          <div
            style={{ color: theme?.monotoneCopy }}
            className={clsx(
              ' w-paragraph text-center mt-[20px] animateContent opacity-0',
              'lg:max-w-[1000px] lg:w-paragraph-xl-desktop lg:mt-[24px]',
            )}
          >
            <PortableText value={data?.description} />
          </div>
        )}
        <PageLink
          data={data?.cta}
          className={clsx(
            'mt-[20px] block animateContent opacity-0',
            'lg:mt-[24px]',
          )}
        >
          <Button label={data?.cta?.title} />
        </PageLink>
      </section>
    </div>
  )
}

export default CtaText
