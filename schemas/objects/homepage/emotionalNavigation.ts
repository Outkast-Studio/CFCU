import { defineField } from 'sanity'
export default defineField({
  name: 'emotionalNavigation',
  title: 'Home Page Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description:
            "Describe what's in the image for screen readers and search engines.",
          validation: (Rule: any) => Rule.required(),
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
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'navigationCards',
      title: 'Navigation Cards',
      description: 'The cards to display in the navigation section',
      type: 'array',
      of: [
        defineField({
          name: 'navigationCard',
          title: 'Navigation Card',
          type: 'object',
          fields: [
            defineField({
              name: 'theme',
              title: 'Theme',
              type: 'simplerColor',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineField({
                  type: 'pageLink',
                  title: 'Link',
                  name: 'link',
                  validation: (Rule: any) => Rule.required(),
                }),
              ],
              validation: (Rule: any) =>
                Rule.required()
                  .min(1)
                  .max(6)
                  .error('You must add between 1 and 6 items'),
            }),
          ],
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),
  ],
})
