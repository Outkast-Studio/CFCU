import { defineField} from 'sanity'

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
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
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
      fields: [
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      imageUrl: 'image.asset.url',
      videoUrl: 'video.asset.url',
      alt: 'image.alt',
      caption: 'video.caption',
    },
    prepare(selection) {
      const { mediaType, imageUrl, videoUrl, alt, caption } = selection
      return {
        title: mediaType === 'image' ? 'Image' : 'Video',
        subtitle: mediaType === 'image' ? alt : caption,
        media: mediaType === 'image' ? imageUrl : videoUrl,
      }
    },
  },
})
