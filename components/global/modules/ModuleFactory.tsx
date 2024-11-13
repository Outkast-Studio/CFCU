import CTAInContent from './ctaInContent'

const ModuleFactory = ({ module }) => {
  switch (module._type) {
    case 'ctaInContent':
      return <CTAInContent data={module} />
    default:
      return null
  }
}

export default ModuleFactory
