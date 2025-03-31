import { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

interface Props {
  title: string
  externalLink?: {
    link: string
    openInNewTab: boolean
  }
  link?: {
    _type: string
    link: string
  }
  externalLinkOneOff?: {
    link: string
    openInNewTab: boolean
  }
}

const WysiwygPageLink = ({
  title,
  externalLink,
  link,
  externalLinkOneOff,
}: Props) => {
  console.log(link)
  const [href, setHref] = useState('')
  const [target, setTarget] = useState('_self')
  useEffect(() => {
    if (link?._type) {
      switch (link?._type) {
        case 'post':
          setHref(`/${link?.link}`)
          break
        case 'homepage':
          setHref('/')
          break
        case 'subPage':
          setHref(`/${link?.link}`)
          break
        case 'blogHomePage':
          setHref(`/posts/page/1`)
          break
        case 'locationHomePage':
          setHref(`/locations`)
          break
        case 'topic':
          setHref(`/${link?.link}/1`)
          break
        case 'location':
          setHref(`/${link?.link}`)
          break
        default:
          setHref('/')
          break
      }
    }
    if (externalLinkOneOff) {
      setHref(externalLinkOneOff?.link)
      if (externalLinkOneOff?.openInNewTab) {
        setTarget('_blank')
      }
    }
    if (externalLink?.link) {
      setHref(externalLink.link)
      if (externalLink?.openInNewTab) {
        setTarget('_blank')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return link?._type ? (
    <Link href={href} className={clsx('underline font-codec-heavy')}>
      {title}
    </Link>
  ) : (
    <a
      href={href}
      target={target}
      className={clsx('underline font-codec-heavy')}
    >
      {title}
    </a>
  )
}

export default WysiwygPageLink
