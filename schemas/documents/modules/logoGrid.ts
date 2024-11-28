import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'logoGrid',
  title: 'Logo Grid',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the logo grid section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle for the logo grid section',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Optional description text for the logo grid section',
    }),
    defineField({
      name: 'logoGroups',
      title: 'Logo Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'logoGroupTitle',
              title: 'Logo Group Title',
              type: 'string',
            }),
            defineField({
              name: 'columns',
              title: 'Number of Columns',
              type: 'number',
              options: {
                list: [2, 3, 4],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logos',
              title: 'Logos',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'logo',
                      title: 'Logo',
                      type: 'image',
                      fields: [
                        {
                          name: 'alt',
                          type: 'string',
                          title: 'Alternative text',
                          description:
                            "Describe what's in the image for screen readers and search engines.",
                        },
                      ],
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'url',
                      description: 'Link to the page for the logo',
                    }),
                  ],
                  preview: {
                    select: {
                      logo: 'logo',
                    },
                    prepare(selection) {
                      return {
                        title: selection.logo.alt,
                        media: selection.logo,
                      }
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              logoGroupTitle: 'logoGroupTitle',
            },
            prepare(selection) {
              return {
                title: selection.logoGroupTitle || 'Logo Group',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: 'Logo Grid',
        subtitle: subtitle,
      }
    },
  },
})
