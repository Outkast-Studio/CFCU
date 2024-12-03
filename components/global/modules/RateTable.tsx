import { RateTableType } from 'types/sanity'
import { clsx } from 'clsx'
import { formatDate } from 'utils'
import { PortableText } from '@portabletext/react'

const RateTable = ({ data }: { data: RateTableType }) => {
  const maxRows = data.columns.reduce(
    (max, column) => Math.max(max, column.columnValues.length),
    0,
  )
  return (
    <section
      className={clsx(
        'py-[89px]',
        'lg:py-[74px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
      )}
    >
      <div
        className={clsx(
          'px-[24px] flex flex-col gap-y-[9px]',
          'lg:flex-row lg:justify-between lg:items-end lg:px-[48px]',
        )}
      >
        <h3 className={clsx('text-lavender title-m', 'lg:title-m-desktop')}>
          {data?.title}
        </h3>
        <h4 className={clsx('w-paragraph-s-desktop text-black/75')}>
          Date Updated {formatDate(data?._updatedAt)}
        </h4>
      </div>
      <div
        style={{ gridTemplateColumns: `repeat(${data?.columns.length}, 1fr)` }}
        className={clsx(
          'grid overflow-auto mt-[29px] px-[24px] w-full',
          'lg:mt-[44px] lg:px-[48px]',
        )}
      >
        {data?.columns?.map((column, index) => (
          <div className={clsx('min-w-[300px] flex-shrink-0')}>
            <h5
              className={clsx(
                'bg-lavender pl-[20px] w-h6 text-white py-[14px]',
                'lg:pt-[23px] lg:pb-[16px] lg:pl-[31px] lg:w-h6-desktop',
              )}
            >
              {column.columnTitle}
            </h5>
            <div className={clsx('flex flex-col')}>
              {Array.from({ length: maxRows }).map((_, index) => (
                <div
                  key={index}
                  className={clsx(
                    'pt-[16px] pb-[18px] pl-[20px] border-b-[1px] border-black/20 w-paragraph-s-desktop',
                    index % 2 === 0 ? 'bg-[#EDEDED]/20' : 'bg-white',
                    'lg:pl-[31px] lg:pb-[20px] lg:pt-[16px] lg:w-paragraph-l-desktop',
                  )}
                >
                  <p>{column.columnValues[index] || '\u00A0'}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {data?.tableNotes && (
        <div
          className={clsx(
            'px-[24px] pt-[28px] text-black w-paragraph-s-desktop rateTableBlock',
            'lg:px-[48px]',
          )}
        >
          <PortableText value={data?.tableNotes} />
        </div>
      )}
    </section>
  )
}

export default RateTable
