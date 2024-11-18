import { defineField } from 'sanity'

export default defineField({
  name: 'ctaText',
  title: 'CTA Text',
  type: 'object',
  fields: [
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'simplerColor',
      validation: (Rule) => Rule.required(),
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
      type: 'blockContent',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'pageLink',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'CTA Text',
      }
    },
  },
})
