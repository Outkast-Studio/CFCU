import { defineField, InputProps } from 'sanity'
import { ArrayMembersWithoutActions } from '@components/Sanity/ArrayMembersWithoutActions'

export const modules = defineField({
  name: 'modules',
  title: 'Page Modules',
  type: 'array',
  group: 'modules',
  components: {
    input: (props: InputProps) =>
      ArrayMembersWithoutActions(props, {
        removeActions: ['Duplicate', 'Copy'],
      }),
  },
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
    // {
    //   type: 'reference',
    //   name: 'ctaCardGridHome',
    //   title: 'CTA Card Grid Home',
    //   to: [{ type: 'ctaCardGridHome', title: 'CTA Card Grid Home' }],
    // },
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
      title: 'Page Alert',
      to: [{ type: 'siteAlert', title: 'Page Alert' }],
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
      name: 'imageGrid',
      title: 'Image Grid',
      to: [{ type: 'imageGrid', title: 'Image Grid' }],
    },
    // {
    //   type: 'reference',
    //   name: 'quickExit',
    //   title: 'Quick Exit',
    //   to: [{ type: 'quickExit', title: 'Quick Exit' }],
    // },
    {
      type: 'reference',
      name: 'teamGrid',
      title: 'Team Grid',
      to: [{ type: 'teamGrid', title: 'Team Grid' }],
    },
    {
      type: 'reference',
      name: 'wysiwyg',
      title: 'WYSIWYG',
      to: [{ type: 'wysiwyg', title: 'WYSIWYG' }],
    },
    {
      type: 'reference',
      name: 'embed',
      title: 'Embed',
      to: [{ type: 'embed', title: 'Embed' }],
    },
    {
      type: 'reference',
      name: 'rateTable',
      title: 'Rate Table',
      to: [{ type: 'rateTable', title: 'Rate Table' }],
    },
  ],
  validation: (Rule) =>
    Rule.custom((modules) => {
      if (!modules) return true
      const siteAlerts = modules.filter(
        //@ts-ignore
        (module) => module._type === 'siteAlert',
      )
      if (siteAlerts.length > 1) {
        return 'Only one Site Alert is allowed per page'
      }
      return true
    }),
})
