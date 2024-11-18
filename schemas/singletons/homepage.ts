import { defineField, defineType, validation } from 'sanity'
import { HouseLine } from '@phosphor-icons/react'
import { modules } from 'schemas/schemaTypes/modules'

export default defineType({
  name: 'homepage',
  title: 'Home Page',
  icon: HouseLine as any,
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'emotionalNavigation', title: 'Emotional Navigation' },
    { name: 'ctaInContent', title: 'CTA-In-Content' },
    { name: 'getInspired', title: 'Get Inspired' },
    { name: 'ctaFullMedia', title: 'CTA-Full Media' },
    { name: 'cardGrid', title: 'Card Grid' },
    { name: 'ctaText', title: 'CTA-Text' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'homepageHero',
      group: 'hero',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'emotionalNavigation',
      title: 'Emotional Navigation',
      type: 'emotionalNavigation',
      group: 'emotionalNavigation',
      validation: (Rule: any) => Rule.required(),
    }),
    modules,
  ],
})
