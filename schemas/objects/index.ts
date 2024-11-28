import { SchemaTypeDefinition } from 'sanity'
import hero from './homepage/hero'
import media from './media'
import blockContent from './blockContent'
import emotionalNavigation from './homepage/emotionalNavigation'
import ctaInContent from '../documents/modules/ctaInContent'
import ctaFullMedia from '../documents/modules/ctaFullMedia'
import ctaText from '../documents/modules/ctaText'
import ctaTopicRow from '../documents/modules/ctaTopicRow'
import ctaCardGridHome from '../documents/modules/ctaCardGridHome'
import ctaCardGrid from '../documents/modules/ctaCardGrid'
import getInspired from '../documents/modules/getInspired'
import pageLink from './pageLink'
import cardLink from './cardLink'
import textCardGrid from '../documents/modules/textCardGrid'
import subPageHero from '../documents/modules/subPageHero'
import relatedStories from '../documents/modules/relatedStories'
import accordion from '../documents/modules/accordion'
import siteAlert from '../documents/modules/siteAlert'
import tabs from '../documents/modules/tabs'
import columnSplit from '../documents/modules/columnSplit'
import logoGrid from '../documents/modules/logoGrid'
import quickExit from '../documents/modules/quickExit'
import rateTable from '../documents/modules/rateTable'

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
    rateTable,
  ],
}
