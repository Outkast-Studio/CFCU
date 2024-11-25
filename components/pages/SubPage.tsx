import React from 'react'
import { SubPageType } from 'types/sanity'
import { clsx } from 'clsx'

import ModuleFactory from 'components/global/modules/ModuleFactory'

const SubPage = ({ data }: { data: SubPageType }) => {
  console.log(data)
  return (
    <main className={clsx('pt-[200px] pb-[100vh]')}>
      {data.modules.map((module, index) => (
        <ModuleFactory module={module} key={index} />
      ))}
    </main>
  )
}

export default SubPage
