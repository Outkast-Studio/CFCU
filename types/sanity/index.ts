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
    contentPosition: 'left' | 'right'
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

export type ThemeLabel = 'Lavendar' | 'Orange' | 'Green' | 'Yellow' | 'White'

export interface CtaTopicRowType {
  title: string
  theme: {
    value: string
    label: ThemeLabel
  }
  imagePosition: 'left' | 'right'
  description: PortableTextBlock
  links?: Array<{
    title: string
    path: string
  }>
  image: ImageAsset
}

export interface CtaCardGridHomeType {
  subTitle: string
  title: string
  cards: Array<{
    image: ImageAsset
    title: string
    description: PortableTextBlock
    cardLink: CardLinkType
  }>
  linkListTitle: string
  linkList: Array<{
    title: string
    path: PageLinkType
  }>
}

export interface CtaCardGridType {
  subTitl?: string
  title?: string
  cards: Array<{
    image: ImageAsset
    title: string
    description: PortableTextBlock
    cardLink: CardLinkType
  }>
}

export interface PageLinkType {
  title: string
  link?: {
    _id: string
    _type: string
    title: string
    slug: {
      current: string
    }
  }
  externalLink?: string
}

export interface CardLinkType {
  link?: {
    _id: string
    _type: string
    title: string
    slug: {
      current: string
    }
  }
  externalLink?: string
}
export interface CtaTextType {
  theme: {
    value: string
    label: string
  }
  title: string
  description?: PortableTextBlock
  cta: PageLinkType
}

export interface GetInspiredType {
  title: string
  description: PortableTextBlock
  cta: {
    title: string
    path: string
  }
  featuredArticle: Post
  articleGrid: Post[]
}

export interface CtaFullMediaType {
  theme: {
    value: string
    label: string
  }
  backgroundMedia: Media
  needsOverlay: boolean
  topContent: {
    title: {
      type: 'text' | 'svg'
      text?: string
      svg?: string
    }
    subtitle?: string
  }
  lowerContent?: {
    title: string
    description?: PortableTextBlock
  }
  cta: {
    title: string
    path: string
  }
}

//Singleton Types ----------------
export interface GlobalSettingsType {
  navigation: {
    topLevelNavigation: Array<{
      icon: ImageAsset
      titleLink: PageLinkType
      links: Array<PageLinkType>
    }>
    bottomLevelNavigation: Array<{
      icon: ImageAsset
      title: string
      links: Array<PageLinkType>
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
      icon: ImageAsset
      url: string
    }>
    companyLinks: Array<PageLinkType>
    resourceLinks: Array<PageLinkType>
    routingNumber: string
    lowerFooterIcons: Array<{
      icon: ImageAsset
    }>
    lowerFooterMessage: string
  }
}

export type Modules = Array<
  | CtaInContentType
  | CtaFullMediaType
  | CtaTextType
  | CtaCardGridHomeType
  | CtaCardGridType
  | CtaTopicRowType
  | GetInspiredType
>
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
      links: Array<PageLinkType>
    }>
  }
  modules: Modules
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

// Document types ------------------------------------------------

export interface PostPageType {
  _type: 'post'
  title: string
  type: string
  slug: {
    current: string
  }
  content: PortableTextBlock
  excerpt: string
  thumbnailImage: ImageAsset
}

export interface SubPageType {
  _type: 'subPage'
  title: string
  slug: {
    current: string
  }
  modules: Modules
  metaTitle?: string
  metaDescription?: string
  ogImage?: {
    asset: ImageAsset
    alt: string
  }
}

export interface TestModulesType {
  modules: Modules
}
