import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamGrid',
  title: 'Team Grid',
  type: 'document',
  fields: [
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
      description: 'The main title for the team grid section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description:
        'A brief description or introduction to the team grid section',
    }),
    defineField({
      name: 'teamRows',
      title: 'Team Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'groupTitle',
              title: 'Group Title',
              type: 'string',
              description: 'The title for this group of team members',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'groupMembers',
              title: 'Group Members',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      description:
                        'A profile picture of the team member (preferably square)',
                      fields: [
                        {
                          name: 'alt',
                          type: 'string',
                          title: 'Alternative text',
                          validation: (Rule) => Rule.required(),
                          description:
                            "Describe what's in the image for screen readers and search engines.",
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
                      name: 'name',
                      title: 'Name',
                      type: 'string',
                      description: 'The full name of the team member',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      description:
                        'The job title or position of the team member',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'phoneNumber',
                      title: 'Phone Number',
                      type: 'string',
                      description:
                        'The contact phone number for the team member (optional)',
                    }),
                    defineField({
                      name: 'email',
                      title: 'Email',
                      type: 'string',
                      description:
                        'The email address for the team member (optional)',
                    }),
                    defineField({
                      name: 'moreInfoLink',
                      title: 'More Info Link',
                      type: 'pageLink',
                      description:
                        'A link to additional information about the team member (optional)',
                    }),
                  ],
                  preview: {
                    select: {
                      image: 'image',
                      name: 'name',
                      title: 'title',
                    },
                    prepare(selection) {
                      return {
                        title: selection.name,
                        subtitle: selection.title,
                        media: selection.image,
                      }
                    },
                  },
                },
              ],
              description:
                'Add team members to this group (minimum 1, maximum 4)',
              validation: (Rule) => Rule.required().min(1).max(4),
            }),
          ],
        },
      ],
      description: 'Create rows of team member groups',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
  description: 'A grid layout displaying team members organized by groups',
})
