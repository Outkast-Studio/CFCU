import React from 'react'
import { PostPageType } from 'types/sanity'
import Image from 'next/image'
import { clsx } from 'clsx'
import { urlForImage } from 'lib/sanity.image'
import Link from 'next/link'
import { formatDate } from 'utils'

const Hero = ({ post }: { post: PostPageType }) => {
  //TODO update this page button when we know the behaviour here.
  return (
    <section className={clsx('pt-[48px]')}>
      <Image
        src={'/icons/logoPurple.png'}
        alt={'Community Financial Logo'}
        width={500}
        height={108}
        className={clsx('w-[212px]', 'lg:w-[244.71px]')}
        priority
      />
      <div
        className={clsx('mt-[99px] grid grid-cols-2 gap-x-[24px] items-center')}
      >
        <article>
          <Link href={'/locations'} className={clsx('block')}>
            <button
              className={clsx(
                'flex gap-x-[6px] py-[8px] px-[16px] rounded-full items-center bg-lightGrey',
              )}
            >
              <svg
                width="5"
                height="9"
                viewBox="0 0 5 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.86046 8.51528L0.110455 4.76528C0.075589 4.73045 0.0479291 4.68909 0.0290578 4.64357C0.010186 4.59804 0.000473317 4.54925 0.000473319 4.49996C0.000473321 4.45068 0.010186 4.40189 0.0290578 4.35636C0.0479291 4.31084 0.075589 4.26948 0.110455 4.23465L3.86046 0.484652C3.93082 0.414287 4.02626 0.374756 4.12577 0.374756C4.22528 0.374756 4.32072 0.414287 4.39108 0.484652C4.46145 0.555017 4.50098 0.650453 4.50098 0.749964C4.50098 0.849476 4.46145 0.944912 4.39108 1.01528L0.905924 4.49996L4.39108 7.98465C4.42592 8.01949 4.45356 8.06086 4.47242 8.10638C4.49127 8.1519 4.50098 8.20069 4.50098 8.24996C4.50098 8.29924 4.49127 8.34803 4.47242 8.39355C4.45356 8.43907 4.42592 8.48044 4.39108 8.51528C4.35624 8.55012 4.31488 8.57776 4.26935 8.59661C4.22383 8.61547 4.17504 8.62517 4.12577 8.62517C4.07649 8.62517 4.0277 8.61547 3.98218 8.59661C3.93666 8.57776 3.8953 8.55012 3.86046 8.51528Z"
                  fill="#F56600"
                />
              </svg>
              <span
                className={clsx(
                  'font-codec-pro text-lavender text-[12px] leading-[18px]',
                )}
              >
                Resource
              </span>
            </button>
          </Link>
          <h1
            className={clsx(
              'text-lavender',
              'lg:text-[80px] lg:leading-[75.2px] lg:tracking-[-0.32px] lg:font-codec-extra-bold lg:mt-[29px]',
            )}
          >
            {post?.title}
          </h1>
          <p
            className={clsx(
              'font-codec-light text-black/75',
              'lg:text-[26px] lg:leading-[39px] lg:max-w-[542px] l:mt-[17px]',
            )}
          >
            {post?.excerpt}
          </p>
          <div
            className={clsx('grid grid-cols-2 gap-x-[24px] mt-[36px] w-[75%]')}
          >
            <div className={clsx('flex flex-col gap-y-[8px]')}>
              <h4
                className={clsx(
                  'text-[14px] leading-[14px] tracking-[1.6px] text-black/75 font-codec-news uppercase',
                )}
              >
                Author
              </h4>
              <h5
                className={clsx(
                  'font-codec-pro text-black text-[16px] leading-[20.8px]',
                )}
              >
                {post?.author?.name}
              </h5>
            </div>
            <div className={clsx('flex flex-col gap-y-[8px]')}>
              <h4
                className={clsx(
                  'text-[14px] leading-[14px] tracking-[1.6px] text-black/75 font-codec-news uppercase',
                )}
              >
                Date
              </h4>
              <h5
                className={clsx(
                  'font-codec-pro text-black text-[16px] leading-[20.8px]',
                )}
              >
                {formatDate(post?.date)}
              </h5>
            </div>
          </div>
        </article>
        <div className={clsx('aspect-w-8 aspect-h-7 w-full')}>
          <Image
            src={urlForImage(post?.thumbnailImage).url()}
            alt=""
            fill
            className={clsx('object-cover w-full h-full')}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
