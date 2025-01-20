import { defineField, defineType, validation } from 'sanity'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'

export default defineType({
  name: 'redirects',
  title: 'Redirects',
  icon: ArrowsCounterClockwise as any,
  type: 'document',

  fields: [
    defineField({
      name: 'redirects',
      title: 'Redirects',
      type: 'array',
      description:
        'Please make all of your changes, then publish. The publish action will trigger a redeploy of your site which costs bandwidth. The less rebuilds, the better. Redirects will take around 5 minutes to update after publishing.',
      of: [
        defineField({
          name: 'redirect',
          title: 'Redirect',
          type: 'object',
          fields: [
            {
              name: 'source',
              title: 'Source Path',
              type: 'string',
              description: 'The path to redirect from',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'destination',
              title: 'Destination Path',
              type: 'string',
              description: 'The path to redirect to',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'permanent',
              title: 'Permanent Redirect',
              type: 'boolean',
              description:
                'Whether this is a permanent (301) or temporary (302) redirect',
              initialValue: false,
            },
          ],
        }),
      ],
    }),
  ],
})
