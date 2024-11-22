import React, { useEffect, useState } from 'react'
import { PageLinkType } from 'types/sanity'
import Link from 'next/link'
import { clsx } from 'clsx'
const PageLink = ({
  data,
  className,
  children,
}: {
  className?: string
  data: PageLinkType
  children: React.ReactNode
}) => {
  const [href, setHref] = useState<string>('')
  useEffect(() => {
    if (!data.externalLink) {
      switch (data.link?._type) {
        case 'post':
          setHref(`/posts/${data.link.slug}`)
          break
        case 'homepage':
          setHref('/')
        default:
          setHref('')
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return !data.externalLink ? (
    <Link href={href} className={clsx(className, 'w-fit')}>
      {children}
    </Link>
  ) : (
    <a
      href={data.externalLink}
      target="_blank"
      className={clsx(className, 'w-fit')}
    >
      {children}
    </a>
  )
}

export default PageLink
