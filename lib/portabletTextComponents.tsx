import Image from 'next/image'
import { urlForImage } from '../lib/sanity.image'
import clsx from 'clsx'

const PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        src={urlForImage(value).quality(80).width(2440).url()}
        alt={String(value.alt)}
        width={2440}
        height={2440}
        className={clsx('my-[22px]')}
      />
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className={clsx('font-codec-heavy')}>{children}</strong>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className={clsx('w-h1 text-lavender', 'lg:w-h1-desktop')}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className={clsx('w-h2 text-lavender', 'lg:w-h2-desktop')}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={clsx(' w-h3 text-lavender', 'lg:w-h3-desktop')}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className={clsx('w-h4 text-lavender', 'lg:w-h4-desktop')}>
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className={clsx(' w-h5 text-lavender', 'lg:w-h5-desktop')}>
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className={clsx('w-h6 text-lavender', 'lg:w-h6-desktop')}>
        {children}
      </h6>
    ),
    normal: ({ children }) => <p className={clsx('')}>{children}</p>,
    blockquote: ({ children }) => (
      <blockquote
        className={clsx('border-l-4 border-gray-300 pl-4 italic my-6')}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className={clsx(
          'list-disc list-outside flex flex-col gap-y-[21px] ml-[17px]',
        )}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className={clsx('list-decimal list-outside')}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li
        className={clsx(
          'text-[21px] font-codec-news leading-[31.5px] pl-[4px]',
        )}
      >
        {children}
      </li>
    ),
    number: ({ children }) => <li className={clsx('mb-1')}>{children}</li>,
  },
}

export default PortableTextComponents
