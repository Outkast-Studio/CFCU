import { clsx } from 'clsx'
import React from 'react'
import { PostPageType } from 'types/sanity'

import ModuleFactory from 'components/global/modules/ModuleFactory'
import { renderModule } from 'components/global/modules/ModuleFactory'
import Hero from 'components/posts/Hero'

const PostPage = ({ data }: { data: PostPageType }) => {
  const siteAlerts = data?.modules?.filter(
    //@ts-ignore
    (module) => module?._type === 'siteAlert',
  )
  return (
    <main>
      {siteAlerts?.map((module, index) => (
        <React.Fragment key={`site-alert-${index}`}>
          {renderModule(module)}
        </React.Fragment>
      ))}
      <Hero post={data} />
      {data?.modules && <ModuleFactory modules={data?.modules || []} />}
    </main>
  )
}

export default PostPage
