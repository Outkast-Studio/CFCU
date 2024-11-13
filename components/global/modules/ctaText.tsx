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
    <section
      style={{ backgroundColor: theme.background }}
      className={clsx('px-[45px] py-[57px] flex flex-col items-center')}
    >
      <h2
        className={clsx('title-l text-center')}
        style={{ color: theme.heading }}
      >
        {data.title}
      </h2>
      {data.description && (
        <div className={clsx('text-white w-paragraph text-center mt-[20px]')}>
          <PortableText
            value={data.description}
            components={PortableTextComponents}
          />
        </div>
      )}
      <Link href={data.cta.path} className={clsx('mt-[20px] block')}>
        <Button label={data.cta.title} />
      </Link>
    </section>
  )
}

export default CtaText
