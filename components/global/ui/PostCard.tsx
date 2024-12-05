import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import Link from 'next/link'
import { PostPageType } from '@/types/sanity'

const PostCard = ({
  data,
  isBlogListing,
}: {
  data: PostPageType
  isBlogListing?: boolean
}) => {
  return (
    <Link href={`/${data.slug.current}`} className={clsx('block')}>
      <article
        className={clsx(
          !isBlogListing ? 'min-w-[240px] max-w-[calc(33vw-26px)]' : 'w-full',
          'lg:max-w-[unset]',
        )}
      >
        <Image
          src={urlForImage(data?.thumbnailImage).url()}
          alt={data?.thumbnailImage?.alt as string}
          width={1920}
          height={1080}
          className={clsx('object-cover w-full h-auto')}
        />
        <div className={clsx('flex flex-col mt-[13px]', 'lg:mt-[25px]')}>
          <h4
            className={clsx(
              'font-codec-news text-[14px] leading-[14px] tracking-[1.6px] uppercase text-black/75',
              'lg:subtitle-m',
            )}
          >
            {data?.type}
          </h4>
          <h5
            className={clsx(
              'font-codec-extra-bold text-[18px] leading-[23.4px] lg:text-[24px] lg:leading-[28px]  mt-[10px] text-lavender',
              'lg:w-h5-desktop lg:mt-[12px]',
            )}
          >
            {data?.title}
          </h5>
          <p
            className={clsx(
              'font-codec-news mt-[4px] max-w-[152px] text-[14px] leading-[19.6px]',
              'lg:w-paragraph-m-desktop lg:max-w-[390px]',
            )}
          >
            {data?.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
