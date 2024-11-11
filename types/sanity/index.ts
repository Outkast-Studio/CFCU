import type { PortableTextBlock } from '@portabletext/types'
import { ImageAsset } from 'sanity'

//Object Types ------------
export interface CtaInContentType {
  title: string
  description: string
  cta: {
    title: string
    url: string
  }
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
  }
  emotionalNavigation: {
    icon: string
    subtitle: string
    title: string
    navigationCards: Array<{
      backgroundColor: string
      subtitle: string
      title: string
      description: string
      links: Array<{
        title: string
        url: string
      }>
    }>
  }
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
