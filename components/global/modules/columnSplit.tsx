import { ColumnSplitType } from 'types/sanity'
import { PortableText } from '@portabletext/react'
import { clsx } from 'clsx'
import { PortableTextComponents } from 'lib/portabletTextComponents'

const ColumnSplit = ({ data }: { data: ColumnSplitType }) => {
  console.log(data)
  return (
    <section
      className={clsx(
        'px-[24px]  py-[66px]',
        'lg:px-[48px] lg:pt-[95px] lg:pb-[117px] lg:max-w-[1800px] lg:mx-auto',
      )}
    >
      {data?.subtitle && (
        <h2
          className={clsx(
            'subtitle-m text-black/75 mb-[9px]',
            'lg:mb-[11px] lg:subtitle-l',
          )}
        >
          {data?.subtitle}
        </h2>
      )}
      <h3 className={clsx('title-xl text-orange', 'lg:title-xl-desktop')}>
        {data?.title}
      </h3>
      {data?.description && (
        <div
          className={clsx(
            'mt-[15px] text-black/75 w-paragraph-s-desktop',
            'lg:mt-[11px] lg:w-paragraph-l-desktop',
          )}
        >
          <PortableText value={data?.description} />
        </div>
      )}
      <div
        className={clsx(
          'mt-[41px]',
          'lg:grid lg:mt-[57px] lg:gap-x-[24px]',
          data?.columns?.length == 2 && 'lg:grid-cols-2',
          data?.columns?.length == 3 && 'lg:grid-cols-3',
          data?.columns?.length == 4 && 'lg:grid-cols-4',
          data?.columns?.length == 5 && 'lg:grid-cols-5',
        )}
      >
        {data?.columns?.map((column, index) => (
          <div key={index}>
            <PortableText
              value={column?.content}
              components={PortableTextComponents as any}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ColumnSplit
