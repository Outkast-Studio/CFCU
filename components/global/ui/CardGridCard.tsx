import { CtaCardGridHomeType } from 'types/sanity'
import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { PortableText } from '@portabletext/react'
import PortableTextComponents from 'lib/portabletTextComponents'
import Link from 'next/link'

export default function CardGridCard({
  data,
}: {
  data: CtaCardGridHomeType['cards'][0]
}) {
  return (
    <Link href={data.path}>
      <article className={clsx('w-[239px]')}>
        <div className={clsx('aspect-w-10 aspect-h-11 relative')}>
          <Image
            src={urlForImage(data.image).url()}
            alt={data.image.alt as string}
            fill
            className={clsx('object-cover w-full h-full')}
          />
        </div>
        <h5
          className={clsx(
            'font-codec-extra-bold text-[18px] leading-[21.6px] text-lavendar mt-[14px]',
          )}
        >
          {data.title} <span className={clsx('text-orange')}>→</span>
        </h5>
        <div
          className={clsx('text-[14px] leading-[21px] text-black/65 mt-[4px]')}
        >
          <PortableText
            value={data.description}
            components={PortableTextComponents}
          />
        </div>
      </article>
    </Link>
  )
}
