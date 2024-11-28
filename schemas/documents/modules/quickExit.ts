import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'quickExit',
  title: 'Quick Exit',
  type: 'document',
  fields: [
    defineField({
      name: 'exitUrl',
      title: 'Exit URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description:
        'The URL to redirect to when the user clicks the exit button',
    }),
  ],
  preview: {
    select: {
      exitUrl: 'exitUrl',
    },
    prepare({ exitUrl }) {
      return {
        title: 'Quick Exit',
        subtitle: 'url:' + exitUrl,
      }
    },
  },
})
