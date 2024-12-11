import { LogoGridType } from 'types/sanity'
import { PortableText } from '@portabletext/react'
import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { stegaClean } from '@sanity/client/stega'

const ImageGrid = ({ data }: { data: LogoGridType }) => {
  return (
    <section
      className={clsx(
        stegaClean(data?.backgroundColor) === 'lightGray' && 'bg-lightGrey',
        stegaClean(data?.backgroundColor) === 'white' && 'bg-white',
      )}
    >
      <div
        className={clsx(
          'px-[24px] py-[66px]',
          'lg:px-[48px] lg:pt-[80px] lg:pb-[130px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
          stegaClean(data?.backgroundColor) === 'lightGray' && 'bg-lightGrey',
          stegaClean(data?.backgroundColor) === 'white' && 'bg-white',
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
              className={clsx(
                group?.logoGroupTitle
                  ? 'mt-[16px]'
                  : index == 0
                    ? 'mt-[24px] lg:mt-[84px]'
                    : 'mt-[16px] lg:mt-[24px]',
              )}
            >
              {group?.logoGroupTitle && (
                <h5
                  className={clsx(
                    'w-h5 text-lavender mb-[16px]',
                    'lg:w-h5-desktop lg:mt-[84px] lg:mb-[23px]',
                  )}
                >
                  {group?.logoGroupTitle}
                </h5>
              )}
              <div
                className={clsx(
                  'flex flex-col gap-y-[16px]',
                  'lg:grid lg:gap-[24px]',
                  group?.columns === 2 && 'grid-cols-2',
                  group?.columns === 3 && 'grid-cols-3',
                  group?.columns === 4 && 'grid-cols-4',
                )}
              >
                {group?.logos?.map((logo, index) =>
                  logo?.link ? (
                    <a
                      href={logo?.link}
                      className={clsx('lg:block w-full')}
                      key={(String(index) + logo?.logo?.alt) as string}
                    >
                      <Image
                        src={urlForImage(logo?.logo).url()}
                        alt={logo?.logo?.alt as string}
                        width={1000}
                        height={1000}
                        className={clsx(
                          'object-cover opacity-0 transition-all  duration-300 ease-in-out-cubic',
                        )}
                        onLoadingComplete={(image) =>
                          image.classList.remove('opacity-0')
                        }
                      />
                    </a>
                  ) : (
                    <Image
                      key={(String(index) + logo?.logo?.alt) as string}
                      src={urlForImage(logo?.logo)
                        .width(1000)
                        .quality(90)
                        .url()}
                      alt={logo?.logo?.alt as string}
                      width={1000}
                      height={1000}
                      className={clsx(
                        'object-cover opacity-0 transition-all  duration-300 ease-in-out-cubic',
                      )}
                      onLoadingComplete={(image) =>
                        image.classList.remove('opacity-0')
                      }
                    />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImageGrid
