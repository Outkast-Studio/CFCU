import { TabsType } from 'types/sanity'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import * as Accordion from '@radix-ui/react-accordion'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { useState } from 'react'
import PortableTextComponents from 'lib/portabletTextComponents'
const Tabs = ({ data }: { data: TabsType }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section
      className={clsx(
        'px-[24px] py-[66px]',
        'lg:px-[48px] lg:pb-[116px] lg:pt-[95px] lg:max-w-[1800px] lg:mx-auto',
      )}
    >
      {data?.subtitle && (
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
        {data?.title}
      </h3>
      {data?.description && (
        <div
          className={clsx(
            'w-paragraph-s-desktop mt-[15px] text-black/75',
            'lg:w-paragraph-l-desktop lg:mt-[22px]',
          )}
        >
          <PortableText
            value={data?.description}
            components={PortableTextComponents as any}
          />
        </div>
      )}
      <div className={clsx('mt-[26px]', 'lg:hidden')}>
        <Accordion.Root
          defaultValue={data?.tabs?.[0].title + 0}
          type="single"
          collapsible
          className={clsx('w-full')}
        >
          {data?.tabs?.map((item, index) => (
            <Accordion.Item
              value={item?.title + index}
              key={index}
              className={clsx('group')}
            >
              <Accordion.Header className={clsx('text-black')}>
                <Accordion.Trigger
                  className={clsx(
                    'flex gap-x-[10px] py-[16px] border-t-[1px] border-t-lightGrey transition-colors duration-200 w-full',
                    'group-data-[state=open]:border-t-lavender',
                  )}
                >
                  {item?.icon && (
                    <Image
                      src={urlForImage(item?.icon).url()}
                      alt={item?.icon?.alt as string}
                      width={34}
                      height={34}
                      className={clsx('object-contain ')}
                    />
                  )}
                  <h4
                    className={clsx(
                      'w-h6 text-lavender text-left transition-colors duration-200',
                      'group-data-[state=closed]:text-[#777777]',
                    )}
                  >
                    {item?.title}
                  </h4>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content
                className={clsx('AccordionContent overflow-hidden')}
              >
                <div className={clsx('pb-[28px]')}>
                  <PortableText
                    value={item?.content}
                    components={PortableTextComponents as any}
                  />
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
      <div
        className={clsx(
          'hidden',
          'lg:grid lg:grid-cols-12 lg:gap-x-[24px] lg:mt-[38px]',
        )}
      >
        <div className={clsx('col-span-5 flex-col')}>
          {data?.tabs?.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={clsx(
                'py-[32px] flex justify-between w-full border-t-[1px] transition-colors duration-200',
                activeTab === index
                  ? 'border-t-lavender'
                  : 'border-t-lightGrey',
              )}
            >
              <div className={clsx(' flex gap-x-[18px] w-full ')}>
                {item?.icon && (
                  <Image
                    src={urlForImage(item?.icon).url()}
                    alt={item?.icon?.alt as string}
                    width={34}
                    height={34}
                    className={clsx('object-contain')}
                  />
                )}
                <h4
                  className={clsx(
                    'w-h6-desktop transition-colors duration-200 text-left',
                    activeTab === index ? 'text-lavender' : 'text-[#777777]',
                  )}
                >
                  {item?.title}
                </h4>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={clsx(
                  activeTab === index
                    ? 'translate-x-[0px] opacity-100 transition-all ease-out duration-200'
                    : 'translate-x-[-10px] opacity-0 transition-all ease-in duration-200',
                )}
              >
                <path
                  d="M20.7806 12.531L14.0306 19.281C13.8899 19.4218 13.699 19.5008 13.5 19.5008C13.301 19.5008 13.1101 19.4218 12.9694 19.281C12.8286 19.1403 12.7496 18.9494 12.7496 18.7504C12.7496 18.5514 12.8286 18.3605 12.9694 18.2198L18.4397 12.7504H3.75C3.55109 12.7504 3.36032 12.6714 3.21967 12.5307C3.07902 12.3901 3 12.1993 3 12.0004C3 11.8015 3.07902 11.6107 3.21967 11.4701C3.36032 11.3294 3.55109 11.2504 3.75 11.2504H18.4397L12.9694 5.78104C12.8286 5.64031 12.7496 5.44944 12.7496 5.25042C12.7496 5.05139 12.8286 4.86052 12.9694 4.71979C13.1101 4.57906 13.301 4.5 13.5 4.5C13.699 4.5 13.8899 4.57906 14.0306 4.71979L20.7806 11.4698C20.8504 11.5394 20.9057 11.6222 20.9434 11.7132C20.9812 11.8043 21.0006 11.9019 21.0006 12.0004C21.0006 12.099 20.9812 12.1966 20.9434 12.2876C20.9057 12.3787 20.8504 12.4614 20.7806 12.531Z"
                  fill="#3C1053"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* TODO sort the portable text */}
        <div className={clsx('col-start-7 col-end-13')}>
          <PortableText
            value={data?.tabs?.[activeTab]?.content}
            components={PortableTextComponents as any}
          />
        </div>
      </div>
    </section>
  )
}

export default Tabs
