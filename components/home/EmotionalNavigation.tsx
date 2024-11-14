import { HomepageType } from 'types/sanity'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { clsx } from 'clsx'
import * as Accordion from '@radix-ui/react-accordion'
import { getThemeClasses } from 'lib/themeConfig'
import Link from 'next/link'
const EmotionalNavigation = ({
  data,
}: {
  data: HomepageType['emotionalNavigation']
}) => {
  console.log(data)
  return (
    <section
      className={clsx(
        'pt-[90px] pb-[10px]',
        'lg:pt-[149px] lg:flex lg:pb-[150px]',
      )}
    >
      <div
        className={clsx('px-[24px]', 'lg:px-[48px] lg:pt-[36px] lg:shrink-0')}
      >
        <div
          dangerouslySetInnerHTML={{ __html: data.icon }}
          className={clsx('emotionalNavigationIcon')}
        />
        <h2
          className={clsx(
            'text-[14px] leading-[14px] tracking-[1.6px] font-codec-news uppercase text-orange mt-[19px]',
            'lg:subtitle-l lg:mt-[32px]',
          )}
        >
          {data.subtitle}
        </h2>
        <h3
          className={clsx(
            'font-codec-bold text-white text-[26px] leading-[28.6px] mt-[10px] max-w-[451px]',
            'lg:mt-[16px] lg:w-h4-desktop ',
          )}
        >
          {data.title}
        </h3>
      </div>
      <div className={clsx('px-[9px]', 'lg:hidden')}>
        <Accordion.Root
          type="single"
          collapsible
          className={clsx('w-full mt-[40px] flex flex-col gap-y-[16px]')}
        >
          {data.navigationCards.map((card, index) => (
            <CardMobile data={card} key={index} />
          ))}
        </Accordion.Root>
      </div>
      <div
        className={clsx(
          'hidden',
          'lg:flex lg:gap-x-[24px] lg:overflow-x-hidden',
        )}
      >
        {data.navigationCards.map((card, index) => (
          <CardDesktop data={card} key={index} />
        ))}
      </div>
    </section>
  )
}

export default EmotionalNavigation

const CardMobile = ({
  data,
}: {
  data: HomepageType['emotionalNavigation']['navigationCards'][0]
}) => {
  const colors = getThemeClasses(data.theme.label)

  return (
    <Accordion.Item
      value={data.title}
      style={{ backgroundColor: colors.background, color: colors.heading }}
      className={clsx('pt-[35px] pl-[26px] pr-[37px] group')}
    >
      <Accordion.Header className={clsx('pb-[35px]')}>
        <div>
          <h4
            className={clsx(
              'text-left text-[14px] leading-[14px] tracking-[1.6px] uppercase font-codec-news',
            )}
          >
            {data.subtitle}
          </h4>
          <h3
            className={clsx(
              'font-codec-extra-bold text-[32px] leading-[33.28px] tracking-[-0.16px] text-left mt-[4px]',
            )}
          >
            {data.title}
          </h3>
        </div>
        <Accordion.Trigger
          className={clsx(
            'w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center relative mt-[26px]',
          )}
        >
          <span
            className={clsx(
              'w-[14px] h-[4px] rotate-[90deg]  absolute bg-lavendar block transition-transform duration-300 ease-in-out',
              'group-data-[state=open]:rotate-[0deg]',
            )}
          ></span>
          <span className={clsx('w-[14px] h-[4px] bg-lavendar block')}></span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className={clsx('AccordionContent overflow-hidden')}>
        <p>{data.description}</p>
        <nav className={clsx('flex flex-col gap-y-[12px] mt-[18px] pb-[41px]')}>
          {data.links.map((link, index) => (
            <Link
              href={link.url}
              key={index}
              className={clsx('flex flex-row gap-x-[6px] items-center')}
            >
              <span className={clsx('font-codec-extra-bold')}>
                {link.title}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8538 8.35378L9.35375 12.8538C9.25993 12.9476 9.13268 13.0003 9 13.0003C8.86732 13.0003 8.74007 12.9476 8.64625 12.8538C8.55243 12.76 8.49972 12.6327 8.49972 12.5C8.49972 12.3674 8.55243 12.2401 8.64625 12.1463L12.2931 8.50003H2.5C2.36739 8.50003 2.24021 8.44736 2.14645 8.35359C2.05268 8.25982 2 8.13264 2 8.00003C2 7.86743 2.05268 7.74025 2.14645 7.64648C2.24021 7.55271 2.36739 7.50003 2.5 7.50003H12.2931L8.64625 3.85378C8.55243 3.75996 8.49972 3.63272 8.49972 3.50003C8.49972 3.36735 8.55243 3.2401 8.64625 3.14628C8.74007 3.05246 8.86732 2.99976 9 2.99976C9.13268 2.99976 9.25993 3.05246 9.35375 3.14628L13.8538 7.64628C13.9002 7.69272 13.9371 7.74786 13.9623 7.80856C13.9874 7.86926 14.0004 7.93433 14.0004 8.00003C14.0004 8.06574 13.9874 8.13081 13.9623 8.1915C13.9371 8.2522 13.9002 8.30735 13.8538 8.35378Z"
                  fill="#FFC600"
                />
              </svg>
            </Link>
          ))}
        </nav>
      </Accordion.Content>
    </Accordion.Item>
  )
}

