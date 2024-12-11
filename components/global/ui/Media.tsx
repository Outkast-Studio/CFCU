//@ts-nocheck

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import type { Media } from 'types/sanity'
import { urlForImage } from 'lib/sanity.image'
import { urlForFile } from 'lib/sanity.file'
import { clsx } from 'clsx'
import { stegaClean } from '@sanity/client/stega'
import { SanityImage } from 'sanity-image'

interface MediaComponentProps {
  media: Media
  isPlaying?: boolean
  priority?: boolean
}

export default function MediaComponent({
  media,
  isPlaying,
  priority,
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

  if (stegaClean(media?.mediaType) === 'image' && media?.image) {
    return (
      <Image
        //@ts-ignore
        src={urlForImage(media?.image?.asset).url()}
        //@ts-ignore
        alt={media?.image?.alt}
        fill
        priority={priority}
        onLoadingComplete={(image) => image.classList.remove('opacity-0')}
        className={clsx(
          'object-cover w-full h-full',
          !priority &&
            'opacity-0 transition-all duration-300 ease-in-out-cubic',
        )}
      />
      // <SanityImage
      //   id={media?.image?.asset?._ref}
      //   alt={media?.image?.alt}
      //   baseUrl="https://cdn.sanity.io/images/uq2qrg8z/production/"
      //   hotspot={media?.image?.hotspot}
      //   className="object-cover w-full h-full"

      //   priority={priority}
      // />
    )
  } else if (stegaClean(media?.mediaType) === 'video' && media?.video) {
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
          <source
            src={urlForFile(media?.video?.asset?._ref)}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {media?.video?.caption && (
          <figcaption>{media?.video?.caption}</figcaption>
        )}
      </figure>
    )
  }
  return <div></div>
}
