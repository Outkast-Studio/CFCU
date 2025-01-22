import { defineField } from 'sanity'
export default defineField({
  name: 'ctaInContent',
  title: 'CTA-In Content',
  type: 'document',
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
          description: 'The side the content should be on.',
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
          title: 'Text or SVG',
          description:
            'Display a text label or SVG asset at the top of the card.',
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
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description:
                    "Describe what's in the image for screen readers and search engines.",
                  validation: (Rule: any) => Rule.required(),
                },
              ],
              hidden: ({ parent }) => parent?.type !== 'svg',
            }),
          ],
        }),
        defineField({
          name: 'title',
          title: 'Title',
          description: 'The title of the card.',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          description: 'The optional description of the card.',
          type: 'blockContentMin',
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
      title: 'Background Image',
      description: 'The media to display in the section',
      type: 'media',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'ctaCard.title',
    },
    prepare(selection) {
      return {
        title: 'CTA-In-Content',
        subtitle: selection.title,
      }
    },
  },
})
