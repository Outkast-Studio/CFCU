import { HomepageType } from 'types/sanity'
import { clsx } from 'clsx'
import MediaComponent from 'components/global/ui/Media'
import Button from 'components/global/ui/Button'
import Link from 'next/link'
import PortableTextComponents from 'lib/portabletTextComponents'
import { PortableText } from '@portabletext/react'

const Hero = ({ data }: { data: HomepageType['hero'] }) => {
  return (
    <section
      className={clsx(
        'min-h-[100svh] bg-lavendar px-[10px] py-[12px] relative flex flex-col justify-end',
        'lg:px-[18px] lg:py-[16px]',
      )}
    >
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
            {data.title}
          </h1>
          <p
            className={clsx(
              'text-[18px] leading-[23.4px] font-codec-regular text-white pl-[14px] pr-[14px] mt-[11px] max-w-[590px]',
              'lg:font-codec-light lg:text-[26px] lg:leading-[33.8px] lg:mt-[19px] lg:pl-[0px]',
            )}
          >
            {data.description}
          </p>
          <Link
            href={data.cta.url}
            className={clsx('mt-[16px] block', 'lg:mt-[31px]')}
          >
            <Button label={data.cta.title} />
          </Link>
        </article>
        <article
          className={clsx(
            'text-white font-codec-news hidden',
            'lg:flex lg:flex-col lg:gap-y-[12px] lg:pl-[16px] border-l-[1px] border-l-orange',
          )}
        >
          <div className={clsx('max-w-[300px] text-[18px] leading-[26px] ')}>
            <PortableText
              value={data.testimonial.content}
              components={PortableTextComponents}
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
