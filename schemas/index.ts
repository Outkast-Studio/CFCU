import { SchemaTypeDefinition } from 'sanity'
import { schema as singletons } from './singletons'
import { schema as objects } from './objects'
import { schema as documents } from './documents'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...singletons.types, ...objects.types, ...documents.types],
}
