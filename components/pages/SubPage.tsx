import React from 'react'
import { SubPageType } from 'types/sanity'
import { clsx } from 'clsx'

import Link from 'next/link'
import ModuleFactory from 'components/global/modules/ModuleFactory'
import SubpageLinkList from 'components/global/ui/SubpageLinkList'
import SubPageHero from 'components/global/modules/subPageHero'

const SubPage = ({
  data,
  childrenPages,
}: {
  data: SubPageType
  childrenPages?: SubPageType[]
}) => {
  console.log(data, childrenPages)
  return (
    <main className={clsx('pb-[100vh]')}>
      <SubPageHero data={data?.pageHero} />
      <div className="flex flex-col">
        {childrenPages.length > 0 && <SubpageLinkList data={childrenPages} />}
      </div>
      {data?.modules && <ModuleFactory modules={data?.modules || []} />}
    </main>
  )
}

export default SubPage
