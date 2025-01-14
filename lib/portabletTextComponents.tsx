import Image from 'next/image'
import { urlForImage } from '../lib/sanity.image'
import clsx from 'clsx'
import WTable from '@/components/global/ui/wTable'
import { getImageDimensions } from '@sanity/asset-utils'

export const WysiwygComponentsWithoutPadding = {
  types: {
    image: ({ value }) => (
      <figure
        className={clsx(
          'flex flex-col gap-y-[17px]  w-full re',
          'lg:items-end lg:gap-y-[9px] lg:px-[0px]',
        )}
      >
        <Image
          src={urlForImage(value).width(1200).quality(100).url()}
          alt={String(value.alt)}
          quality={100}
          width={getImageDimensions(value).width}
          height={getImageDimensions(value).height}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          className={clsx(
            'w-full object-contain opacity-0 transition-all duration-300 ease-in-out-cubic',
          )}
        />
        <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
          {value.caption}
        </figcaption>
      </figure>
    ),
    fullBleedImage: ({ value }) => (
      <figure
        className={clsx(
          'flex flex-col gap-y-[17px] w-full',
          'lg:items-end lg:gap-y-[9px] lg:px-[0px]',
        )}
      >
        <Image
          src={urlForImage(value).width(2440).url()}
          alt={String(value.alt)}
          width={getImageDimensions(value).width}
          height={getImageDimensions(value).height}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          className={clsx(
            'w-full object-cover opacity-0 transition-all duration-300 ease-in-out-cubic',
          )}
        />
        <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
          {value.caption}
        </figcaption>
      </figure>
    ),
    table: ({ value }) => <WTable data={value} noPadding />,
  },

  marks: {
    strong: ({ children }) => (
      <strong className={clsx('font-codec-heavy')}>{children}</strong>
    ),
    link: ({ children, value }) => (
      <a
        href={value.href}
        className={clsx('underline font-codec-heavy text-lavender')}
      >
        {children}
      </a>
    ),
    telEmailLink: ({ children, value }) => (
      <a
        href={value.href}
        className={clsx('underline font-codec-heavy text-lavender')}
      >
        {children}
      </a>
    ),

    leftAligned: ({ children }) => (
      <div className={clsx('text-left')}>{children}</div>
    ),
    centerAligned: ({ children }) => (
      <div className={clsx('text-center')}>{children}</div>
    ),
    rightAligned: ({ children }) => (
      <div className={clsx('text-right')}>{children}</div>
    ),
    sub: ({ children }) => <sub>{children}</sub>,
    sup: ({ children }) => <sup>{children}</sup>,
  },

  block: {
    h1: ({ children }) => (
      <h1
        className={clsx(
          'w-h1 text-lavender w-full',
          'lg:w-h1-desktop lg:px-[0px]',
        )}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={clsx(
          'w-h2 text-lavender w-full ',
          'lg:w-h2-desktop lg:px-[0px]',
        )}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={clsx(' w-h3 text-lavender', 'lg:w-h3-desktop lg:px-[0px]')}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className={clsx('w-h4 text-lavender ', 'lg:w-h4-desktop lg:px-[0px]')}
      >
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className={clsx(' w-h5 text-lavender ', 'lg:w-h5-desktop')}>
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6
        className={clsx('w-h6 text-lavender ', 'lg:w-h6-desktop lg:px-[0px]')}
      >
        {children}
      </h6>
    ),
    normal: ({ children }) => (
      <p
        className={clsx(
          'w-full w-paragraph-s-desktop  text-black/75 ',
          'lg:px-[0px] lg:w-paragraph-l-desktop',
        )}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={clsx(
          '  text-lavender border-t-orange border-t-[4px] pt-[24px] text-[24px] leading-[30px]',
          'lg:text-[36px] lg:leading-[46.08px] font-codec-heavy lg:border-t-[4px]  lg:mx-auto',
        )}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className={clsx(
          'list-disc list-inside w-full flex flex-col gap-y-[21px] w-paragraph-s-desktop text-black/75',
          'lg:px-[0px] lg:w-paragraph-l-desktop',
        )}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className={clsx(
          'list-none list-inside  w-full flex flex-col gap-y-[21px] lg:w-paragraph-l-desktop text-black/75',
          'lg:px-[0px]',
        )}
      >
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className={clsx('flex gap-x-[16px] items-center')}>
        <span
          className={clsx(
            'inline-block w-[6px] h-[6px] rounded-full bg-lavender flex-shrink-0',
          )}
        ></span>
        <span
          className={clsx(
            'inline-block w-paragraph-s-desktop',
            'lg:text-[21px] lg:leading-[31.5px]',
          )}
        >
          {children}
        </span>
      </li>
    ),
    number: ({ children, index }) => (
      <li className={clsx('flex gap-x-[12px] items-start')}>
        <span
          className={clsx(
            'inline-block w-[19px] h-[32px] text-[21px] leading-[31.5px] font-codec-heavy text-lavender',
          )}
        >
          {index + 1}.
        </span>
        <span
          className={clsx(
            'inline-block w-paragraph-s-desktop',
            'lg:text-[21px] lg:leading-[31.5px]',
          )}
        >
          {children}
        </span>
      </li>
    ),
  },
}

