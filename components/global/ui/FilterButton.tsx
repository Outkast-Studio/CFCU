import { useState } from 'react'
import { clsx } from 'clsx'
import Link from 'next/link'
import { TopicWithRelatedPosts } from '@/types/sanity'

interface Props {
  title: string
  items: TopicWithRelatedPosts[]
  className?: string
}

const FilterButton = ({ title, items, className }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const filteredTopics = items.filter((item) => item.relatedPosts.length > 0)
  console.log(items)
  return (
    <div className={clsx('relative mx-auto w-fit')}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className={clsx(
          'flex items-center justify-center gap-x-[10px] bg-lightGrey rounded-full w-full max-w-[325px] px-[20px] py-[10.5px] font-codec-extra-bold text-[18px] leading-[27px] text-lavender',
          'lg:w-fit',
          className,
        )}
      >
        <span>{title}</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.05273 12.9199H4.55273V8.16211H0V4.78516L4.55273 4.77148L4.53906 0H8.03906L8.05273 4.77148H12.6738V8.16211H8.05273V12.9199Z"
            fill="#3C1053"
          />
        </svg>
      </button>
      {dropdownOpen && (
        <div
          className={clsx(
            'absolute top-[100%] w-full right-0 z-[1] bg-white flex flex-col',
          )}
        >
          {filteredTopics.map((item, index) => (
            <Link
              href={'posts/' + item.slug.current}
              key={index}
              className={clsx('block')}
            >
              <button>{item.name}</button>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterButton
