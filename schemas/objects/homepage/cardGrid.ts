import { defineField } from 'sanity'
export default defineField({
  name: 'homepageCardGrid',
  title: 'Homepage Card Grid',
  type: 'object',
  fields: [
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
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineField({
          name: 'card',
          title: 'Card',
          type: 'object',
          fields: [
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
                },
              ],
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'cta',
              title: 'Call to Action',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (Rule: any) => Rule.required(),
                }),
              ],
              validation: (Rule: any) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule: any) =>
        Rule.required().min(3).max(3).error('You must add 3 items'),
    }),
    defineField({
      name: 'helpfulLinksCard',
      title: 'Helpful Links Card',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            defineField({
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (Rule: any) => Rule.required(),
                }),
              ],
            }),
          ],
          validation: (Rule: any) =>
            Rule.required().min(3).max(3).error('You must add 3 items'),
        }),
      ],
    }),
  ],
})
