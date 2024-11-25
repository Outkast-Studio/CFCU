import { SchemaTypeDefinition } from 'sanity'
import post from './post'
import subPage from './subPage'
import location from './location'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, subPage, location],
}
