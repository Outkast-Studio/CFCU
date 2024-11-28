import { SubPageHeroType } from 'types/sanity'
import { clsx } from 'clsx'
import MediaComponent from 'components/global/ui/Media'
import Image from 'next/image'
import defualtSubPageHero from 'public/images/defaultSubPage.png'

const SubPageHero = ({ data }: { data: SubPageHeroType }) => {
  console.log(data)
  return (
    <section
      className={clsx('h-[650px] relative', 'lg:min-h-[832px] lg:h-[80vh]')}
    >
      <div className={clsx('absolute h-full w-full')}>
        {data?.backgroundMedia ? (
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
              <div
                className={clsx(
                  'heroGradient absolute inset-[0px] z-[2] rounded-[10px]',
                  'lg:rounded-[20px]',
                )}
              />
              <MediaComponent media={data?.backgroundMedia} />
            </div>
          </div>
        ) : (
          <Image
            src={defualtSubPageHero}
            alt={data?.title}
            width={1920}
            height={1080}
            className={clsx('object-cover w-full h-full')}
          />
        )}
      </div>
      <div
        className={clsx(
          'flex relative z-[2] px-[24px] pt-[59px] flex-col h-full justify-between',
          'lg:px-[48px] lg:pt-[48px]',
        )}
      >
        <Image
          src={'/icons/LogoFull.png'}
          alt={'Community Financial Logo'}
          width={500}
          height={108}
          className={clsx('w-[212px]', 'lg:w-[244.71px]')}
        />
        <article
          className={clsx(
            'flex flex-col gap-y-[11px] pb-[24px] max-w-[841px]',
            'lg:gap-y-[19px] lg:pb-[71px]',
          )}
        >
          <h1 className={clsx('w-h1 text-white', 'page-title-desktop')}>
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
