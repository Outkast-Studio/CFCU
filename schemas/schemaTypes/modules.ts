import { defineField } from 'sanity'

export const modules = defineField({
  name: 'modules',
  title: 'Page Modules',
  type: 'array',
  of: [
    {
      type: 'ctaInContent',
    },
    {
      type: 'ctaFullMedia',
    },
    {
      type: 'ctaText',
    },
    {
      type: 'ctaCardGridHome',
    },
    {
      type: 'ctaCardGrid',
    },
    {
      type: 'ctaTopicRow',
    },
    {
      type: 'getInspired',
    },
  ],
})
