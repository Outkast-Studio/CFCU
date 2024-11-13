import { CtaCardGridHomeType } from 'types/sanity'
import { clsx } from 'clsx'
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react'
import 'swiper/css'
import CardGridCard from '../ui/CardGridCard'
import Link from 'next/link'

const CtaCardGridHome = ({ data }: { data: CtaCardGridHomeType }) => {
  console.log(data)
  return (
    <section className={clsx('bg-white pt-[33px] pb-[98px]')}>
      <div className={clsx('px-[24px]')}>
        <h2
          className={clsx(
            'text-[16px] leading-[16px] font-codec-news text-[#606060] tracking-[1.6px]',
          )}
        >
          {data.subTitle}
        </h2>
        <h3 className={clsx('title-m text-lavendar mt-[17px]')}>
          {data.title}
        </h3>
      </div>
      <Swiper
        slidesOffsetAfter={24}
        slidesOffsetBefore={24}
        spaceBetween={24}
        slidesPerView={'auto'}
        className={clsx('mt-[39px]')}
      >
        {data.cards.map((card, index) => (
          <SwiperSlide key={index} className={clsx('!w-fit')}>
            <CardGridCard data={card} />
          </SwiperSlide>
        ))}
      </Swiper>
      <article
        className={clsx(
          'bg-lavendar mx-[24px] px-[38px] pt-[46px] pb-[48px] mt-[37px]',
        )}
      >
        <h5
          className={clsx(
            'font-codec-news text-[16px] leading-[16px] tracking-[1.6px] text-white uppercase',
          )}
        >
          {data.linkListTitle}
        </h5>
        <nav className={clsx('flex flex-col gap-y-[12px] mt-[19px]')}>
          {data.linkList.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={clsx(
                'font-codec-extra-bold text-[18px] leading-[27px]  text-white flex gap-x-[6px] items-center',
              )}
            >
              <span>{link.title}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8538 8.35378L9.35375 12.8538C9.25993 12.9476 9.13268 13.0003 9 13.0003C8.86732 13.0003 8.74007 12.9476 8.64625 12.8538C8.55243 12.76 8.49972 12.6327 8.49972 12.5C8.49972 12.3674 8.55243 12.2401 8.64625 12.1463L12.2931 8.50003H2.5C2.36739 8.50003 2.24021 8.44736 2.14645 8.35359C2.05268 8.25982 2 8.13264 2 8.00003C2 7.86743 2.05268 7.74025 2.14645 7.64648C2.24021 7.55271 2.36739 7.50003 2.5 7.50003H12.2931L8.64625 3.85378C8.55243 3.75996 8.49972 3.63272 8.49972 3.50003C8.49972 3.36735 8.55243 3.2401 8.64625 3.14628C8.74007 3.05246 8.86732 2.99976 9 2.99976C9.13268 2.99976 9.25993 3.05246 9.35375 3.14628L13.8538 7.64628C13.9002 7.69272 13.9371 7.74786 13.9623 7.80856C13.9874 7.86926 14.0004 7.93433 14.0004 8.00003C14.0004 8.06574 13.9874 8.13081 13.9623 8.1915C13.9371 8.2522 13.9002 8.30735 13.8538 8.35378Z"
                  fill="#F56600"
                />
              </svg>
            </Link>
          ))}
        </nav>
      </article>
    </section>
  )
}

export default CtaCardGridHome
