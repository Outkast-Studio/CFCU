import { BlogHomepageType, PostPageType } from 'types/sanity'
import Image from 'next/image'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import { PostCard } from 'components/global/modules/RelatedStories'
import Pagination from 'components/search/pagination'
type Props = {
  allPosts: PostPageType[]
  data: BlogHomepageType
}

const PostHomePage = ({ allPosts, data }: Props) => {
  console.log(allPosts)
  return (
    <main
      className={clsx('px-[24px]', 'lg:px-[48px] lg:max-w-[1800px] lg:mx-auto')}
    >
      <section className={clsx('lg:pt-[48px]')}>
        <Image
          src={'/icons/logoPurple.png'}
          alt={'Community Financial Logo'}
          width={500}
          height={108}
          className={clsx('w-[212px]', 'lg:w-[244.71px]')}
        />
        <h1
          className={clsx(
            'text-center uppercase text-lavender',
            'lg:font-codec-fat lg:text-[172px] lg:leading-[154.8px] lg:tracking-[-0.16px] lg:mt-[143px]',
          )}
        >
          {data?.title}
        </h1>
        <div
          className={clsx(
            'text-black/75 text-center',
            'lg:max-w-[922px] lg:mx-auto lg:font-codec-news lg:mt-[2px] lg:text-[24px] lg:leading-[36px]',
          )}
        >
          <PortableText value={data?.description} />
        </div>
      </section>
      <section
        className={clsx(
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
