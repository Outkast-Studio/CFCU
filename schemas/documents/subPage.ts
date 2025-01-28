import { defineField, defineType, validation } from 'sanity'
import { Browser } from '@phosphor-icons/react'
import { modules } from 'schemas/schemaTypes/modules'
import { ChildrenOrderInput } from '@/components/Sanity/ChildrenOrderInput'
import { useClient } from 'sanity'
import { createClient } from 'next-sanity'
import { getClient } from '@/lib/sanity.client'

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
  initialValue: async () => {
    const client = getClient()
    const query = `*[_type == "subPage" && parent._ref == $parentId]{_id, title} | order(title asc)`
    const results = await client.fetch(query, { parentId: null })
    console.log(results, 'results')
    return {
      childrenOrder: results.map((child) => ({
        _type: 'reference',
        _ref: child._id,
      })),
    }
  },
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
          const validSlugRegex =
            /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/
          if (!validSlugRegex.test(slugValue)) {
            return 'Slug must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen. It also should not end with a slash'
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
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
      initialValue: 0,
    },
    {
      name: 'lastOrderUpdate',
      title: 'Last Order Update',
      type: 'datetime',
      hidden: true,
    },
    // {
    //   name: 'childrenOrder',
    //   title: 'Children Order',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'subPage' }] }],
    //   description:
    //     'The order of child pages. This is automatically populated and can be reordered.',
    // },
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
