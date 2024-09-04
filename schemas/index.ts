import { SchemaTypeDefinition } from 'sanity'

import globalSettings from './globalSettings'
import dynamicPage from './dynamicPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [globalSettings, dynamicPage],
}
