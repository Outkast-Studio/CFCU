import { HomepageType } from 'types/sanity'
import { clsx } from 'clsx'
import MediaComponent from 'components/global/ui/Media'
import Button from 'components/global/ui/Button'
import PageLink from 'components/global/ui/PageLink'
import PortableTextComponents from 'lib/portabletTextComponents'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import SplitTextDynamic from 'components/interaction/splitTextDynamic'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { useRef } from 'react'

const Hero = ({ data }: { data: HomepageType['hero'] }) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(heroRef.current)
      const tl = gsap
        .timeline({ delay: 0.7 })
        // .fromTo(
        //   backgroundRef.current,
        //   { scale: 1.05 },
        //   { scale: 1, ease: 'power4.inOut', duration: 3 },
        // )
        .fromTo(
          q('.subItem'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power4.out',
            duration: 0.7,
            stagger: 0.1,
          },
          '<',
        )
        .to(q('.tertItem'), { opacity: 1, duration: 0.5 }, '<+=0.2')
    })
    return () => {
      ctx.revert()
    }
  }, [])
  return (
    <section
      ref={heroRef}
      className={clsx(
        'min-h-[100svh] bg-lavender px-[10px] py-[12px] relative flex flex-col justify-end',
        'lg:px-[18px] lg:py-[16px]',
      )}
    >
      <Image
        src={'/icons/LogoFull.png'}
        alt={'Community Financial Logo'}
        width={500}
        height={108}
        className={clsx(
          'w-[212px] leading-[47px] absolute top-[60px] left-[25px] z-[8]',
          'lg:w-[244.71px] lg:leading-[54px] lg:left-[48px] lg:top-[48px]',
        )}
      />
      <div
        className={clsx(
          'heroGradient absolute inset-x-[10px] inset-y-[12px] z-[2] rounded-[10px]',
          'lg:inset-x-[18px] lg:inset-y-[16px] lg:rounded-[20px]',
        )}
      />
      <div
        className={clsx(
          'absolute inset-x-[10px] inset-y-[12px] rounded-[10px] overflow-hidden',
          'lg:inset-x-[18px] lg:inset-y-[16px] lg:rounded-[20px]',
        )}
      >
        <MediaComponent media={data.backgroundMedia} />
      </div>
      <div
        className={clsx(
          'lg:px-[30px] lg:flex lg:justify-between lg:relative lg:z-[3] lg:items-end lg:pb-[46px]',
        )}
      >
        <article
          className={clsx(
            'pb-[58px] relative z-[3] max-w-[841px] pl-[14px]',
            'lg:pl-[0px] lg:pb-[0px]',
          )}
        >
          <h1
            className={clsx(
              'text-white font-codec-heavy text-[56px] leading-[53.76px] pr-[14px]',
              'lg:page-title-desktop',
            )}
          >
            <SplitTextDynamic
              value={data.title}
              classNames={'line'}
              wrapperHeights={'100px'}
              duration={0.7}
              stagger={0.1}
              yPercent={40}
              delay={0.5}
            />
          </h1>
          <p
            className={clsx(
              'text-[18px] leading-[23.4px] font-codec-regular text-white pl-[14px] pr-[14px] mt-[11px] max-w-[590px] subItem',
              'lg:font-codec-light lg:text-[26px] lg:leading-[33.8px] lg:mt-[19px] lg:pl-[0px]',
            )}
          >
            {data.description}
          </p>
          <PageLink
            data={data.cta}
            className={clsx('mt-[16px] block', 'lg:mt-[31px] w-fit subItem')}
          >
            <Button label={data.cta.title} />
          </PageLink>
        </article>
        <article
          className={clsx(
            'text-white font-codec-news hidden opacity-0 tertItem',
            'lg:flex lg:flex-col lg:gap-y-[12px] lg:pl-[16px] border-l-[1px] border-l-orange ',
          )}
        >
          <div className={clsx('max-w-[300px] text-[18px] leading-[26px] ')}>
            <PortableText
              value={data.testimonial.content}
              components={PortableTextComponents as any}
            />
          </div>
          <h6 className={clsx('font-codec-heavy text-[16px] leading-[24px]')}>
            – {data.testimonial.author}, {data.testimonial.title}
          </h6>
        </article>
      </div>
    </section>
  )
}

export default Hero
