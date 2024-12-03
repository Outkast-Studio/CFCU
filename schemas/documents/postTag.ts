import { defineField, defineType, validation } from 'sanity'
import { TagSimple } from '@phosphor-icons/react'

export default defineType({
  name: 'postTag',
  title: 'Post Tag',
  icon: TagSimple as any,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
