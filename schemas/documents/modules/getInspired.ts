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
      type: 'text',
      rows: 3,
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
      name: 'useTopic',
      title: 'Use Topic',
      type: 'boolean',
      initialValue: false,
      description:
        'If checked, a topic will be used instead of specific articles',
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'reference',
      to: [{ type: 'topic' }],
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.document?.useTopic && !field) {
            return 'Topic is required when "Use Topic" is selected'
          }
          return true
        }),
      hidden: ({ document }) => !document?.useTopic,
    }),
    defineField({
      name: 'featuredArticle',
      title: 'Featured Article',
      description: 'The article to display on the left side of the section.',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (!context.document?.useTopic && !field) {
            return 'Featured Article is required when not using a topic'
          }
          return true
        }),
      hidden: ({ document }) => document?.useTopic as boolean,
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
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (!context.document?.useTopic && (!field || field.length === 0)) {
            return 'Article Grid is required when not using a topic'
          }
          return true
        }),
      hidden: ({ document }) => document?.useTopic as boolean,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      useTopic: 'useTopic',
      topic: 'topic.title',
    },
    prepare({ title, useTopic, topic }) {
      return {
        title: 'Get Inspired',
        subtitle: title,
      }
    },
  },
})
