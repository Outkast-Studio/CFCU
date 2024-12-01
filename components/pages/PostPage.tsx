import React from 'react'
import { PostPageType } from 'types/sanity'
import Hero from 'components/posts/Hero'
import { clsx } from 'clsx'

const PostPage = ({ data }: { data: PostPageType }) => {
  return (
    <main className={clsx('px-[24px]', 'lg:px-[48px]')}>
      <Hero post={data} />
    </main>
  )
}

export default PostPage
