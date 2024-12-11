import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imageGrid',
  title: 'Image Grid',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the image grid section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle for the image grid section',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Optional description text for the image grid section',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'The background color of the section.',
      initialValue: 'lightGray',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Light Gray', value: 'lightGray' },
          { title: 'White', value: 'white' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'logoGroups',
      title: 'Image Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'logoGroupTitle',
              title: 'Image Group Title',
              description:
                'The title of the logo group. If left blank, this group will stack below previous group.',
              type: 'string',
            }),
            defineField({
              name: 'columns',
              title: 'Number of Columns',
              type: 'number',
              description: 'The number of columns in the Image group.',
              options: {
                list: [2, 3, 4],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logos',
              title: 'Images',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'logo',
                      title: 'Image',
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
                      description: 'Link to the page for the Image',
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
                title: 'Image Group',
                subtitle: selection.logoGroupTitle,
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
        title: 'Image Grid',
        subtitle: subtitle,
      }
    },
  },
})
