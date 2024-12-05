import { GetInspiredType } from 'types/sanity'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import { WysiwygComponentsWithoutPadding } from 'lib/portabletTextComponents'
import Button from '../ui/Button'
import { PostPageType } from 'types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import PageLink from '../ui/PageLink'

const GetInspired = ({ data }: { data: GetInspiredType }) => {
  return (
    <section
      className={clsx(
        'pt-[112px] px-[24px] pb-[86px]',
        'lg:pt-[95px] lg:px-[48px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto lg:pb-[69px]',
      )}
    >
      <div className={clsx('flex flex-col items-center')}>
        <h2
          className={clsx(
            'font-codec-fat text-lavender text-[46px] leading-[41.4px] text-center',
            'lg:title-xl-desktop',
          )}
        >
          {data?.title}
        </h2>
        <div
          className={clsx(
            'mt-[12px] font-codec-news text-[#353535]/65 text-center text-[18px] leading-[25.2px] max-w-[961px]',
            'lg:w-paragraph-xl-desktop lg:mt-[17px]',
          )}
        >
          <PortableText
            value={data?.description}
            components={WysiwygComponentsWithoutPadding as any}
          />
        </div>
        <PageLink
          data={data?.cta}
          className={clsx('mt-[10.5px] block', 'lg:mt-[7.5px]')}
        >
          <Button label={data?.cta?.title} />
        </PageLink>
      </div>
      <div
        className={clsx(
          'mt-[28.5px]',
          'lg:grid-cols-2 lg:grid lg:gap-x-[24px] lg:mt-[67.5px] lg:relative',
        )}
      >
        <PostCard data={data?.featuredArticle} isFeatured={true} />
        <div
          className={clsx(
            'grid grid-cols-2 gap-x-[25px] gap-y-[30px] mt-[40px]',
          )}
        >
          {data?.articleGrid?.map((article, index) => (
            <PostCard data={article} key={index} isFeatured={false} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default GetInspired

const PostCard = ({
  data,
  isFeatured,
}: {
  data: PostPageType
  isFeatured: boolean
}) => {
  return (
    <Link href={`/posts/${data.slug.current}`} className={clsx('block')}>
      <article
        className={clsx('h-fit', isFeatured && 'lg:sticky lg:top-[48px]')}
      >
        <Image
          src={urlForImage(data?.thumbnailImage).url()}
          alt={data?.thumbnailImage?.alt as string}
          width={1920}
          height={1080}
          className={clsx('object-cover w-full h-auto')}
        />
        <div
          className={clsx(
            'flex flex-col  ',
            'lg:mt-[31px]',
            isFeatured
              ? 'gap-y-[8px] mt-[24px] lg:max-w-[582px]  lg:gap-y-[13px] lg:mt-[31px]'
              : 'mt-[16px] lg:max-w-[298px] gap-y-[10px]  lg:gap-y-[8px] lg:mt-[25px]',
          )}
        >
          <h4
            className={clsx(
              'font-codec-news text-[14px] leading-[14px] tracking-[1.6px] uppercase text-black/75',
              'lg:text-[16px] lg:leading-[16px]',
            )}
          >
            {data?.type}
          </h4>
          <h5
            className={clsx(
              isFeatured
                ? 'font-codec-ultra text-[36px] leading-[36px] lg:text-[62px] lg:leading-[58px]'
                : 'font-codec-extra-bold text-[18px] leading-[23.4px] lg:text-[24px] lg:leading-[28px]',
              'text-lavender',
            )}
          >
            {data?.title}
          </h5>
          <p
            className={clsx(
              'font-codec-news',
              isFeatured
                ? 'text-[16px] leading-[24px] lg:text-[24px] lg:leading-[36px]'
                : 'text-[14px] leading-[19.6px] lg:text-[18px] lg:leading-[26px]',
            )}
          >
            {data?.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}
