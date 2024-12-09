import { defineField, defineArrayMember } from 'sanity'

export default defineField({
  name: 'ctaCardGrid',
  title: 'CTA Card Grid',
  type: 'document',
  fields: [
    defineField({
      name: 'subTitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description:
                    "Describe what's in the image for screen readers and search engines.",
                  validation: (Rule) => Rule.required(),
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'blockContent',
            }),
            defineField({
              name: 'cardLink',
              title: 'Card Link',
              type: 'cardLink',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'CTA Card Grid',
        subtitle: title,
      }
    },
  },
})
