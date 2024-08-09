import { defineField, defineType } from 'sanity'
import { House } from '@phosphor-icons/react'
import neosBuild from './objects/neosBuild'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: House,
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'meetNeo', title: 'Meet NEO' },
    { name: 'neosBuild', title: "NEO's build overview" },
  ],
  preview: {
    select: {},
    prepare({}) {
      return {
        title: 'Hompage',
      }
    },
  },
  fields: [
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'cta',
          title: 'Call to action label',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'meetNeo',
      title: 'Meet NEO',
      type: 'object',
      group: 'meetNeo',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'neosBuild',
      title: "NEO's build overview",
      type: 'neosBuild',
      group: 'neosBuild',
    }),
  ],
})
