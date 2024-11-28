import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'wysiwyg',
  title: 'WYSIWYG',
  type: 'document',
  fields: [
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
      content: 'content',
    },
    prepare({ content }) {
      return {
        title: 'WYSIWYG Content',
        subtitle: 'Rich Text Section',
      }
    },
  },
})
