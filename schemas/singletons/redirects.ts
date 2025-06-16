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
              description:
                'The path to redirect from. Format: /path/to/page (e.g., /about/team)',
              validation: (Rule) =>
                Rule.required()
                  .custom((source) => {
                    if (typeof source === 'string' && source.startsWith('/')) {
                      return true
                    }
                    return 'Source path must start with /'
                  })
                  .error('Source path is required and must start with /'),
            },
            {
              name: 'destination',
              title: 'Destination Path',
              type: 'string',
              description:
                'The path to redirect to. Format: /path/to/page (e.g., /new-about/our-team) or full URL for external redirects (e.g., https://example.com)',
              validation: (Rule) =>
                Rule.required()
                  .custom((destination) => {
                    if (typeof destination === 'string') {
                      // Allow internal paths starting with /
                      if (destination.startsWith('/')) {
                        return true
                      }
                      // Allow external URLs starting with http:// or https://
                      if (
                        destination.startsWith('http://') ||
                        destination.startsWith('https://')
                      ) {
                        return true
                      }
                    }
                    return 'Destination must start with / for internal redirects or http(s):// for external redirects'
                  })
                  .error(
                    'Destination is required and must be a valid path or URL',
                  ),
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
