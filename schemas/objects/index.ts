import { SchemaTypeDefinition } from 'sanity'
import hero from './homepage/hero'
import media from './media'
import blockContent from './blockContent'
import emotionalNavigation from './homepage/emotionalNavigation'
import ctaInContent from './ctaInContent'
import getInspired from './homepage/getInspired'
import ctaFullMedia from './ctaFullMedia'
import cardGrid from './homepage/cardGrid'
import ctaText from './ctaText'
import ctaTopicRow from './ctaTopicRow'
import ctaCardGridHome from './ctaCardGridHome'
import ctaCardGrid from './ctaCardGrid'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    media,
    blockContent,
    emotionalNavigation,
    ctaInContent,
    getInspired,
    ctaFullMedia,
    cardGrid,
    ctaText,
    ctaTopicRow,
    ctaCardGridHome,
    ctaCardGrid,
  ],
}
