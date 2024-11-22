//@ts-nocheck

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import type { Media } from 'types/sanity'
import { urlForImage } from 'lib/sanity.image'
import { urlForFile } from 'lib/sanity.file'
import { clsx } from 'clsx'
import { stegaClean } from '@sanity/client/stega'

interface MediaComponentProps {
  media: Media
  isPlaying?: boolean
}

export default function MediaComponent({
  media,
  isPlaying,
}: MediaComponentProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoPlayerRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (!videoPlayerRef.current) return
    if (isPlaying) {
      videoPlayerRef.current?.play()
    } else {
      videoPlayerRef.current?.pause()
    }
  }, [isPlaying])

  if (stegaClean(media.mediaType) === 'image') {
    return (
      <Image
        //@ts-ignore
        src={urlForImage(media.image).url()}
        //@ts-ignore
        alt={media.image.alt}
        fill
        className={clsx('object-cover w-full h-full')}
      />
    )
  } else if (stegaClean(media.mediaType) === 'video') {
    return (
      <figure className={clsx('w-full h-full')}>
        <video
          muted
          playsInline
          autoPlay
          loop
          ref={videoPlayerRef}
          className={clsx('w-full h-full object-cover')}
        >
          <source src={urlForFile(media.video.asset._ref)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {media.video.caption && <figcaption>{media.video.caption}</figcaption>}
      </figure>
    )
  }

  return <div>Unsupported media type</div>
}
