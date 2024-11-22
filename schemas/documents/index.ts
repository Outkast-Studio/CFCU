import { SchemaTypeDefinition } from 'sanity'
import post from './post'
import subPage from './subPage'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, subPage],
}
