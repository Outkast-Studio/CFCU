import { SchemaTypeDefinition } from 'sanity'
import globalSettings from './globalSettings'
import homepage from './homepage'
import testModules from './testModules'
import blogHomePage from './blogHomePage'
import locationHomePage from './locationHomePage'
import fourOhFour from './404'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    globalSettings,
    homepage,
    testModules,
    blogHomePage,
    locationHomePage,
    fourOhFour,
  ],
}
