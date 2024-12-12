import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { ImageAsset } from 'sanity'

interface DynamicImageProps {
  image: ImageAsset
  className?: string
}

export default function DynamicImage({
  image,
  className = '',
}: DynamicImageProps) {
  const imageUrl = urlForImage(image).width(1000).quality(90).url()

  const dimensions = urlForImage(image).width(1000).quality(90).image()

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: dimensions.aspectRatio }}
    >
      <Image
        src={imageUrl}
        alt={image.alt as string}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain"
      />
    </div>
  )
}
