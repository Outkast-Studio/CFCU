import { Sub } from '@radix-ui/react-dropdown-menu'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'document',
  initialValue: {
    openInNewTab: false,
  },
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Used to identufy the Link inside of Sanity',
    }),
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
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      description: 'Open the link in a new tab',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subTitle: 'externalLink',
    },
    prepare({ title, subTitle }) {
      return {
        title: title || 'External Link',
        subtitle: subTitle,
      }
    },
  },
})
