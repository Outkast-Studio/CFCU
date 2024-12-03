import React, { useEffect, useState } from 'react'
import { PageLinkType } from 'types/sanity'
import Link from 'next/link'
import { clsx } from 'clsx'
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
  useEffect(() => {
    if (!data?.externalLink) {
      console.log(data?.link?._type)
      switch (data?.link?._type) {
        case 'post':
          setHref(`/posts/${data?.link?.slug}`)
          break
        case 'homepage':
          setHref('/')
          break
        case 'subPage':
          setHref(`/${data?.link?.slug}`)
          break
        case 'blogHomePage':
          setHref(`/blog`)
          break
        case 'locationHomePage':
          setHref(`/locations`)
          break
        default:
          setHref('/')
          console.log('no link')
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.link?._type])
  return !data?.externalLink ? (
    <Link href={href} className={clsx(className, 'w-fit')} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <a
      href={data?.externalLink}
      target="_blank"
      className={clsx(className, 'w-fit')}
    >
      {children}
    </a>
  )
}

export default PageLink
