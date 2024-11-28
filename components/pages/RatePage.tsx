import { clsx } from 'clsx'
import { RatePageType } from 'types/sanity'
import ModuleFactory from 'components/global/modules/RatesPageModuleFactory'

const RatePage = ({ data }: { data: RatePageType }) => {
  console.log(data)
  return (
    <div>
      <ModuleFactory modules={data?.modules || []} />
    </div>
  )
}

export default RatePage
