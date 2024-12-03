import { SubPageHeroType } from 'types/sanity'
import { clsx } from 'clsx'
import Image from 'next/image'
import defualtSubPageHero from 'public/images/defaultSubPage.png'
import Link from 'next/link'

const LocationHomeHero = ({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}) => {
  return (
    <section className={clsx('relative', 'lg:min-h-[650px] lg:h-[70vh]')}>
      <div className={clsx('absolute h-full w-full')}>
        <Image
          src={defualtSubPageHero}
          alt={'Origami background'}
          width={1920}
          height={1080}
          className={clsx('object-cover w-full h-full')}
        />
      </div>
      <div
        className={clsx(
          'flex relative z-[2] px-[24px] pt-[59px] flex-col h-full justify-between gap-y-[111px]',
          'lg:px-[48px] lg:pt-[48px]',
        )}
      >
        <Link href={'/'} className={clsx('block')}>
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
            'lg:gap-y-[19px] lg:pb-[62px]',
          )}
        >
          <h1 className={clsx('w-h1 text-white', 'lg:page-title-desktop')}>
            {title}
          </h1>
          <p
            className={clsx(
              'w-paragraph-m-desktop text-white',
              'lg:text-[26px] lg:leading-[33.8px]',
            )}
          >
            {subTitle}
          </p>
        </article>
      </div>
    </section>
  )
}

export default LocationHomeHero
