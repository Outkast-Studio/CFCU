import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'embed',
  title: 'Embed',
  type: 'document',
  fields: [
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
    select: {},
    prepare() {
      return {
        title: 'Embed',
      }
    },
  },
})
