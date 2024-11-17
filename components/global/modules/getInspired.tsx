import { GetInspiredType } from 'types/sanity'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import PortableTextComponents from 'lib/portabletTextComponents'
import Button from '../ui/Button'
import Link from 'next/link'

const GetInspired = ({ data }: { data: GetInspiredType }) => {
  console.log(data)
  return (
    <section className={clsx('pt-[112px] px-[24px]', 'lg:pt-[95px]')}>
      <div className={clsx('flex flex-col items-center')}>
        <h2
          className={clsx(
            'font-codec-fat text-lavendar text-[46px] leading-[41.4px] text-center',
            'lg:title-xl-desktop',
          )}
        >
          {data.title}
        </h2>
        <div
          className={clsx(
            'mt-[12px] font-codec-news text-[#353535]/65 text-center text-[18px] leading-[25.2px] max-w-[961px]',
            'lg:w-paragraph-xl-desktop lg:mt-[17px]',
          )}
        >
          <PortableText
            value={data.description}
            components={PortableTextComponents}
          />
        </div>
        <Link
          href={data.cta.path}
          className={clsx('mt-[10.5px] block', 'lg:mt-[7.5px]')}
        >
          <Button label={data.cta.title} />
        </Link>
      </div>
      <div className={clsx('mt-[39px]')}></div>
    </section>
  )
}
export default GetInspired
