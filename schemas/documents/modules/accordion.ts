import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'accordion',
  title: 'Accordion',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the accordion section',
    }),
    defineField({
      name: 'subTitle',
      title: 'Sub Title',
      type: 'string',
      description: 'Sub title for the accordion section',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',

      description: 'Introduction text above the accordion items',
    }),
    defineField({
      name: 'accordionItems',
      title: 'Accordion Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description:
                'The title for the accordion item. This needs to be unique from the other accordion items.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'blockContent',
              description:
                'Content for the accordion item. Feel free to use wysiwyg styles here.',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
      description: 'Add expandable content sections',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Accordion',
        subtitle: title,
      }
    },
  },
})
