import { defineField } from 'sanity'
export default defineField({
  name: 'ctaText',
  title: 'CTA-Text',
  type: 'object',
  fields: [
    defineField({
      name: 'ctaCard',
      title: 'CTA Card',
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
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'simplerColor',
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
      name: 'backgroundImage',
      title: 'backgroundImage',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description:
            "Describe what's in the image for screen readers and search engines.",
        },
      ],
      validation: (Rule: any) => Rule.required(),
    }),
  ],
})
