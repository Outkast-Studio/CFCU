import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'globalAlert',
  title: 'Global Alert',
  type: 'document',
  fields: [
    defineField({
      name: 'tabName',
      title: 'Tab Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The label shown in the alert tab (e.g., "ALERT")',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContentMin',
      validation: (Rule) => Rule.required(),
      description: 'The main alert message content',
    }),
  ],
  preview: {
    select: {
      title: 'tabName',
      content: 'content',
    },
    prepare({ title, content }) {
      return {
        title: title,
        subtitle: 'Global Alert',
      }
    },
  },
})
