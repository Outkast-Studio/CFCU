import { defineField, defineType, validation } from 'sanity'
import { HouseLine } from '@phosphor-icons/react'
import { modules } from 'schemas/schemaTypes/modules'

export default defineType({
  name: 'testModules',
  title: 'Test Modules Here',
  type: 'document',
  groups: [
    { name: 'modules', title: 'Modules' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [modules],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      cta: 'cta',
      testimonial: 'testimonial',
      backgroundMedia: 'backgroundMedia',
    },
    prepare(selection) {
      return {
        title: 'Home',
      }
    },
  },
})
