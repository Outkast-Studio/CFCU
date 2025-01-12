import { defineField } from 'sanity'

export default defineField({
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // This enables the hotspot/crop functionality
      },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description:
            "Describe what's in the image for screen readers and search engines.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Image ',
      type: 'image',
      description: 'The image to display on mobile devices. (optional)',
      options: {
        hotspot: true, // This enables the hotspot/crop functionality
      },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description:
            "Describe what's in the image for screen readers and search engines.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      imageUrl: 'image.asset.url',
      videoUrl: 'video.asset.url',
      alt: 'image.alt',
    },
    prepare(selection) {
      const { mediaType, imageUrl, videoUrl, alt } = selection
      return {
        title: mediaType === 'image' ? 'Image' : 'Video',
        subtitle: mediaType === 'image' ? alt : '',
        media: mediaType === 'image' ? imageUrl : videoUrl,
      }
    },
  },
})
