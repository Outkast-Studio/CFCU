import { defineField } from 'sanity'
export default defineField({
  name: 'getInspired',
  title: 'Get Inspired',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
      validation: (Rule: any) => Rule.required(),
    }),
    // defineField({
    //   name: 'featuredArticle',
    //   title: 'Featured Article',
    //   description: 'Large article positioned to the left of the screen.',
    //   type: 'reference',
    //   to: [{ type: 'article' }],
    //   validation: (Rule: any) => Rule.required(),
    // }),
    // defineField({
    //   name: 'featuredArticles',
    //   title: 'Featured Articles',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'article' }] }],
    //   validation: (Rule: any) => Rule.required().max(4),
    // }),
  ],
})
