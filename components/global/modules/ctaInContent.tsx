import React from 'react'
import { CtaInContentType } from 'types/sanity'
import { clsx } from 'clsx'
import { getThemeClasses } from 'lib/themeConfig'

const CtaInContent = ({ data }: { data: CtaInContentType }) => {
  console.log(data)
  const theme = getThemeClasses(data.theme.label)
  return (
    <section
      className={clsx('mt-[65px] title-s')}
      style={{ backgroundColor: theme.background, color: theme.heading }}
    >
      {data.ctaCard.subtitle?.type === 'text' && (
        <h2 className={clsx('')}>{data.ctaCard.subtitle.text}</h2>
      )}
      {data.ctaCard.subtitle?.type === 'svg' && (
        <div
          className={clsx('w-[140px]')}
          dangerouslySetInnerHTML={{ __html: data.ctaCard.subtitle.svg }}
        />
      )}
    </section>
  )
}

export default CtaInContent
