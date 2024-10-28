import { defineField } from 'sanity'
export default defineField({
  name: 'ctaFullMedia',
  title: 'CTA-Full Media',
  type: 'object',
  fields: [
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'simplerColor',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'topContent',
      title: 'Top Content',
      description: 'Represents the content at the top of the component.',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'lowerContent',
      title: 'Lower Content',
      description: 'Represents the content at the bottom of the component.',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
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
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule: any) => Rule.required(),
            }),
          ],
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'backgroundMedia',
      title: 'Background Media',
      type: 'media',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
})
