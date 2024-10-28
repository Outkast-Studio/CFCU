import { SchemaTypeDefinition } from 'sanity'
import globalSettings from './globalSettings'
import homepage from './homepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [globalSettings, homepage],
}
