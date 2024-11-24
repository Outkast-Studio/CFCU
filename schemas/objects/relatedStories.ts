import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'relatedStories',
  title: 'Related Stories',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The main heading for the related stories section',
    }),
    defineField({
      name: 'subTitle',
      title: 'Sub Title',
      type: 'string',
      description: 'The sub title for the related stories section',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
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
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (Rule) => Rule.max(3).min(3).error('You must add 3 items'),
      description: 'Select posts to display in the grid',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Related Stories',
      }
    },
  },
})
