import { defineField, defineArrayMember } from 'sanity'

export default defineField({
  name: 'getInspired',
  title: 'Get Inspired',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'The description of the section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'pageLink',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredArticle',
      title: 'Featured Article',
      description: 'The article to display on the left side of the section.',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'articleGrid',
      title: 'Article Grid',
      type: 'array',
      description: 'The articles to display on the right side of the section.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'post' }],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Get Inspired',
        subtitle: title,
      }
    },
  },
})
