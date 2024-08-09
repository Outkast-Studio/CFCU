import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import author from './author'
import post from './post'
import settings from './settings'
import work from './work'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, author, post, settings, work],
}
