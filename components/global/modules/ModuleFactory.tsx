import CTAInContent from './ctaInContent'
import CTATopicRow from './ctaTopicRow'
import CTACardGridHome from './ctaCardGridHome'
import CTACardGrid from './ctaCardGrid'
import CTAText from './ctaText'
import CTAFullMedia from './ctaFullMedia'

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
    default:
      return null
  }
}

export default ModuleFactory
