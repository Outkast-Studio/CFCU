import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageLink',
  title: 'Page Link',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Link Title',
      type: 'string',
      description: 'The text to display for the link',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'reference',
      to: [
        { type: 'post' },
        // Add any other document types that can be linked
      ],
      description: 'Select the page to link to',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Use this for linking to external websites',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      targetTitle: 'link.title',
      externalLink: 'externalLink',
    },
    prepare({ title, targetTitle, externalLink }) {
      return {
        title: title || targetTitle || externalLink || 'Untitled Link',
        subtitle: externalLink ? 'External Link' : 'Internal Link',
      }
    },
  },
})
