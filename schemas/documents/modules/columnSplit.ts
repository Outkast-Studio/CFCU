import { title } from '@/lib/demo.data'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'columnSplit',
  title: 'Column Split',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Eyebrow',
      type: 'string',
      description: 'Short optional label above each column split section',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the column split section',
    }),
    defineField({
      name: 'titleSize',
      title: 'Title Size',
      type: 'string',
      options: {
        list: [
          { title: 'XL', value: 'xl' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'titleColor',
      title: 'Title Color',
      type: 'string',
      options: {
        list: [
          { title: 'Orange', value: 'orange' },
          { title: 'Purple', value: 'purple' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContentMin',
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
  initialValue: {
    titleSize: 'xl',
    titleColor: 'purple',
  },
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: 'Column Split',
        subtitle: title,
      }
    },
  },
})
