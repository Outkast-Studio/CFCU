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
  console.log(data)
  const [href, setHref] = useState<string>('')
  useEffect(() => {
    if (!data.externalLink) {
      switch (data.link?._type) {
        case 'post':
          setHref(`/posts/${data.link.slug}`)
          break
        default:
          setHref(data.externalLink || '')
          break
      }
    }
  }, [])
  return !data.externalLink ? (
    <Link href={href} className={clsx(className)}>
      {children}
    </Link>
  ) : (
    <a href={data.externalLink} target="_blank" className={clsx(className)}>
      {children}
    </a>
  )
}

export default PageLink
