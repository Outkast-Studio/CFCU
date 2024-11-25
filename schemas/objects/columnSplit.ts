import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'columnSplit',
  title: 'Column Split',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the column split section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle for the column split section',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Optional description text for the column split section',
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
              name: 'content',
              title: 'Content',
              type: 'blockContent',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {},
            prepare(selection) {
              return {
                title: 'Content column',
              }
            },
          },
        },
      ],

      validation: (Rule) => Rule.required().min(2).max(5),
      description: 'Add between 2 and 5 columns',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: 'Column Split',
        subtitle: subtitle,
      }
    },
  },
})
