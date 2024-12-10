import { SchemaTypeDefinition } from 'sanity'
import post from './post'
import subPage from './subPage'
import location from './location'
import author from './author'
import topic from './topic'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, subPage, location, author, topic],
}
