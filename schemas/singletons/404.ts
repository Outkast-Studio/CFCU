import { defineField, defineType, validation } from 'sanity'
import { ImageBroken } from '@phosphor-icons/react'

export default defineType({
  name: '404',
  title: '404 Page',
  icon: ImageBroken as any,
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundMedia',
      title: 'Background Media',
      type: 'media',
      validation: (Rule) => Rule.required(),
      description: 'The background media for the 404 page',
    }),
    defineField({
      name: 'backgroundNeedsGradient',
      title: 'Background Needs Gradient',
      type: 'boolean',
      description: 'If true, the background will be a gradient',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The main title displayed in the hero section',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: 'A brief description to accompany the main title',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'pageLink' }],
      validation: (Rule) => Rule.required(),
      description: 'Links to display on the 404 page',
    }),
  ],
})
