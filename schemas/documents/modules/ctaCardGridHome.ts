import { defineField, defineArrayMember } from 'sanity'

export default defineField({
  name: 'ctaCardGridHome',
  title: 'CTA Card Grid Home',
  type: 'document',
  fields: [
    defineField({
      name: 'subTitle',
      title: 'Subtitle',
      type: 'string',
      description: 'The subtitle of the section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      description: 'The cards to display in the section',
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
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (!value || !value.asset) {
                    return 'Image is required'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required().length(3),
    }),
    defineField({
      name: 'linkListTitle',
      title: 'Link List Title',
      type: 'string',
      description: 'The title of the link list card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkList',
      title: 'Link List',
      type: 'array',
      description: 'The links to display in the link list card.',
      of: [
        defineArrayMember({
          type: 'pageLink',
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
        title: 'CTA Card Grid Home',
        subtitle: title,
      }
    },
  },
})
