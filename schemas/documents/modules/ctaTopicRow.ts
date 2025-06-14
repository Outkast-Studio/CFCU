import { defineField } from 'sanity'

export default defineField({
  name: 'ctaTopicRow',
  title: 'CTA Topic Row',
  type: 'document',
  fields: [
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'simplerColor',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      description: 'The position of the image in the section.',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Eyebrow',
      type: 'string',
      description: 'Short label above the title',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContentMin',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      // validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'pageLink',
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description:
            "Describe what's in the image for screen readers and search engines.",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value || !value.asset) {
            return 'Image is required'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'CTA Topic Row',
        subtitle: title,
      }
    },
  },
})
