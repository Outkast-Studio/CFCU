import Image from 'next/image'
import { useState } from 'react'
import type { Media } from 'types/sanity'
import { urlForImage } from 'lib/sanity.image'
import { urlForFile } from 'lib/sanity.file'
import { clsx } from 'clsx'

export default function MediaComponent({ media }: { media: Media }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

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
      <figure>
        <video
          src={urlForFile(media.video.asset.url)}
          controls
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          Your browser does not support the video tag.
        </video>
        {!isVideoLoaded && <div>Loading video...</div>}
        {media.video.caption && <figcaption>{media.video.caption}</figcaption>}
      </figure>
    )
  }

  return <div>Unsupported media type</div>
}
