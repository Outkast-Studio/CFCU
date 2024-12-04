import React from 'react'
import { PostPageType } from 'types/sanity'
import Hero from 'components/posts/Hero'
import { clsx } from 'clsx'
import ModuleFactory from 'components/global/modules/ModuleFactory'

const PostPage = ({ data }: { data: PostPageType }) => {
  console.log(data)
  return (
    <main>
      <Hero post={data} />
      <ModuleFactory modules={data?.modules || []} />
    </main>
  )
}

export default PostPage
