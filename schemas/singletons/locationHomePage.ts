import { defineField, defineType, validation } from 'sanity'
import { Browser } from '@phosphor-icons/react'
import { modules } from 'schemas/schemaTypes/modules'

export default defineType({
  name: 'locationHomePage',
  title: 'Location Home Page',
  icon: Browser as any,
  type: 'document',
  groups: [
    { name: 'modules', title: 'Modules' },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title in the hero section of the location home page.',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'subTitle',
      type: 'string',
      description:
        'The subtitle in the hero section of the location home page.',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'atmCSV',
      title: 'ATM CSV',
      type: 'file',
      description:
        'The CSV file containing the locations of the ATMs in the location.',
      // validation: (Rule: any) => Rule.required(),
    }),
    modules,
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description:
        'Title for search engines. If left blank, the title for this page will be set to the default title.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      description:
        'Description for search engines. If left blank, the description for this page will be set to the default description.',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG image',
      type: 'image',
      group: 'seo',
      description:
        'Image for social sharing. If left blank, the default OG image will be used.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description:
            "Describe what's in the image for screen readers and search engines.",
          validation: (Rule: any) => Rule.required(),
        },
      ],
    }),
  ],
})
