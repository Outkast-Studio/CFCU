import { defineField } from 'sanity'

export const modules = defineField({
  name: 'modules',
  title: 'Page Modules',
  type: 'array',
  group: 'modules',
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
    {
      type: 'textCardGrid',
    },
    {
      type: 'subPageHero',
    },
    {
      type: 'relatedStories',
    },
    {
      type: 'accordion',
    },
    {
      type: 'siteAlert',
    },
    {
      type: 'tabs',
    },
    {
      type: 'columnSplit',
    },
    {
      type: 'logoGrid',
    },
    {
      type: 'quickExit',
    },
  ],
})
