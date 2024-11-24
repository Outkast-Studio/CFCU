import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'textCardGrid',
  title: 'Text Card Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
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
              type: 'blockContent',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'pageLink',
              title: 'Page Link',
              type: 'pageLink',
              validation: (Rule) => Rule.required(),
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
      description: 'description',
      cards: 'cards',
    },
    prepare(selection) {
      return {
        title: 'Text Card Grid',
        description: selection.description,
        cards: selection.cards,
      }
    },
  },
})
