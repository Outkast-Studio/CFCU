import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tabs',
  title: 'Tabs',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Eyebrow',
      type: 'string',
      description: 'Short optional label above the title',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the tabs section',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContentMin',
      description: 'Main description text below the title',
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'blockContentMin',
              description: 'The title for the tab',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Optional icon for the tab title.',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'blockContent',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              subtitle: 'title',
            },
            prepare(selection) {
              const { subtitle } = selection
              return {
                title: 'Tab',
                subtitle:
                  subtitle && subtitle[0]?.children
                    ? subtitle[0].children
                        .filter((child) => child._type === 'span')
                        .map((span) => span.text)
                        .join('')
                    : 'No preview available',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().max(5),
      description: 'Add up to 5 tab items',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Tabs Section',
        subtitle: title,
      }
    },
  },
})
