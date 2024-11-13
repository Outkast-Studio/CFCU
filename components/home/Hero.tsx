import { HomepageType } from 'types/sanity'
import { clsx } from 'clsx'
import MediaComponent from 'components/global/ui/Media'
import Button from 'components/global/ui/Button'
import Link from 'next/link'

const Hero = ({ data }: { data: HomepageType['hero'] }) => {
  return (
    <section
      className={clsx(
        'min-h-[100svh] bg-lavendar px-[10px] py-[12px] relative flex flex-col justify-end',
      )}
    >
      <div
        className={clsx(
          'heroGradient absolute inset-x-[10px] inset-y-[12px] z-[2] rounded-[10px]',
        )}
      />
      <div
        className={clsx(
          'absolute inset-x-[10px] inset-y-[12px] rounded-[10px] overflow-hidden',
        )}
      >
        <MediaComponent media={data.backgroundMedia} />
      </div>
      <article className={clsx('pb-[58px] relative z-[3]')}>
        <h1
          className={clsx(
            'text-white font-codec-heavy text-[56px] leading-[53.76px] pl-[12px] pr-[14px]',
          )}
        >
          {data.title}
        </h1>
        <p
          className={clsx(
            'text-[18px] leading-[23.4px] font-codec-regular text-white pl-[12px] pr-[14px] mt-[11px]',
          )}
        >
          {data.description}
        </p>
        <Link href={data.cta.url} className={clsx('ml-[10px] block')}>
          <Button label={data.cta.title} theme={'Lavendar'} />
        </Link>
      </article>
    </section>
  )
}

export default Hero