const CardDesktop = ({
  data,
}: {
  data: HomepageType['emotionalNavigation']['navigationCards'][0]
}) => {
  const colors = getThemeClasses(data.theme.label)

  return (
    <article
      style={{ backgroundColor: colors.background, color: colors.heading }}
      className={clsx('px-[53px] pt-[77px] w-[547px] h-[620px] flex-shrink-0')}
    >
      <h4
        className={clsx(
          'text-left text-[16px] leading-[16px] tracking-[1.6px] uppercase font-codec-news',
        )}
      >
        {data.subtitle}
      </h4>
      <h3 className={clsx('title-s-desktop text-left mt-[8px]')}>
        {data.title}
      </h3>
      <p className={clsx('w-paragraph-l-desktop mt-[17px]')}>
        {data.description}
      </p>
      <nav className={clsx('flex flex-col gap-y-[12px] mt-[20px] pb-[41px]')}>
        {data.links.map((link, index) => (
          <Link
            href={link.url}
            key={index}
            className={clsx('flex flex-row gap-x-[6px] items-center')}
          >
            <span
              className={clsx(
                'font-codec-extra-bold text-[18px] leading-[27px]',
              )}
            >
              {link.title}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8538 8.35378L9.35375 12.8538C9.25993 12.9476 9.13268 13.0003 9 13.0003C8.86732 13.0003 8.74007 12.9476 8.64625 12.8538C8.55243 12.76 8.49972 12.6327 8.49972 12.5C8.49972 12.3674 8.55243 12.2401 8.64625 12.1463L12.2931 8.50003H2.5C2.36739 8.50003 2.24021 8.44736 2.14645 8.35359C2.05268 8.25982 2 8.13264 2 8.00003C2 7.86743 2.05268 7.74025 2.14645 7.64648C2.24021 7.55271 2.36739 7.50003 2.5 7.50003H12.2931L8.64625 3.85378C8.55243 3.75996 8.49972 3.63272 8.49972 3.50003C8.49972 3.36735 8.55243 3.2401 8.64625 3.14628C8.74007 3.05246 8.86732 2.99976 9 2.99976C9.13268 2.99976 9.25993 3.05246 9.35375 3.14628L13.8538 7.64628C13.9002 7.69272 13.9371 7.74786 13.9623 7.80856C13.9874 7.86926 14.0004 7.93433 14.0004 8.00003C14.0004 8.06574 13.9874 8.13081 13.9623 8.1915C13.9371 8.2522 13.9002 8.30735 13.8538 8.35378Z"
                fill="#FFC600"
              />
            </svg>
          </Link>
        ))}
      </nav>
    </article>
  )
}
