import { defineField, defineArrayMember } from 'sanity'

export default defineField({
  name: 'ctaFullMedia',
  title: 'CTA Full Media',
  type: 'document',
  fields: [
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'simplerColor',
      options: {
        //@ts-ignore
        colorList: [
          { label: 'Orange', value: '#F56600' },
          { label: 'Yellow', value: '#FFC600' },
          { label: 'Lavender', value: '#3C1053' },
          { label: 'White', value: '#FFFFFF' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundMedia',
      title: 'Background Media',
      description: 'The media to display as the background for the section',
      type: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'needsOverlay',
      title: 'Needs Overlay',
      type: 'boolean',
      description:
        'If true, this will add a darkened overlay to keep the content readable.',
    }),
    defineField({
      name: 'topContent',
      title: 'Top Content',
      description: 'The content to display at the top of the section.',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
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
      description: 'The content to display at the bottom of the section.',
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
      type: 'pageLink',
      description:
        'The call to action button that displays at the bottom of the section.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'lowerContent.title',
    },
    prepare({ title }) {
      return {
        title: 'CTA Full Media',
        subtitle: title,
      }
    },
  },
})
