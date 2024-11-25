import { SchemaTypeDefinition } from 'sanity'
import post from './post'
import subPage from './subPage'
import location from './location'
import rates from './rates'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, subPage, location, rates],
}
