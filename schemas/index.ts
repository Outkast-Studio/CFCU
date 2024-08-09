import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import settings from './settings'
import homepage from './homepage'
import neosBuild from './objects/neosBuild'
import neosBuildFeature from './objects/neosBuildFeature'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, settings, homepage, neosBuild, neosBuildFeature],
}
