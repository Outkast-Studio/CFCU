// import { RateTableType } from 'types/sanity'
// import { clsx } from 'clsx'
// import { formatDate } from 'utils'
// import { PortableText } from '@portabletext/react'

// const WTable = ({ data }: { data: RateTableType }) => {
//   const maxRows = data.columns.reduce(
//     (max, column) => Math.max(max, column.columnValues.length),
//     0,
//   )
//   return (
//     <section
//       className={clsx(
//         'py-[89px]',
//         'lg:py-[74px] lg:max-w-[888px] lg:px-[0px] lg:mx-auto',
//       )}
//     >
//       <div
//         className={clsx(
//           'px-[24px] flex flex-col gap-y-[9px]',
//           'lg:flex-row lg:justify-between lg:items-end lg:px-[0px]',
//         )}
//       >
//         <h3 className={clsx('text-lavender title-m', 'lg:title-m-desktop')}>
//           {data?.title}
//         </h3>
//         {/* <h4 className={clsx('w-paragraph-s-desktop text-black/75')}>
//           Date Updated {formatDate(data?._updatedAt)}
//         </h4> */}
//       </div>
//       <div
//         style={{ gridTemplateColumns: `repeat(${data?.columns.length}, 1fr)` }}
//         className={clsx(
//           'grid overflow-auto mt-[29px] px-[24px] w-full',
//           'lg:mt-[44px] lg:px-[0px]',
//         )}
//       >
//         {data?.columns?.map((column, index) => (
//           <div className={clsx('')} key={index}>
//             <h5
//               className={clsx(
//                 'bg-lavender pl-[20px] w-h6 text-white py-[14px]',
//                 'lg:pt-[23px] lg:pb-[16px] lg:pl-[31px] lg:w-h6-desktop',
//               )}
//             >
//               {column.columnTitle}
//             </h5>
//             <div className={clsx('flex flex-col')}>
//               {Array.from({ length: maxRows }).map((_, index) => (
//                 <div
//                   key={index}
//                   className={clsx(
//                     'pt-[16px] pb-[18px] pl-[20px] border-b-[1px] border-black/20 w-paragraph-s-desktop',
//                     index % 2 === 0 ? 'bg-[#EDEDED]/20' : 'bg-white',
//                     'lg:pl-[31px] lg:pb-[20px] lg:pt-[16px] lg:w-paragraph-l-desktop',
//                   )}
//                 >
//                   <p>{column.columnValues[index] || '\u00A0'}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* {data?.tableNotes && (
//         <div
//           className={clsx(
//             'px-[24px] pt-[28px] text-black w-paragraph-s-desktop rateTableBlock',
//             'lg:px-[48px]',
//           )}
//         >
//           <PortableText value={data?.tableNotes} />
//         </div>
//       )} */}
//     </section>
//   )
// }

// export default WTable

import { RateTableType } from 'types/sanity'
import { clsx } from 'clsx'
import { formatDate } from 'utils'
import { PortableText } from '@portabletext/react'

const WTable = ({ data }: { data: RateTableType }) => {
  const maxRows = data.columns.reduce(
    (max, column) => Math.max(max, column.columnValues.length),
    0,
  )

  return (
    <section
      className={clsx(
        'py-[89px]',
        'lg:py-[74px] lg:max-w-[888px] lg:px-[0px] lg:mx-auto',
      )}
    >
      <div
        className={clsx(
          'flex flex-col gap-y-[9px]',
          'lg:flex-row lg:justify-between lg:items-end lg:px-[0px]',
        )}
      >
        <h3 className={clsx('text-lavender title-m', 'lg:title-m-desktop')}>
          {data?.title}
        </h3>
      </div>
      <div
        className={clsx(
          'overflow-x-auto mt-[29px]  w-full',
          'lg:mt-[44px] lg:px-[0px]',
        )}
      >
        <table className="w-full" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            {data?.columns?.map((_, index) => (
              <col
                key={index}
                style={{ width: `${100 / data.columns.length}%` }}
              />
            ))}
          </colgroup>
          <thead>
            <tr>
              {data?.columns?.map((column, index) => (
                <th
                  key={index}
                  className={clsx(
                    'bg-lavender text-left w-h6 text-white py-[14px] pl-[20px]',
                    'lg:pt-[23px] lg:pb-[16px] lg:pl-[31px] lg:w-h6-desktop',
                  )}
                >
                  {column.columnTitle}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {data?.columns?.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={clsx(
                      'pt-[16px] pb-[18px] pl-[20px] border-b-[1px] border-black/20 w-paragraph-s-desktop',
                      rowIndex % 2 === 0 ? 'bg-[#EDEDED]/20' : 'bg-white',
                      'lg:pl-[31px] lg:pb-[20px] lg:pt-[16px] lg:w-paragraph-l-desktop',
                    )}
                  >
                    <p>{column.columnValues[rowIndex] || '\u00A0'}</p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default WTable
