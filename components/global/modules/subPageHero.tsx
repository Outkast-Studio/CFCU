import { SubPageHeroType } from 'types/sanity'
import { clsx } from 'clsx'
import MediaComponent from 'components/global/ui/Media'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import SplitTextDynamic from 'components/interaction/splitTextDynamic'
import { stegaClean } from '@sanity/client/stega'
import PlayPause from 'components/global/ui/PlayPause'
import { useWindowSize } from '@/hooks/useWindowSize'

const SubPageHero = ({ data }: { data: SubPageHeroType }) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const { width } = useWindowSize()

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(heroRef.current)
      const tl = gsap.timeline({ delay: 0.5 }).fromTo(
        q('.subItem'),
        { opacity: 0, y: width > 1024 ? 30 : 10 },
        {
          opacity: 1,
          y: 0,
          ease: 'power4.out',
          duration: 0.7,
          stagger: 0.1,
        },
        '<',
      )
    })
    if (data?.needsBackgroundMedia) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: backgroundRef.current,
            start: 'top-=16px top',
            end: `+=${backgroundRef.current.offsetHeight * 0.8}px`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(backgroundRef.current, { scale: 1.05 }, '<+=0')
    }
    return () => {
      ctx.revert()
    }
  }, [])
  return (
    <section
      ref={heroRef}
      className={clsx(
        'h-[650px] relative overflow-hidden',

        data?.needsBackgroundMedia
          ? 'lg:min-h-[832px] lg:h-[80vh]'
          : 'lg:min-h-[650px] lg:h-[70vh]',
      )}
    >
      <div className={clsx('absolute h-full w-full bg-lavender')}>
        {data?.needsBackgroundMedia && (
          <div
            className={clsx(
              'px-[10px] py-[12px] bg-lavender h-full',
              'lg:p-[18px]',
            )}
          >
            <div
              ref={backgroundRef}
              className={clsx(
                'rounded-[10px] overflow-hidden relative h-full',
                'lg:rounded-[20px]',
              )}
            >
              {data?.needsGradient && (
                <div
                  className={clsx(
                    'heroGradient absolute inset-[0px] z-[2] rounded-[10px]',
                    'lg:rounded-[20px]',
                  )}
                />
              )}
              <MediaComponent
                media={data?.backgroundMedia}
                isPlaying={isPlaying}
                priority={true}
              />
            </div>
          </div>
        )}
      </div>

      <div
        className={clsx(
          'flex relative z-[2] px-[24px] pt-[59px] flex-col h-full justify-between',
          'lg:px-[48px] lg:pt-[48px]',
        )}
      >
        <Link href={'/'} className={clsx('block w-fit focus:!shadow-none')}>
          <Image
            src={'/icons/LogoFull.png'}
            alt={'Community Financial Logo'}
            width={500}
            height={108}
            className={clsx('w-[212px]', 'lg:w-[244.71px]')}
          />
        </Link>

        <article
          className={clsx(
            'flex flex-col gap-y-[11px] pb-[24px] max-w-[841px]',
            'lg:gap-y-[19px] lg:pb-[71px]',
          )}
        >
          <h1
            className={clsx(
              'w-h1 text-white',
              'lg:page-title-desktop lg:!leading-[85px]',
            )}
          >
            <SplitTextDynamic
              value={data?.title}
              classNames={'line'}
              wrapperHeights={'85px'}
              duration={0.7}
              stagger={0.1}
              yPercent={40}
              delay={0.3}
            />
          </h1>
          <div className={clsx('flex justify-between items-end')}>
            <p
              className={clsx(
                'w-paragraph-m-desktop text-white subItem opacity-0',
                'lg:text-[26px] lg:leading-[33.8px]',
              )}
            >
              {data?.subtitle}
            </p>
            {stegaClean(data?.backgroundMedia?.mediaType) === 'video' && (
              <button
                className={clsx(
                  'z-[10] !w-fit !h-fit',
                  'lg:!right-[36px] lg:!bottom-[36px] lg:absolute ',
                )}
                onClick={() => setIsPlaying((prev) => !prev)}
              >
                <PlayPause isPlaying={isPlaying} />
              </button>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}

export default SubPageHero
