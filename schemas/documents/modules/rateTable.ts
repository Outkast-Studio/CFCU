import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'rateTable',
  title: 'Rate Table',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the rate table',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'columnTitle',
              title: 'Column Title',
              description: 'The title of the column',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'columnValues',
              title: 'Column Values',
              description: 'The values for the column',
              type: 'array',
              of: [
                defineField({
                  name: 'value',
                  title: 'Value',
                  description: 'The value for the column',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
      description: 'Add columns for the rate table',
    }),
    defineField({
      name: 'tableNotes',
      title: 'Table Notes',
      type: 'blockContent',
      description: 'Notes for the rate table',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Rate Table',
        subtitle: title,
      }
    },
  },
})
