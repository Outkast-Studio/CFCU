import { useState } from 'react'
import { clsx } from 'clsx'
import Button from '../global/ui/Button'
import ReversedButton from '../global/ui/ReverseArrowButton'
import Link from 'next/link'

interface PaginationProps {
  totalPages: number
  currentPage: number
  prevUrl: string
  nextUrl: string
  generateButtonUrl: (page: number) => string
}

const Pagination = ({
  totalPages,
  currentPage,
  prevUrl,
  nextUrl,
  generateButtonUrl,
}: PaginationProps) => {
  return (
    <div
      className={clsx(
        'flex justify-between items-center gap-x-[32px] max-w-[1800px] mx-auto mb-[84px] hidden',
      )}
    >
      <Link
        href={prevUrl}
        className={clsx(currentPage == 1 && 'opacity-50 pointer-events-none')}
      >
        <ReversedButton
          label="Prev"
          className={clsx('!bg-lavender !text-white')}
        />
      </Link>
      <div className={clsx('flex items-center gap-x-[16px]')}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Link href={generateButtonUrl(index + 1)}>
            <button
              className={clsx(
                'w-[67px] h-[67px] bg-lightGrey font-codec-extra-bold text-lavender rounded-full',
                currentPage == index + 1 && '!bg-lavender !text-white',
              )}
            >
              {index + 1}
            </button>
          </Link>
        ))}
      </div>
      <Link
        href={nextUrl}
        className={clsx(
          currentPage == totalPages && 'opacity-50 pointer-events-none',
        )}
      >
        <Button label="next" className={clsx('!bg-lavender !text-white')} />
      </Link>
    </div>
  )
}

export default Pagination
