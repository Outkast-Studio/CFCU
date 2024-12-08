import { clsx } from 'clsx'
import { getThemeClasses, Theme } from 'lib/themeConfig'
import { GlobalSettingsType } from 'types/sanity'
import PageLink from './PageLink'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { useEffect, useState } from 'react'

import { useRef } from 'react'
import Button from './Button'
const MenuCTA = ({
  data,
  menuOpen,
  setMenuOpen,
}: {
  data: GlobalSettingsType['navigation']['navigationCta']
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [mounted, setMounted] = useState(false)
  const theme = getThemeClasses(data.theme.label) as any
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!menuOpen) return
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ delay: 0.2 })
        .fromTo(
          containerRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power4.inOut',
            duration: 0.8,
          },
        )
        .fromTo(
          '.elementAnimation',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power4.out',
            duration: 0.5,
            stagger: 0.1,
          },
          '<+=0.6',
        )
    })
    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <article
      ref={containerRef}
      style={{
        backgroundColor: theme.background,
      }}
      className={clsx(
        `mt-[75px] pt-[42px] pb-[58px] px-[21px] font-codec-pro mx-[26px] flex flex-col items-center `,
        'lg:mt-[0px] lg:mx-[0px] lg:px-[51px] lg:py-[74px]',
      )}
    >
      <h3
        ref={titleRef}
        style={{
          color: theme.heading,
        }}
        className={clsx(
          'font-codec-fat text-[34px] leading-[32p.64px] text-center uppercase elementAnimation',
          'lg:text-[54px] lg:leading-[51.84px]',
        )}
      >
        {data.title}
      </h3>
      <div className={clsx('opacity-75')}>
        <p
          ref={descriptionRef}
          style={{
            color: theme.copy,
          }}
          className={clsx(
            'text-[16px] leading-[24px] text-center font-codec-news mt-[13px] elementAnimation',
            'lg:text-[24px] lg:leading-[36px] lg:max-w-[580px]',
          )}
        >
          {data.description}
        </p>
      </div>
      <PageLink
        data={data.cta}
        className={clsx('overflow-hidden lg:overflow-visible')}
      >
        {/* <button
          ref={ctaRef}
          style={{ backgroundColor: theme.ctaBackground }}
          className={clsx(
            'mt-[21px] px-[20px] py-[10.5px] rounded-full flex items-center gap-x-[6px] elementAnimation',
          )}
        >
          <span
            className={clsx(
              'text-black font-codec-extra-bold text-[18px] leading-[27px]',
            )}
          >
            {data.cta.title}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8538 8.35378L9.35375 12.8538C9.25993 12.9476 9.13268 13.0003 9 13.0003C8.86732 13.0003 8.74007 12.9476 8.64625 12.8538C8.55243 12.76 8.49972 12.6327 8.49972 12.5C8.49972 12.3674 8.55243 12.2401 8.64625 12.1463L12.2931 8.50003H2.5C2.36739 8.50003 2.24021 8.44736 2.14645 8.35359C2.05268 8.25982 2 8.13264 2 8.00003C2 7.86743 2.05268 7.74025 2.14645 7.64648C2.24021 7.55271 2.36739 7.50003 2.5 7.50003H12.2931L8.64625 3.85378C8.55243 3.75996 8.49972 3.63272 8.49972 3.50003C8.49972 3.36735 8.55243 3.2401 8.64625 3.14628C8.74007 3.05246 8.86732 2.99976 9 2.99976C9.13268 2.99976 9.25993 3.05246 9.35375 3.14628L13.8538 7.64628C13.9002 7.69272 13.9371 7.74786 13.9623 7.80856C13.9874 7.86926 14.0004 7.93433 14.0004 8.00003C14.0004 8.06574 13.9874 8.13081 13.9623 8.1915C13.9371 8.2522 13.9002 8.30735 13.8538 8.35378Z"
              fill={theme.icon}
            />
          </svg>
        </button> */}
        <Button
          label={data.cta.title}
          className={clsx('elementAnimation mt-[21px] overflow-hidden')}
        />
      </PageLink>
    </article>
  )
}

export default MenuCTA
