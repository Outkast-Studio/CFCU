import { SchemaTypeDefinition } from 'sanity'
import post from './post'
import subPage from './subPage'
import location from './location'
import rates from './rates'
import author from './author'
import postTag from './postTag'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, subPage, location, rates, author, postTag],
}
