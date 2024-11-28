import { defineField } from 'sanity'

export const modules = defineField({
  name: 'modules',
  title: 'Page Modules',
  type: 'array',
  group: 'modules',
  of: [
    {
      type: 'reference',
      name: 'ctaInContent',
      title: 'CTA In Content',
      to: [{ type: 'ctaInContent', title: 'CTA In Content' }],
    },
    {
      type: 'reference',
      name: 'ctaFullMedia',
      title: 'CTA Full Media',
      to: [{ type: 'ctaFullMedia', title: 'CTA Full Media' }],
    },
    {
      type: 'reference',
      name: 'ctaText',
      title: 'CTA Text',
      to: [{ type: 'ctaText', title: 'CTA Text' }],
    },
    {
      type: 'reference',
      name: 'ctaCardGridHome',
      title: 'CTA Card Grid Home',
      to: [{ type: 'ctaCardGridHome', title: 'CTA Card Grid Home' }],
    },
    {
      type: 'reference',
      name: 'ctaCardGrid',
      title: 'CTA Card Grid',
      to: [{ type: 'ctaCardGrid', title: 'CTA Card Grid' }],
    },
    {
      type: 'reference',
      name: 'ctaTopicRow',
      title: 'CTA Topic Row',
      to: [{ type: 'ctaTopicRow', title: 'CTA Topic Row' }],
    },
    {
      type: 'reference',
      name: 'getInspired',
      title: 'Get Inspired',
      to: [{ type: 'getInspired', title: 'Get Inspired' }],
    },
    {
      type: 'reference',
      name: 'textCardGrid',
      title: 'Text Card Grid',
      to: [{ type: 'textCardGrid', title: 'Text Card Grid' }],
    },
    {
      type: 'reference',
      name: 'relatedStories',
      title: 'Related Stories',
      to: [{ type: 'relatedStories', title: 'Related Stories' }],
    },
    {
      type: 'reference',
      name: 'accordion',
      title: 'Accordion',
      to: [{ type: 'accordion', title: 'Accordion' }],
    },
    {
      type: 'reference',
      name: 'siteAlert',
      title: 'Site Alert',
      to: [{ type: 'siteAlert', title: 'Site Alert' }],
    },
    {
      type: 'reference',
      name: 'tabs',
      title: 'Tabs',
      to: [{ type: 'tabs', title: 'Tabs' }],
    },
    {
      type: 'reference',
      name: 'columnSplit',
      title: 'Column Split',
      to: [{ type: 'columnSplit', title: 'Column Split' }],
    },
    {
      type: 'reference',
      name: 'logoGrid',
      title: 'Logo Grid',
      to: [{ type: 'logoGrid', title: 'Logo Grid' }],
    },
    {
      type: 'reference',
      name: 'quickExit',
      title: 'Quick Exit',
      to: [{ type: 'quickExit', title: 'Quick Exit' }],
    },
  ],
})
