import CTAInContent from './ctaInContent'
import CTATopicRow from './ctaTopicRow'
import CTACardGridHome from './ctaCardGridHome'
import CTACardGrid from './ctaCardGrid'
import CTAText from './ctaText'
import CTAFullMedia from './ctaFullMedia'
import GetInspired from './getInspired'
import TextCardGrid from './textCardGrid'
import SubPageHero from './subPageHero'
import RelatedStories from './RelatedStories'
import Accordion from './Accordion'
import GlobalAlert from './globalAlert'
import Tabs from './Tabs'
import ColumnSplit from './columnSplit'
const ModuleFactory = ({ module }) => {
  switch (module._type) {
    case 'ctaInContent':
      return <CTAInContent data={module} />
    case 'ctaTopicRow':
      return <CTATopicRow data={module} />
    case 'ctaCardGridHome':
      return <CTACardGridHome data={module} />
    case 'ctaCardGrid':
      return <CTACardGrid data={module} />
    case 'ctaText':
      return <CTAText data={module} />
    case 'ctaFullMedia':
      return <CTAFullMedia data={module} />
    case 'getInspired':
      return <GetInspired data={module} />
    case 'textCardGrid':
      return <TextCardGrid data={module} />
    case 'subPageHero':
      return <SubPageHero data={module} />
    case 'relatedStories':
      return <RelatedStories data={module} />
    case 'accordion':
      return <Accordion data={module} />
    case 'globalAlert':
      return <GlobalAlert data={module} />
    case 'tabs':
      return <Tabs data={module} />
    case 'columnSplit':
      return <ColumnSplit data={module} />
    default:
      return null
  }
}

export default ModuleFactory
