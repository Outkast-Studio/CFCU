import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'document',
  fields: [
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description:
        'Enter the full URL for external websites. For telephone numbers, use the format tel:+1234567890',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'externalLink',
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})
