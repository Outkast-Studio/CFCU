import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'embed',
  title: 'Embed',
  type: 'document',
  fields: [
    defineField({
      name: 'scriptsForHead',
      title: 'Scripts for Head',
      description: 'Scripts to be added to the head tag',
      type: 'array',
      of: [
        {
          type: 'text',
          rows: 5,
        },
      ],
    }),
    defineField({
      name: 'scriptsForBeforeBody',
      title: 'Scripts for Before Body',
      description: 'Scripts to be added before the body tag',
      type: 'array',
      of: [
        {
          type: 'text',
          rows: 5,
        },
      ],
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
    select: {},
    prepare() {
      return {
        title: 'Embed',
      }
    },
  },
})
