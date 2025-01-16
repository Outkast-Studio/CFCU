import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'embed',
  title: 'Embed',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A title to indentify the embed',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scriptsForBody',
      title: 'Scripts for Body',
      description: 'Scripts to be added to the body tag',
      type: 'array',
      of: [
        {
          type: 'text',
          rows: 5,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Embed',
        subtitle: title,
      }
    },
  },
})
