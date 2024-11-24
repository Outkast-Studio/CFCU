import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'globalAlert',
  title: 'Global Alert',
  type: 'object',
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
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
      description: 'The main alert message content',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'simplerColor',
      validation: (Rule) => Rule.required(),
      description: 'Color theme for the alert banner',
    }),
  ],
  preview: {
    select: {
      title: 'tabName',
      content: 'content',
    },
    prepare({ title, content }) {
      return {
        title: title || 'Global Alert',
        subtitle: 'Alert Banner',
      }
    },
  },
})
