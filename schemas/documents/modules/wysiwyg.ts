import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'wysiwyg',
  title: 'WYSIWYG',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Title for this section',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
      description: 'Rich text content for this section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'WYSIWYG Content',
        subtitle: title,
      }
    },
  },
})