export const WysiwygComponents = {
  types: {
    image: ({ value }) => (
      <figure
        className={clsx(
          'flex flex-col gap-y-[17px] px-[24px] max-w-[888px] mx-auto w-full',
          'lg:items-end lg:gap-y-[9px] lg:px-[0px]',
        )}
      >
        <Image
          src={urlForImage(value).width(2440).quality(100).url()}
          alt={String(value.alt)}
          width={getImageDimensions(value).width}
          height={getImageDimensions(value).height}
          quality={100}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          className={clsx(
            'w-full object-cover opacity-0 transition-all duration-300 ease-in-out-cubic',
          )}
        />
        <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
          {value.caption}
        </figcaption>
      </figure>
    ),
    fullBleedImage: ({ value }) => (
      <figure
        className={clsx(
          'flex flex-col gap-y-[17px] px-[24px] w-full',
          'lg:items-end lg:gap-y-[9px] lg:px-[0px]',
        )}
      >
        <Image
          src={urlForImage(value).width(2440).url()}
          alt={String(value.alt)}
          width={getImageDimensions(value).width}
          height={getImageDimensions(value).height}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          className={clsx(
            'w-full object-cover opacity-0 transition-all duration-300 ease-in-out-cubic',
          )}
        />
        <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
          {value.caption}
        </figcaption>
      </figure>
    ),
    table: ({ value }) => <WTable data={value} />,
  },

  marks: {
    strong: ({ children }) => (
      <strong className={clsx('font-codec-heavy')}>{children}</strong>
    ),
    link: ({ children, value }) => (
      <a
        href={value.href}
        className={clsx('underline font-codec-heavy text-lavender')}
      >
        {children}
      </a>
    ),
    telEmailLink: ({ children, value }) => (
      <a
        href={value.href}
        className={clsx('underline font-codec-heavy text-lavender')}
      >
        {children}
      </a>
    ),
    leftAligned: ({ children }) => (
      <span className={clsx('text-left block')}>{children}</span>
    ),
    centerAligned: ({ children }) => (
      <span className={clsx('text-center block')}>{children}</span>
    ),
    rightAligned: ({ children }) => (
      <span className={clsx('text-right block')}>{children}</span>
    ),
    sub: ({ children }) => <sub>{children}</sub>,
    sup: ({ children }) => <sup>{children}</sup>,
  },

  block: {
    h1: ({ children }) => (
      <h1
        className={clsx(
          'w-h1 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h1-desktop lg:px-[0px]',
        )}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={clsx(
          'w-h2 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h2-desktop lg:px-[0px]',
        )}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={clsx(
          ' w-h3 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h3-desktop lg:px-[0px]',
        )}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className={clsx(
          'w-h4 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h4-desktop lg:px-[0px]',
        )}
      >
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5
        className={clsx(
          ' w-h5 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h5-desktop lg:px-[0px]',
        )}
      >
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6
        className={clsx(
          'w-h6 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h6-desktop lg:px-[0px]',
        )}
      >
        {children}
      </h6>
    ),
    normal: ({ children }) => (
      <p
        className={clsx(
          'max-w-[888px] mx-auto w-full w-paragraph-s-desktop  px-[24px] text-black/75 ',
          'lg:px-[0px] lg:w-paragraph-l-desktop',
        )}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={clsx(
          'max-w-[888px]   text-lavender border-t-orange border-t-[4px] pt-[24px] text-[24px] leading-[30px] mx-[24px]',
          'lg:text-[36px] lg:leading-[46.08px] font-codec-heavy lg:border-t-[4px]  lg:mx-auto',
        )}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className={clsx(
          'list-disc list-inside max-w-[888px] mx-auto w-full flex flex-col gap-y-[21px] w-paragraph-s-desktop px-[24px] text-black/75',
          'lg:px-[0px] lg:w-paragraph-l-desktop',
        )}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className={clsx(
          'list-none list-inside max-w-[888px] mx-auto w-full flex flex-col gap-y-[21px] lg:w-paragraph-l-desktop px-[24px] text-black/75',
          'lg:px-[0px]',
        )}
      >
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className={clsx('flex gap-x-[16px] items-center')}>
        <span
          className={clsx(
            'inline-block w-[6px] h-[6px] rounded-full bg-lavender flex-shrink-0 ',
          )}
        ></span>
        <span
          className={clsx(
            'inline-block w-paragraph-s-desktop',
            'lg:text-[21px] lg:leading-[31.5px]',
          )}
        >
          {children}
        </span>
      </li>
    ),
    number: ({ children, index }) => (
      <li className={clsx('flex gap-x-[12px] items-start')}>
        <span
          className={clsx(
            'inline-block w-[19px] h-[32px] text-[21px] leading-[31.5px] font-codec-heavy text-lavender',
          )}
        >
          {index + 1}.
        </span>
        <span
          className={clsx(
            'inline-block w-paragraph-s-desktop',
            'lg:text-[21px] lg:leading-[31.5px]',
          )}
        >
          {children}
        </span>
      </li>
    ),
  },
}
