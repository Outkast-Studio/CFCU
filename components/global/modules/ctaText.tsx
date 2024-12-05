import { CtaTextType, ThemeLabel } from 'types/sanity'
import { clsx } from 'clsx'
import { getThemeClasses } from 'lib/themeConfig'

import { PortableText } from '@portabletext/react'
import { WysiwygComponentsWithoutPadding } from 'lib/portabletTextComponents'
import Button from '../ui/Button'
import PageLink from '../ui/PageLink'

const CtaText = ({ data }: { data: CtaTextType }) => {
  const theme = getThemeClasses(data?.theme?.label as ThemeLabel)
  return (
    <div className={clsx('lg:px-[48px] lg:py-[63px]')}>
      <section
        style={{ backgroundColor: theme?.background }}
        className={clsx(
          'px-[45px] py-[57px] flex flex-col items-center',
          'lg:pt-[122px] lg:pb-[122px]',
        )}
      >
        {data?.subtitle && (
          <h2
            style={{ color: theme?.subtitle }}
            className={clsx(
              'text-[14px] leading-[16px] tracking-[1.6px] uppercase mb-[6px]',
              'lg:subtitle-l  lg:mb-[16px]',
            )}
          >
            {data.subtitle}
          </h2>
        )}
        <h3
          className={clsx('title-l text-center', 'lg:title-l-desktop')}
          style={{ color: theme?.heading }}
        >
          {data?.title}
        </h3>
        {data.description && (
          <div
            style={{ color: theme?.monotoneCopy }}
            className={clsx(
              ' w-paragraph text-center mt-[20px]',
              'lg:max-w-[1000px] lg:w-paragraph-xl-desktop lg:mt-[24px]',
            )}
          >
            <PortableText value={data?.description} />
          </div>
        )}
        <PageLink
          data={data?.cta}
          className={clsx('mt-[20px] block', 'lg:mt-[24px]')}
        >
          <Button label={data?.cta?.title} />
        </PageLink>
      </section>
    </div>
  )
}

export default CtaText
