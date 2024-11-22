import { CtaTopicRowType } from 'types/sanity'
import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { getThemeClasses } from 'lib/themeConfig'
import PortableTextComponents from 'lib/portabletTextComponents'
import { PortableText } from '@portabletext/react'
import PageLink from '../ui/PageLink'
import { stegaClean } from '@sanity/client/stega'

const CtaTopicRow = ({ data }: { data: CtaTopicRowType }) => {
  const theme = getThemeClasses(data?.theme?.label)

  return (
    <section
      className={clsx(
        'px-[24px] pt-[26px] pb-[147px]',
        'lg:pt-[96px] lg:flex lg:gap-x-[59px] lg:px-[0px] lg:max-w-[1800px] lg:mx-auto',
        stegaClean(data?.imagePosition) === 'left'
          ? 'lg:flex-row'
          : 'lg:flex-row-reverse',
        'xl:pl-[48px]',
      )}
      style={{
        backgroundColor:
          stegaClean(data?.theme?.label) === 'White'
            ? theme?.backgroundWhite
            : theme?.background,
        color: theme?.heading,
      }}
    >
      <div
        className={clsx(
          'relative w-full h-auto ',
          'lg:flex-shrink-0 lg:w-[calc(50%-59px)]',
        )}
      >
        <Image
          src={urlForImage(data?.image).url()}
          alt={data?.image.alt as string}
          width={1920}
          height={1080}
          className={clsx('object-cover w-full h-full')}
        />
      </div>
      <div
        className={clsx(
          'flex flex-col gap-y-[16px] mt-[30px]',
          'lg:mt-[0px] lg:pt-[28px] lg:gap-y-[24px] lg:pb-[50px] ',
          stegaClean(data?.imagePosition) === 'left'
            ? 'lg:pr-[48px]'
            : 'lg:pl-[48px]',
        )}
      >
        <h2
          className={clsx(
            'title-m font-codec-heavy text-center',
            'lg:text-left lg:title-m-desktop',
          )}
        >
          {data?.title}
        </h2>
        <div
          style={{ color: theme?.monotoneCopy }}
          className={clsx(
            'font-codec-regular w-paragraph-s-desktop text-center',
            'lg:text-left lg:w-paragraph-l-desktop',
          )}
        >
          <PortableText value={data?.description} />
        </div>
        <nav
          style={{ color: theme?.monotoneCopy }}
          className={clsx(
            'flex flex-col gap-y-[12px]  items-center',
            'lg:items-start',
          )}
        >
          {data?.links?.map((link, index) => (
            <PageLink
              key={index}
              data={link}
              className={clsx(
                'font-codec-extra-bold text-[18px] leading-[27px]  text- flex gap-x-[6px] items-center',
              )}
            >
              <span>{link?.title}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8538 8.35378L9.35375 12.8538C9.25993 12.9476 9.13268 13.0003 9 13.0003C8.86732 13.0003 8.74007 12.9476 8.64625 12.8538C8.55243 12.76 8.49972 12.6327 8.49972 12.5C8.49972 12.3674 8.55243 12.2401 8.64625 12.1463L12.2931 8.50003H2.5C2.36739 8.50003 2.24021 8.44736 2.14645 8.35359C2.05268 8.25982 2 8.13264 2 8.00003C2 7.86743 2.05268 7.74025 2.14645 7.64648C2.24021 7.55271 2.36739 7.50003 2.5 7.50003H12.2931L8.64625 3.85378C8.55243 3.75996 8.49972 3.63272 8.49972 3.50003C8.49972 3.36735 8.55243 3.2401 8.64625 3.14628C8.74007 3.05246 8.86732 2.99976 9 2.99976C9.13268 2.99976 9.25993 3.05246 9.35375 3.14628L13.8538 7.64628C13.9002 7.69272 13.9371 7.74786 13.9623 7.80856C13.9874 7.86926 14.0004 7.93433 14.0004 8.00003C14.0004 8.06574 13.9874 8.13081 13.9623 8.1915C13.9371 8.2522 13.9002 8.30735 13.8538 8.35378Z"
                  fill={
                    stegaClean(data?.theme?.label) === 'Orange'
                      ? '#000'
                      : '#F56600'
                  }
                />
              </svg>
            </PageLink>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default CtaTopicRow
