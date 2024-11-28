import { defineField } from 'sanity'

export const modules = defineField({
  name: 'modules',
  title: 'Page Modules',
  type: 'array',
  group: 'modules',
  of: [
    {
      type: 'reference',
      name: 'rateTable',
      title: 'Rate Tables',
      to: [{ type: 'rateTable', title: 'Rate Table' }],
    },
  ],
})
