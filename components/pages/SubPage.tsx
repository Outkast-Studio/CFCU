import React from 'react'
import { SubPageType } from 'types/sanity'
import { clsx } from 'clsx'

import ModuleFactory from 'components/global/modules/ModuleFactory'

const SubPage = ({ data }: { data: SubPageType }) => {
  console.log(data)
  return (
    <main className={clsx('pb-[100vh]')}>
      <ModuleFactory modules={data.modules} />
    </main>
  )
}

export default SubPage
