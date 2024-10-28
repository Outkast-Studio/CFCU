import { SchemaTypeDefinition } from 'sanity'
import { schema as singletons } from './singletons'
import { schema as objects } from './objects'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...singletons.types, ...objects.types],
}
