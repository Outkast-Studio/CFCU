import { defineField, defineType, validation } from 'sanity'
import { Browser } from '@phosphor-icons/react'
import { modules } from 'schemas/schemaTypes/modules'

export default defineType({
  name: 'subPage',
  title: 'Sub Page',
  icon: Browser as any,
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Since the structure of sub page slugs is flexible, the generate button will only pull in the title of the sub page. Nested parents will not be pulled into the slug.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        slugify: (input, type) => {
          // Custom slugify function to ensure uniqueness
          return `${input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`
        },
      },
      validation: (Rule) =>
        Rule.required().custom((slug, context) => {
          if (typeof slug === 'undefined') {
            return true // Allow undefined values
          }

          const slugValue = slug.current

          if (!slugValue) {
            return 'Slug is required'
          }

          if (
            slugValue.startsWith('posts/') ||
            slugValue.startsWith('locations/') ||
            slugValue.startsWith('rates/') ||
            slugValue.startsWith('/')
          ) {
            return 'Slug must not start with "posts/", "locations/", "rates/", or "/"'
          }

          // Check if the slug is valid (lowercase letters, numbers, and hyphens only)
          const validSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
          if (!validSlugRegex.test(slugValue)) {
            return 'Slug must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen'
          }
          return true
        }),
    }),
    // defineField({
    //   name: 'path',
    //   title: 'Path',
    //   type: 'string',
    //   readOnly: true,
    //   validation: (Rule) => Rule.required(),
    //   options: {
    //     source: 'slug',
    //     slugify: (input, type) => {
    //       // Custom slugify function to ensure uniqueness
    //       return `/${input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`
    //     },
    //   },
    // }),
    defineField({
      name: 'parent',
      title: 'Parent Sub Page',
      type: 'reference',
      to: [{ type: 'subPage' }],
    }),
    defineField({
      name: 'pageHero',
      title: 'Page Hero',
      type: 'subPageHero',
      group: 'hero',
      validation: (Rule) => Rule.required(),
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
