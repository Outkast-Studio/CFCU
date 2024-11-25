import { TextCardGridType } from 'types/sanity'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import PageLink from '../ui/PageLink'
import Button from '../ui/Button'

const TextCardGrid = ({ data }: { data: TextCardGridType }) => {
  console.log(data)
  return (
    <section
      className={clsx(
        'px-[24px] py-[66px]',
        'lg:grid-cols-12 lg:grid lg:gap-x-[24px] lg:px-[48px] lg:pt-[95px] lg:pb-[187px] lg:relative lg:max-w-[1800px] lg:mx-auto',
      )}
    >
      <article
        className={clsx('col-span-5', 'lg:sticky lg:top-[95px] lg:h-fit')}
      >
        {data.subtitle && (
          <h2
            className={clsx(
              'subtitle-m text-black/75 mb-[9px]',
              'lg:mb-[11px] lg:subtitle-l',
            )}
          >
            {data.subtitle}
          </h2>
        )}
        <h3 className={clsx('title-xl text-lavender', 'lg:title-xl-desktop')}>
          {data.title}
        </h3>
        {data.description && (
          <div
            className={clsx(
              'mt-[15px] text-black/75 w-paragraph-s-desktop',
              'lg:mt-[11px] lg:w-paragraph-l-desktop lg:max-w-[473px]',
            )}
          >
            <PortableText value={data.description} />
          </div>
        )}
      </article>
      <div
        className={clsx(
          'flex flex-col gap-y-[48px] mt-[32px]',
          'lg:col-start-7 lg:col-end-13 lg:grid lg:grid-cols-2 lg:gap-x-[42px]',
        )}
      >
        {data.cards?.map((card, index) => (
          <article key={index}>
            <h4
              className={clsx('w-h6 text-lavender mb-[4px]', 'lg:w-h6-desktop')}
            >
              {card?.title}
            </h4>
            <div
              className={clsx(
                'w-paragraph-s text-black/75 mb-[19px]',
                'lg:max-w-[293px] lg:w-paragraph-s-desktop',
              )}
            >
              <PortableText value={card?.description} />
            </div>
            <PageLink data={card?.pageLink}>
              <Button
                label={card?.pageLink?.title}
                className={clsx('!bg-lavender !text-white')}
              />
            </PageLink>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TextCardGrid
