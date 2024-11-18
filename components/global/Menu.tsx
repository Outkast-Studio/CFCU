import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import SearchBar from './SearchBar'
import { clsx } from 'clsx'
import * as Accordion from '@radix-ui/react-accordion'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import Link from 'next/link'
import MenuCTA from './ui/MenuCTA'
import { useWindowSize } from 'hooks/useWindowSize'

const Menu = () => {
  const globalSettings = useGlobalSettingsStore((state) => state.globalSettings)
  const topLevelNavigation = globalSettings?.navigation?.topLevelNavigation
  const bottomLevelNavigation =
    globalSettings?.navigation?.bottomLevelNavigation

  const { width } = useWindowSize()
  return (
    <div className={clsx('fixed top-0 left-0 w-full z-[9] bg-white h-full')}>
      <div
        className={clsx(
          'min-h-screen  pt-[73px] overflow-y-auto h-full pb-[20px]',
          'lg:pt-[26px] lg:max-w-[1800px] lg:mx-auto',
        )}
      >
        <div
          className={clsx(
            'text-[16px]  font-codec-bold gap-x-[24px] flex justify-end pr-[99px] mb-[32px]',
            'lg:hidden',
          )}
        >
          <a href={'#'}>Become a Member</a>
          <a href={'#'}>Log In</a>
        </div>
        <div className={clsx('px-[24px]', 'lg:px-[48px]')}>
          <SearchBar />

          {width > 1024 ? (
            <div className={clsx('grid grid-cols-12 gap-x-[24px] mt-[60px]')}>
              {topLevelNavigation?.map((item, index) => (
                <article key={index} className={clsx('col-span-3')}>
                  <div className={clsx('w-[35px]')}>
                    <Image
                      src={urlForImage(item.icon).url()}
                      alt={item.title + ' icon'}
                      width={48}
                      height={48}
                      className={clsx('h-[26px] w-auto')}
                    />
                  </div>
                  <h3
                    className={clsx(
                      'text-[28px] leading-[26.88px] font-codec-extra-bold text-lavender mt-[13.63px]',
                    )}
                  >
                    {item.title}
                  </h3>
                  <nav
                    className={clsx(
                      'flex flex-col text-[18px] leading-[27px] gap-y-[12px] font-codec-news text-lavender mt-[16px]',
                    )}
                  >
                    {item.links?.map((link, index) => (
                      <Link href={link.url} key={index}>
                        {link.title}
                      </Link>
                    ))}
                  </nav>
                </article>
              ))}
            </div>
          ) : (
            <Accordion.Root
              type="single"
              collapsible
              className={clsx('w-full mt-[18px]')}
            >
              {topLevelNavigation?.map((item, index) => (
                <Accordion.Item value={item.title}>
                  <Accordion.Header className={clsx('text-black')}>
                    <Accordion.Trigger
                      className={clsx(
                        'flex justify-between w-full items-center py-[24px] border-t-[1px] group border-divider data-[state=open]:!border-lavender transition-colors duration-200',
                      )}
                    >
                      <div
                        className={clsx('flex gap-x-[18.8px] items-center ')}
                      >
                        <div className={clsx('w-[35px]')}>
                          <Image
                            src={urlForImage(item.icon).url()}
                            alt={item.title + ' icon'}
                            width={48}
                            height={48}
                            className={clsx('h-[26px] w-auto')}
                          />
                        </div>
                        <h3
                          className={clsx(
                            'text-[28px] leading-[26.88px] font-codec-extra-bold text-lavender',
                          )}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={clsx(
                          'group-data-[state=open]:rotate-[45deg] transition-transform duration-300 ease-in-out',
                        )}
                      >
                        <path
                          d="M8.05273 12.9199H4.55273V8.16211H0V4.78516L4.55273 4.77148L4.53906 0H8.03906L8.05273 4.77148H12.6738V8.16211H8.05273V12.9199Z"
                          fill="#3C1053"
                        />
                      </svg>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content
                    className={clsx('AccordionContent overflow-hidden')}
                  >
                    <nav
                      className={clsx(
                        'pl-[53px] flex flex-col text-[16px] leading-[24px] gap-y-[12px] font-codec-news text-lavender mb-[27px]',
                      )}
                    >
                      {item.links?.map((link, index) => (
                        <Link href={link.url} key={index}>
                          {link.title}
                        </Link>
                      ))}
                    </nav>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          )}
        </div>
        <div
          className={clsx(
            'lg:grid lg:grid-cols-2 lg:gap-x-[24px] lg:px-[48px] lg:mt-[68px]',
          )}
        >
          <div
            className={clsx(
              'grid grid-cols-2 gap-x-[24px] mx-[24px] pt-[18.5px] border-t-[1px] border-t-dividers',
              'lg:border-t-[0px] lg:mx-[0px] lg:pt-[0px]',
            )}
          >
            {bottomLevelNavigation?.map((nav, index) => (
              <nav
                className={clsx(
                  'lg:border-[1px] lg:border-dividers lg:p-[40px]',
                )}
              >
                <div
                  className={clsx(
                    'flex gap-x-[8px] items-center',
                    'lg:gap-x-[10px]',
                  )}
                >
                  <Image
                    width={24}
                    height={24}
                    src={urlForImage(nav.icon).url()}
                    alt={nav.icon.alt as string}
                    className={clsx(
                      'flex-shrink-0 w-[18px] h-[18px]',
                      'lg:h-[24px] lg:w-[24px]',
                    )}
                  />
                  <h4
                    className={clsx(
                      'uppercase text-[12px] tracking-[1.6px] font-codec-news text-black',
                      'lg:text-[16px] lg:leading-[16px]',
                    )}
                  >
                    {nav.title}
                  </h4>
                </div>
                <div
                  className={clsx(
                    'flex flex-col gap-y-[12px] mt-[16px] text-[14px] leading-[21px] font-codec-news text-lavender',
                    'lg:text-[16px] lg:leading-[24px]',
                  )}
                >
                  {nav.links?.map((link, index) => (
                    <Link href={link.url} key={index}>
                      {link.title}
                    </Link>
                  ))}
                </div>
              </nav>
            ))}
          </div>
          {globalSettings?.navigation?.navigationCta && (
            <MenuCTA data={globalSettings?.navigation?.navigationCta} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Menu
