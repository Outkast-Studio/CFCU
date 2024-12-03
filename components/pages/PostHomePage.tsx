import { BlogHomepageType, PostPageType } from 'types/sanity'
import Image from 'next/image'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import { PostCard } from 'components/global/modules/RelatedStories'
import Pagination from 'components/search/pagination'
import Link from 'next/link'
type Props = {
  allPosts: PostPageType[]
  data: BlogHomepageType
}

const PostHomePage = ({ allPosts, data }: Props) => {
  return (
    <main
      className={clsx(
        'px-[24px]',
        'lg:px-[48px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
      )}
    >
      <section className={clsx('pt-[79px]', 'lg:pt-[48px]')}>
        <Link href={'/'} className={clsx('block w-fit focus:!shadow-none')}>
          <Image
            src={'/icons/logoPurple.png'}
            alt={'Community Financial Logo'}
            width={500}
            height={108}
            className={clsx('w-[212px]', 'lg:w-[244.71px]')}
          />
        </Link>
        <h1
          className={clsx(
            'text-center uppercase text-lavender mt-[119px] font-codec-fat text-[44px] leading-[39.6px] tracking-[-0.16px]',
            'lg:text-[172px] lg:leading-[154.8px] lg:tracking-[-0.16px] lg:mt-[143px]',
          )}
        >
          {data?.title}
        </h1>
        <div
          className={clsx(
            'text-black/75 text-center mt-[20px] w-paragraph-m-desktop',
            'lg:max-w-[922px] lg:mx-auto lg:font-codec-news lg:mt-[2px] lg:text-[24px] lg:leading-[36px]',
          )}
        >
          <PortableText value={data?.description} />
        </div>
      </section>
      <section
        className={clsx(
          'grid grid-cols-2 gap-x-[24px] gap-y-[49px] mb-[95px] mt-[49px]',
          'lg:mt-[111px] lg:grid lg:grid-cols-3 lg:gap-x-[32px] lg:gap-y-[96px] lg:mb-[96px]',
        )}
      >
        {allPosts.map((post, index) => (
          <PostCard data={post} key={index} />
        ))}
      </section>
      <Pagination
        totalPages={allPosts.length}
        currentPage={1}
        prevUrl={'#'}
        nextUrl={'#'}
        generateButtonUrl={(page: number) => {
          return `#`
        }}
      />
    </main>
  )
}

export default PostHomePage
