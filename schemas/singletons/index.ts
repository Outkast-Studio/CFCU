import { SchemaTypeDefinition } from 'sanity'
import globalSettings from './globalSettings'
import homepage from './homepage'
import testModules from './testModules'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [globalSettings, homepage, testModules],
}
