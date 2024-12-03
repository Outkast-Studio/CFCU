import { RelatedStoriesType } from 'types/sanity'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import Button from '../ui/Button'
import PageLink from '../ui/PageLink'
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react'
import 'swiper/css'
import Link from 'next/link'
import Image from 'next/image'
import { PostPageType } from 'types/sanity'
import { urlForImage } from 'lib/sanity.image'
import { stegaClean } from '@sanity/client/stega'

const RelatedStories = ({ data }: { data: RelatedStoriesType }) => {
  return (
    <section
      className={clsx(
        'pt-[66px] pb-[136px]',
        'lg:pt-[130px] lg:pb-[105px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
      )}
    >
      <article
        className={clsx('px-[24px] flex items-center flex-col', 'lg:px-[48px]')}
      >
        {data?.subTitle && (
          <h2
            className={clsx(
              'subtitle-m text-black/75 mb-[17px]',
              'lg:subtitle-l lg:mb-[7px]',
            )}
          >
            {data.subTitle}
          </h2>
        )}
        <h3
          className={clsx(
            'title-xl text-lavender ',
            stegaClean(data?.headingVariant) === 'large'
              ? 'lg:title-xl-desktop'
              : 'lg:title-m-desktop lg:py-[20px]',
          )}
        >
          {data?.title}
        </h3>
        {data.description && (
          <div
            className={clsx(
              'text-[18px] leading-[25.2px] flex flex-col gap-y-[24px] text-center font-codec-news break-words mt-[13px] text-black/75',
              'lg:w-paragraph-l-desktop lg:mt-[0px] lg:max-w-[980px]',
            )}
          >
            <PortableText value={data?.description} />
          </div>
        )}
        <PageLink data={data?.pageLink} className={clsx('mt-[16px] block')}>
          <Button label={data?.pageLink?.title} className={clsx('!p-[0px]')} />
        </PageLink>
      </article>
      <div className={clsx('mt-[47px]', 'lg:hidden')}>
        <Swiper
          slidesOffsetAfter={24}
          slidesOffsetBefore={24}
          spaceBetween={13}
          slidesPerView={'auto'}
        >
          {data?.posts?.map((post, index) => (
            <SwiperSlide key={index} className={clsx('!w-fit')}>
              {<PostCard data={post} key={index} />}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        className={clsx(
          'hidden',
          'lg:grid lg:grid-cols-3 lg:gap-x-[24px] lg:px-[48px] lg:mt-[44px]',
        )}
      >
        {data?.posts?.map((post, index) => (
          <PostCard data={post} key={index} />
        ))}
      </div>
    </section>
  )
}

export default RelatedStories

export const PostCard = ({ data }: { data: PostPageType }) => {
  return (
    <Link href={`/posts/${data.slug.current}`} className={clsx('block')}>
      <article className={clsx('h-fit max-w-[240px]', 'lg:max-w-[unset]')}>
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
