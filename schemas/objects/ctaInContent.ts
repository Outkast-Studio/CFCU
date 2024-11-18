import { defineField } from 'sanity'
export default defineField({
  name: 'ctaInContent',
  title: 'CTA-In Content',
  type: 'object',
  fields: [
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'simplerColor',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'ctaCard',
      title: 'CTA Card',
      type: 'object',
      fields: [
        defineField({
          name: 'contentPosition',
          title: 'Content Position',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Right', value: 'right' },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'left',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',

              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'SVG', value: 'svg' },
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              hidden: ({ parent }) => parent?.type !== 'text',
            }),
            defineField({
              name: 'svg',
              title: 'SVG',
              type: 'inlineSvg',
              hidden: ({ parent }) => parent?.type !== 'svg',
            }),
          ],
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'blockContent',
        }),
        defineField({
          name: 'cta',
          title: 'Call to Action',
          type: 'pageLink',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'backgroundImage',
      type: 'media',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  preview: {
    prepare(selection) {
      return {
        title: 'CTA-In-Content',
      }
    },
  },
})
