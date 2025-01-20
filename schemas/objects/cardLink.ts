import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cardLink',
  title: 'Card Link',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'reference',
      to: [
        { type: 'post' },
        { type: 'homepage', name: 'homepage', title: 'Home' },
        { type: 'location', name: 'location', title: 'Location' },
        { type: 'subPage', name: 'subPage', title: 'Sub Page' },
        { type: 'blogHomePage', name: 'blogHomePage', title: 'Blog Home Page' },
        {
          type: 'locationHomePage',
          name: 'locationHomePage',
          title: 'Location Home Page',
        },
        { type: 'topic', name: 'topic', title: 'Topic' },
        // Add any other document types that can be linked
      ],
      description: 'Select the page to link to',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'reference',
      to: [{ type: 'externalLink' }],
    }),
  ],
  preview: {
    select: {
      targetTitle: 'link.title',
      externalLink: 'externalLink',
    },
    prepare({ targetTitle, externalLink }) {
      return {
        title: targetTitle || externalLink || 'Untitled Link',
        subtitle: externalLink ? 'External Link' : 'Internal Link',
      }
    },
  },
})
