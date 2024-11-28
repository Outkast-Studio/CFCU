import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subPageHero',
  title: 'Sub Page Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The main title displayed in the hero section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'A brief subtitle or tagline to accompany the main title',
    }),
    defineField({
      name: 'needsBackgroundMedia',
      title: 'Needs Background Media',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
      description: 'Toggle to enable or disable background media for this hero',
    }),
    defineField({
      name: 'backgroundMedia',
      title: 'Background Media',
      type: 'media',
      hidden: ({ parent }) => !parent?.needsBackgroundMedia,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.document?.needsBackgroundMedia && !field) {
            return 'Background media is required when "Needs Background Media" is enabled'
          }
          return true
        }),
      description:
        'Upload an image or video to use as the background for the hero section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundMedia',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: 'Sub Page Hero',
        subtitle: title,
        media: media,
      }
    },
  },
})
