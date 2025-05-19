import React, { useEffect, useState } from 'react'
import { PageLinkType } from 'types/sanity'
import Link from 'next/link'
import { clsx } from 'clsx'
import { set } from 'sanity'
const PageLink = ({
  data,
  className,
  children,
  onClick,
}: {
  className?: string
  data: PageLinkType
  children: React.ReactNode
  onClick?: () => void
}) => {
  const [href, setHref] = useState<string>('')
  const [target, setTarget] = useState('_self')

  useEffect(() => {
    if (!data?.externalLink && !data?.externalLinkOneOff) {
      switch (data?.link?._type) {
        case 'post':
          setHref(`/${data?.link?.slug}`)
          break
        case 'homepage':
          setHref('/')
          break
        case 'subPage':
          setHref(`/${data?.link?.slug}`)
          break
        case 'blogHomePage':
          setHref(`/posts/page/1`)
          break
        case 'locationHomePage':
          setHref(`/locations`)
          break
        case 'topic':
          setHref(`/${data?.link?.slug}/1`)
          break
        case 'location':
          setHref(`/${data?.link?.slug}`)
          break
        default:
          setHref('/')
          break
      }
    } else {
      if (data?.externalLinkOneOff?.link) {
        setHref(data?.externalLinkOneOff?.link)
        if (data?.externalLinkOneOff?.openInNewTab) {
          setTarget('_blank')
        }
      } else {
        setHref(data?.externalLink?.externalLink)
        if (data?.externalLink?.openInNewTab) {
          setTarget('_blank')
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.link?._type])
  return !data?.externalLink && !data?.externalLinkOneOff?.link ? (
    <Link href={href} className={clsx(className, 'w-fit')} onClick={onClick}>
      {children}
    </Link>
  ) : data?.externalLinkOneOff?.link ? (
    <a
      href={data?.externalLinkOneOff?.link}
      target={target}
      className={clsx(className, 'w-fit')}
    >
      {children}
    </a>
  ) : (
    <a
      href={data?.externalLink?.externalLink}
      target={target}
      className={clsx(className, 'w-fit')}
    >
      {children}
    </a>
  )
}

export default PageLink
