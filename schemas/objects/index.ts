import { SchemaTypeDefinition } from 'sanity'
import hero from './homepage/hero'
import media from './media'
import blockContent from './blockContent'
import emotionalNavigation from './homepage/emotionalNavigation'
import ctaInContent from './ctaInContent'
import ctaFullMedia from './ctaFullMedia'
import ctaText from './ctaText'
import ctaTopicRow from './ctaTopicRow'
import ctaCardGridHome from './ctaCardGridHome'
import ctaCardGrid from './ctaCardGrid'
import getInspired from './getInspired'
import pageLink from './pageLink'
import cardLink from './cardLink'
import textCardGrid from './textCardGrid'
import subPageHero from './subPageHero'
import relatedStories from './relatedStories'
import accordion from './accordion'
import siteAlert from './siteAlert'
import tabs from './tabs'
import columnSplit from './columnSplit'
import logoGrid from './logoGrid'
import quickExit from './quickExit'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    media,
    blockContent,
    emotionalNavigation,
    ctaInContent,
    getInspired,
    ctaFullMedia,
    ctaText,
    ctaTopicRow,
    ctaCardGridHome,
    ctaCardGrid,
    pageLink,
    cardLink,
    textCardGrid,
    subPageHero,
    relatedStories,
    accordion,
    siteAlert,
    tabs,
    columnSplit,
    logoGrid,
    quickExit,
  ],
}
