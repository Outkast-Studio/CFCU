import Image from 'next/image'
import { clsx } from 'clsx'
import Menu from './Menu'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [isMenuOpen])

  return (
    <>
      {/* Todo move this to a hero component: */}
      {/* <Image
        src={'/icons/LogoFull.png'}
        alt={'Community Financial Logo'}
        width={500}
        height={108}
        className={clsx(
          'w-[212px] leading-[47px] absolute top-[60px] left-[25px] z-[8]',
          'lg:w-[244.71px] lg:leading-[54px] lg:left-[48px] lg:top-[48px]',
        )}
      /> */}
      <header
        className={clsx(
          'fixed top-[48px] right-[48px] z-[11]',
          'lg:right-[48px] ',
        )}
      >
        <div
          className={clsx(
            'w-fit',
            'lg:flex lg:gap-x-[12px] lg:p-[8px] lg:bg-purple lg:rounded-full lg:top-[30px] lg:right-[48px] font-codec-bold',
          )}
        >
          <div>
            <a
              href={'#'}
              className={clsx(
                'hidden px-[12px] py-[9.5px] text-white',
                'lg:inline-block',
              )}
            >
              Become a Member
            </a>
            <a
              href={'#'}
              className={clsx(
                'hidden px-[12px] py-[9.5px] text-white',
                'lg:inline-block',
              )}
            >
              Log In
            </a>
          </div>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={clsx(
              'w-[48px] h-[48px] flex items-center justify-center rounded-full overflow-hidden font-codec-bold transition-colors duration-300 ease-linear',
              'lg:w-fit lg:flex lg:px-[14px] lg:h-[unset] gap-x-[9px] lg:py-[9.5px]',
              isMenuOpen ? 'bg-white' : 'bg-orange',
            )}
          >
            <div className={clsx('hidden', 'lg:block h-[23px]')}>
              <span
                className={clsx(
                  'flex flex-col transition-transform duration-[0.4s] ease-in-out text-lavender',
                  isMenuOpen ? 'translate-y-[-24px]' : 'translate-y-[0px]',
                )}
              >
                <span
                  className={clsx(
                    isMenuOpen ? 'opacity-0' : 'opacity-100',
                    'transition-opacity linear duration-200',
                  )}
                >
                  Menu
                </span>
                <span
                  className={clsx(
                    !isMenuOpen ? 'opacity-0' : 'opacity-100',
                    'transition-opacity linear duration-200',
                  )}
                >
                  Close
                </span>
              </span>
            </div>
            <div
              className={clsx('w-[18px] flex flex-col gap-y-[5px] relative')}
            >
              <span
                className={clsx(
                  'w-full h-[1.5px] rounded-full bg-purple absolute transition-all duration-300 ease-in-out',
                  isMenuOpen
                    ? 'rotate-45 translate-y-[0px]'
                    : 'rotate-0 translate-y-[5px]',
                )}
              ></span>
              <span
                className={clsx(
                  'w-full h-[1.5px] rounded-full bg-purple absolute transition-all duration-300 linear',
                  isMenuOpen ? 'opacity-0' : 'opacity-100',
                )}
              ></span>
              <span
                className={clsx(
                  'w-full h-[1.5px] rounded-full bg-purple absolute transition-all duration-300 ease-in-out',
                  isMenuOpen
                    ? '-rotate-45 translate-y-[0px]'
                    : 'rotate-0 translate-y-[-5px]',
                )}
              ></span>
            </div>
          </button>
        </div>
      </header>
      <Menu key={'Menu'} menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
    </>
  )
}

export default Header
