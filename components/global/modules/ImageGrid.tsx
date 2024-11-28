import { LogoGridType } from 'types/sanity'
import { PortableText } from '@portabletext/react'
import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'

const ImageGrid = ({ data }: { data: LogoGridType }) => {
  console.log(data)
  return (
    <section
      className={clsx(
        'px-[24px] py-[66px]',
        'lg:px-[48px] lg:pt-[80px] lg:pb-[130px] lg:max-w-[1800px] lg:mx-auto',
        data?.backgroundColor === 'lightGray' && 'bg-lightGrey',
        data?.backgroundColor === 'white' && 'bg-white',
      )}
    >
      {data?.subtitle && (
        <h2
          className={clsx(
            'subtitle-m text-black/75 mb-[9px]',
            'lg:subtitle-l lg:mb-[11px]',
          )}
        >
          {data?.subtitle}
        </h2>
      )}
      <h3 className={clsx('title-m text-lavender', 'lg:title-l-desktop')}>
        {data?.title}
      </h3>
      {data?.description && (
        <div
          className={clsx(
            'w-paragraph-s-desktop mt-[9px] text-black/75',
            'lg:mt-[26px] lg:w-paragraph-l-desktop',
          )}
        >
          <PortableText value={data?.description} />
        </div>
      )}
      <div>
        {data?.logoGroups?.map((group, index) => (
          <div
            key={index}
            className={clsx(group?.logoGroupTitle ? 'mt-[0px]' : 'mt-[24px]')}
          >
            {group?.logoGroupTitle && (
              <h5
                className={clsx(
                  'w-h5 text-lavender',
                  'lg:w-h5-desktop lg:mt-[84px] lg:mb-[23px]',
                )}
              >
                {group?.logoGroupTitle}
              </h5>
            )}
            <div
              className={clsx(
                'lg:grid lg:gap-[24px]',
                group.columns === 2 && 'grid-cols-2',
                group.columns === 3 && 'grid-cols-3',
                group.columns === 4 && 'grid-cols-4',
              )}
            >
              {group.logos.map((logo, index) =>
                logo.link ? (
                  <a
                    href={logo.link}
                    className={clsx('lg:block w-full')}
                    key={(String(index) + logo.logo.alt) as string}
                  >
                    <Image
                      src={urlForImage(logo.logo).url()}
                      alt={logo.logo.alt as string}
                      width={1920}
                      height={1920}
                      className={clsx('object-contain')}
                    />
                  </a>
                ) : (
                  <Image
                    key={(String(index) + logo.logo.alt) as string}
                    src={urlForImage(logo.logo).url()}
                    alt={logo.logo.alt as string}
                    width={1920}
                    height={1920}
                    className={clsx('object-contain')}
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ImageGrid
