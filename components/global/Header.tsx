import Image from 'next/image'
import { clsx } from 'clsx'
import Menu from './Menu'
import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
      <header
        className={clsx('absolute top-[60px] left-[25px]', 'lg:left-[50px]')}
      >
        <Image
          src={'/icons/LogoFull.png'}
          alt={'Community Financial Logo'}
          width={500}
          height={108}
          className={clsx(
            'w-[212px] leading-[47px]',
            'lg:w-[244.71px] lg:leading-[54px]',
          )}
        />
        <div
          className={clsx(
            'fixed top-[60px] right-[25px] z-[10]',
            'lg:flex lg:gap-x-[12px] lg:p-[8px] lg:bg-purple lg:rounded-full',
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
              'bg-orange w-[48px] h-[48px] flex items-center justify-center rounded-full',
              'lg:w-fit lg:flex lg:px-[14px] lg:h-[unset] gap-x-[9px] lg:py-[9.5px]',
            )}
          >
            <span className={clsx('hidden', 'lg:inline-block')}>Menu</span>
            <div className={clsx('w-[18px] flex flex-col gap-y-[5px]')}>
              <span
                className={clsx('w-full h-[1px] rounded-full bg-purple')}
              ></span>
              <span
                className={clsx('w-full h-[1px] rounded-full  bg-purple')}
              ></span>
              <span
                className={clsx('w-full h-[1px] rounded-full  bg-purple')}
              ></span>
            </div>
          </button>
        </div>
      </header>
      {isMenuOpen && <Menu />}
    </>
  )
}

export default Header
