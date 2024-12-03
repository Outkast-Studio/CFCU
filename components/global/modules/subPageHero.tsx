import { SubPageHeroType } from 'types/sanity'
import { clsx } from 'clsx'
import MediaComponent from 'components/global/ui/Media'
import Image from 'next/image'
import defualtSubPageHero from 'public/images/defaultSubPage.png'
import Link from 'next/link'

const SubPageHero = ({ data }: { data: SubPageHeroType }) => {
  return (
    <section
      className={clsx(
        'h-[650px] relative',

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

              <MediaComponent media={data?.backgroundMedia} />
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
          <h1 className={clsx('w-h1 text-white', 'lg:page-title-desktop')}>
            {data?.title}
          </h1>
          <p
            className={clsx(
              'w-paragraph-m-desktop text-white',
              'lg:text-[26px] lg:leading-[33.8px]',
            )}
          >
            {data?.subtitle}
          </p>
        </article>
      </div>
    </section>
  )
}

export default SubPageHero
