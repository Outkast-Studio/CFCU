import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'relatedStories',
  title: 'Related Stories',
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: 'white',
      options: {
        list: [
          { title: 'Light Grey', value: 'lightGrey' },
          { title: 'White', value: 'white' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'subTitle',
      title: 'Eyebrow',
      type: 'string',
      description: 'Short label above the title',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The main heading for the related stories section',
    }),
    defineField({
      name: 'headingVariant',
      title: 'Heading Variant',
      type: 'string',
      description: 'The variant of the heading',
      initialValue: 'large',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Description text above the page link',
    }),
    defineField({
      name: 'pageLink',
      title: 'Page Link',
      type: 'pageLink',
      validation: (Rule) => Rule.required(),
      description: 'Link to view all stories',
    }),
    defineField({
      name: 'useTopic',
      title: 'Use Topic Instead of Posts',
      type: 'boolean',
      initialValue: false,
      description: 'If checked, a topic will be used instead of specific posts',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      hidden: ({ document }) => document?.useTopic as boolean,
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.document?.useTopic) return true
          return field && field.length === 3 ? true : 'You must add 3 items'
        }),
      description: 'Select posts to display in the grid',
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'reference',
      to: [{ type: 'topic' }],
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.document?.useTopic && !field) {
            return 'You must select a topic when "Use Topic" is enabled'
          }
          return true
        }),
      description:
        'Select a topic to display related stories. The first 3 posts will be displayed based on the date they were created.',
      hidden: ({ document }) => !document?.useTopic,
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
        title: 'Related Stories',
        subtitle: `${title}`,
      }
    },
  },
})
