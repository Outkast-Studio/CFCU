import { CtaCardGridHomeType } from 'types/sanity'
import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { PortableText } from '@portabletext/react'
import { WysiwygComponentsWithoutPadding } from 'lib/portabletTextComponents'
import CardLink from '../ui/CardLink'

export default function CardGridCard({
  data,
}: {
  data: CtaCardGridHomeType['cards'][0]
}) {
  return data?.cardLink ? (
    <CardLink data={data?.cardLink} className={clsx('group')}>
      <article className={clsx('w-[239px]', 'lg:w-full')}>
        <div
          className={clsx('aspect-w-10 aspect-h-11 relative overflow-hidden')}
        >
          <Image
            src={
              data?.image
                ? urlForImage(data?.image).width(888).quality(100).url()
                : ''
            }
            alt={data?.image?.alt as string}
            width={888}
            height={888}
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            className={clsx(
              'object-cover w-full h-full lg:group-hover:scale-[1.03] tranisiton-all duration-300 ease-in-out-cubic opacity-0',
            )}
          />
        </div>
        {data?.title && (
          <h5
            className={clsx(
              'font-codec-extra-bold text-[18px] leading-[21.6px] text-lavender mt-[14px] flex gap-x-[6px] items-center',
              'lg:w-h6-desktop lg:mt-[19px]',
            )}
          >
            {data?.title}{' '}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={clsx(
                'lg:group-hover:translate-x-[6px] transition-transform duration-300 ease-in-out-cubic',
              )}
            >
              <path
                d="M13.8538 8.35378L9.35375 12.8538C9.25993 12.9476 9.13268 13.0003 9 13.0003C8.86732 13.0003 8.74007 12.9476 8.64625 12.8538C8.55243 12.76 8.49972 12.6327 8.49972 12.5C8.49972 12.3674 8.55243 12.2401 8.64625 12.1463L12.2931 8.50003H2.5C2.36739 8.50003 2.24021 8.44736 2.14645 8.35359C2.05268 8.25982 2 8.13264 2 8.00003C2 7.86743 2.05268 7.74025 2.14645 7.64648C2.24021 7.55271 2.36739 7.50003 2.5 7.50003H12.2931L8.64625 3.85378C8.55243 3.75996 8.49972 3.63272 8.49972 3.50003C8.49972 3.36735 8.55243 3.2401 8.64625 3.14628C8.74007 3.05246 8.86732 2.99976 9 2.99976C9.13268 2.99976 9.25993 3.05246 9.35375 3.14628L13.8538 7.64628C13.9002 7.69272 13.9371 7.74786 13.9623 7.80856C13.9874 7.86926 14.0004 7.93433 14.0004 8.00003C14.0004 8.06574 13.9874 8.13081 13.9623 8.1915C13.9371 8.2522 13.9002 8.30735 13.8538 8.35378Z"
                fill="#F56600"
              />
            </svg>
          </h5>
        )}
        {data?.description && (
          <p
            className={clsx(
              'text-[14px] leading-[21px] text-black/65 mt-[4px]',
              'lg:w-paragraph-s-desktop',
            )}
          >
            {data?.description}
          </p>
        )}
      </article>
    </CardLink>
  ) : (
    <article className={clsx('w-[239px]', 'lg:w-full')}>
      <div className={clsx('aspect-w-10 aspect-h-11 relative overflow-hidden')}>
        <Image
          src={
            data?.image
              ? urlForImage(data?.image).width(888).quality(100).url()
              : ''
          }
          alt={data?.image?.alt as string}
          width={888}
          height={888}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          className={clsx(
            'object-cover w-full h-full lg:group-hover:scale-[1.03] tranisiton-all duration-300 ease-in-out-cubic opacity-0',
          )}
        />
      </div>
      {data?.title && (
        <h5
          className={clsx(
            'font-codec-extra-bold text-[18px] leading-[21.6px] text-lavender mt-[14px] flex gap-x-[6px] items-center',
            'lg:w-h6-desktop lg:mt-[19px]',
          )}
        >
          {data?.title}{' '}
          {/* <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
              'lg:group-hover:translate-x-[6px] transition-transform duration-300 ease-in-out-cubic',
            )}
          >
            <path
              d="M13.8538 8.35378L9.35375 12.8538C9.25993 12.9476 9.13268 13.0003 9 13.0003C8.86732 13.0003 8.74007 12.9476 8.64625 12.8538C8.55243 12.76 8.49972 12.6327 8.49972 12.5C8.49972 12.3674 8.55243 12.2401 8.64625 12.1463L12.2931 8.50003H2.5C2.36739 8.50003 2.24021 8.44736 2.14645 8.35359C2.05268 8.25982 2 8.13264 2 8.00003C2 7.86743 2.05268 7.74025 2.14645 7.64648C2.24021 7.55271 2.36739 7.50003 2.5 7.50003H12.2931L8.64625 3.85378C8.55243 3.75996 8.49972 3.63272 8.49972 3.50003C8.49972 3.36735 8.55243 3.2401 8.64625 3.14628C8.74007 3.05246 8.86732 2.99976 9 2.99976C9.13268 2.99976 9.25993 3.05246 9.35375 3.14628L13.8538 7.64628C13.9002 7.69272 13.9371 7.74786 13.9623 7.80856C13.9874 7.86926 14.0004 7.93433 14.0004 8.00003C14.0004 8.06574 13.9874 8.13081 13.9623 8.1915C13.9371 8.2522 13.9002 8.30735 13.8538 8.35378Z"
              fill="#F56600"
            />
          </svg> */}
        </h5>
      )}
      {data?.description && (
        <p
          className={clsx(
            'text-[14px] leading-[21px] text-black/65 mt-[4px]',
            'lg:w-paragraph-s-desktop',
          )}
        >
          {data?.description}
        </p>
      )}
    </article>
  )
}
