import Image from 'next/image'
import { useState } from 'react'
import type { Media } from 'types/sanity'
import { urlForImage } from 'lib/sanity.image'
import { urlForFile } from 'lib/sanity.file'
import { clsx } from 'clsx'

export default function MediaComponent({ media }: { media: Media }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  console.log(media)
  if (media.mediaType === 'image') {
    return (
      <Image
        src={urlForImage(media.image).url()}
        alt={media.image.alt}
        fill
        className={clsx('object-cover w-full h-full')}
      />
    )
  } else if (media.mediaType === 'video') {
    return (
      <figure className={clsx('w-full h-full')}>
        <video
          muted
          playsInline
          autoPlay
          loop
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
