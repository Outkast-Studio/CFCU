import type { PortableTextBlock } from '@portabletext/types'
import { ImageAsset, FileAsset } from 'sanity'

type MediaBase = {
  _type: 'media'
  _key: string
  mediaType: 'image' | 'video'
}

type ImageMedia = MediaBase & {
  mediaType: 'image'
  image: {
    asset: ImageAsset
    alt: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
}

type VideoMedia = MediaBase & {
  mediaType: 'video'
  video: {
    asset: FileAsset
    caption?: string
  }
}

export type Media = ImageMedia | VideoMedia

//Object Types ------------

export interface CtaInContentType {
  theme: {
    value: string
    label: ThemeLabel
  }
  ctaCard: {
    subtitle?: {
      type?: 'text' | 'svg'
      text?: string
      svg?: string
    }
    title: string
    description?: PortableTextBlock
    cta: {
      contentPosition: 'left' | 'right'
      title: string
      url: string
    }
  }
  backgroundImage: Media
}
export interface CtaFullMediaType {
  title: string
  description: string
  cta: {
    title: string
    url: any
  }
}

export interface CtaTextType {
  title: string
  description: string
  cta: {
    title: string
    url: string
  }
  text: string
}

export type ThemeLabel = 'Lavendar' | 'Orange' | 'Green' | 'Yellow' | 'White'

//Singleton Types ----------------
export interface GlobalSettingsType {
  navigation: {
    topLevelNavigation: Array<{
      icon: ImageAsset
      title: string
      links: Array<{
        title: string
        url: string
      }>
    }>
    bottomLevelNavigation: Array<{
      icon: ImageAsset
      title: string
      links: Array<{
        url: string
        title: string
      }>
    }>
    navigationCta: {
      theme: {
        value: string
        label: ThemeLabel
      }
      title: string
      description: string
      cta: {
        title: string
        url: string
      }
    }
  }
  footer: {
    socials: Array<{
      icon: string
      url: string
    }>
    companyLinks: Array<{
      title: string
      url: string
    }>
    resourceLinks: Array<{
      title: string
      url: string
    }>
    routingNumber: string
  }
}

export interface HomepageType {
  hero: {
    title: string
    description: string
    image: string
    cta: {
      title: string
      url: string
    }
    testimonial: {
      content: PortableTextBlock
      author: string
      title: string
    }
    backgroundMedia: Media
  }
  emotionalNavigation: {
    icon: ImageAsset
    subtitle: string
    title: string
    navigationCards: Array<{
      theme: {
        value: string
        label: ThemeLabel
      }
      subtitle: string
      title: string
      description: string
      links: Array<{
        title: string
        url: string
      }>
    }>
  }
  modules: Array<CtaInContentType | CtaFullMediaType | CtaTextType>
  ctaInContent: CtaInContentType
  getInspired: {
    title: string
    description: string
    cta: {
      title: string
      url: string
    }
    inspirationCards: Array<{
      icon: string
      subtitle: string
      title: string
      description: string
      links: Array<{
        title: string
        url: string
      }>
    }>
  }
  ctaFullMedia: CtaFullMediaType
  cardGrid: {
    title: string
    description: string
    cta: {
      title: string
      url: string
    }
    cards: Array<{
      media: string
      title: string
      description: string
      links: Array<{
        title: string
        url: string
      }>
    }>
  }
  ctaText: CtaTextType
}
