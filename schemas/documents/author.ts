import { defineField, defineType, validation } from 'sanity'
import { UserList } from '@phosphor-icons/react'

export default defineType({
  name: 'author',
  title: 'Author',
  icon: UserList as any,
  type: 'document',
  groups: [{ name: 'seo', title: 'SEO' }],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
