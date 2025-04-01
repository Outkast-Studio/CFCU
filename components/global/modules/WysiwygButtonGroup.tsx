import React from 'react'
import PageLink from 'components/global/ui/PageLink'
import { clsx } from 'clsx'
import Button from 'components/global/ui/Button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
interface Props {
  value: {
    links: Array<ButtonProps>
  }
  isWithoutPadding?: boolean
}

interface ButtonProps {
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

const WysiwygButtonGroup = ({ value, isWithoutPadding }: Props) => {
  return (
    <div
      className={clsx(
        'max-w-[888px] mx-auto w-full w-paragraph-s-desktop  px-[24px] text-black/75 flex gap-x-[16px]  lg:px-[0px] lg:w-paragraph-l-desktop',
        isWithoutPadding && '!max-w-[unset] !mx-[unset] !px-[0px]',
      )}
    >
      {value?.links?.map((link, index) => (
        <ButtonLink
          key={index}
          title={link?.title}
          link={link.link}
          externalLink={link.externalLink}
          externalLinkOneOff={link.externalLinkOneOff}
        />
      ))}
    </div>
  )
}

const ButtonLink = ({
  title,
  externalLink,
  link,
  externalLinkOneOff,
}: ButtonProps) => {
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
    <Link href={href} className={clsx('')}>
      <Button label={title} className="!bg-lavender text-white" />
    </Link>
  ) : (
    <a href={href} target={target}>
      <Button label={title} className="!bg-lavender text-white" />
    </a>
  )
}

export default WysiwygButtonGroup
