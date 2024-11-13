import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { clsx } from 'clsx'

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
}
export default PortableTextComponents
