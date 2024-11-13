import { defineField, defineArrayMember } from 'sanity'

export default defineField({
  name: 'ctaFullMedia',
  title: 'CTA Full Media',
  type: 'object',
  fields: [
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'simplerColor',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundMedia',
      title: 'Background Media',
      type: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'needsOverlay',
      title: 'Needs Overlay',
      type: 'boolean',
      description:
        'If true, this will add a darkened overlay to keep content readable.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'topContent',
      title: 'Top Content',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
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
              validation: (Rule) => Rule.required(),
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
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'lowerContent',
      title: 'Lower Content',
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
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'path',
          title: 'Path',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'CTA Full Media',
      }
    },
  },
})
