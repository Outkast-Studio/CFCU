import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'textCardGrid',
  title: 'Text Card Grid',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Eyebrow',
      type: 'string',
      description: 'Short label above the title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title displayed in the hero section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      rows: 3,
      type: 'text',
      description: 'The short description displayed below the title',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      description: 'The cards displayed in the card grid',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'pageLink',
              title: 'Page Link',
              type: 'pageLink',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: 'Text Card Grid',
        subtitle: selection.title,
      }
    },
  },
})
