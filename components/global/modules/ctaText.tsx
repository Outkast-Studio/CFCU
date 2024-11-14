import { CtaTextType, ThemeLabel } from 'types/sanity'
import { clsx } from 'clsx'
import { getThemeClasses } from 'lib/themeConfig'

import { PortableText } from '@portabletext/react'
import PortableTextComponents from 'lib/portabletTextComponents'
import Button from '../ui/Button'
import Link from 'next/link'

const CtaText = ({ data }: { data: CtaTextType }) => {
  console.log(data)
  const theme = getThemeClasses(data.theme.label as ThemeLabel)

  console.log(theme)
  return (
    <div className={clsx('lg:px-[48px] lg:py-[63px]')}>
      <section
        style={{ backgroundColor: theme.background }}
        className={clsx(
          'px-[45px] py-[57px] flex flex-col items-center',
          'lg:pt-[122px] lg:pb-[122px]',
        )}
      >
        <h2
          className={clsx('title-l text-center', 'lg:title-l-desktop')}
          style={{ color: theme.heading }}
        >
          {data.title}
        </h2>
        {data.description && (
          <div
            className={clsx(
              'text-white w-paragraph text-center mt-[20px]',
              'lg:max-w-[1000px] lg:w-paragraph-xl-desktop lg:mt-[24px]',
            )}
          >
            <PortableText
              value={data.description}
              components={PortableTextComponents}
            />
          </div>
        )}
        <Link
          href={data.cta.path}
          className={clsx('mt-[20px] block', 'lg:mt-[24px]')}
        >
          <Button label={data.cta.title} />
        </Link>
      </section>
    </div>
  )
}

export default CtaText
