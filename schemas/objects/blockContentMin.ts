import { defineArrayMember, defineType, defineField } from 'sanity'
import {
  TextSuperscript,
  TextSubscript,
  TextAlignRight,
  TextAlignLeft,
  TextAlignCenter,
} from '@phosphor-icons/react'
import { SubScript, SuperScript } from '@/components/global/ui/TextDecorators'
import {
  LeftAlignedText,
  CenterAlignedText,
  RightAlignedText,
} from '@/components/global/ui/TextAlignment'

// Define the horizontalRule type
export const horizontalRule = defineType({
  title: 'Horizontal Rule',
  name: 'horizontalRule',
  type: 'object',
  fields: [
    {
      name: 'key',
      type: 'string',
      hidden: true,
      initialValue: 'Horizontal Rule',
    },
  ],
})

export default defineType({
  title: 'Block Content Minimal',
  name: 'blockContentMin',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],

      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
          {
            title: 'Subscript',
            value: 'sub',
            icon: TextSubscript as any,
            component: SubScript,
          },
          {
            title: 'Superscript',
            value: 'sup',
            icon: TextSuperscript as any,
            component: SuperScript,
          },
          //   {
          //     title: 'Left Align',
          //     value: 'leftAligned',
          //     icon: TextAlignLeft,
          //     component: LeftAlignedText,
          //   },
          //   {
          //     title: 'Center Align',
          //     value: 'centerAligned',
          //     icon: TextAlignCenter,
          //     component: CenterAlignedText,
          //   },
          //   {
          //     title: 'Right Align',
          //     value: 'rightAligned',
          //     icon: TextAlignRight,
          //     component: RightAlignedText,
          //   },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // {
    //   name: 'table',
    //   title: 'Table',
    //   type: 'object',
    //   fields: [
    //     defineField({
    //       name: 'title',
    //       title: 'Title',
    //       type: 'string',
    //     }),
    //     defineField({
    //       name: 'columns',
    //       title: 'Columns',
    //       type: 'array',
    //       of: [
    //         {
    //           type: 'object',
    //           fields: [
    //             defineField({
    //               name: 'columnTitle',
    //               title: 'ColumnTitle',
    //               description: 'The title of the column',
    //               type: 'string',
    //               validation: (Rule) => Rule.required(),
    //             }),
    //             defineField({
    //               name: 'columnValues',
    //               title: 'Column Values',
    //               description: 'The values for the column',
    //               type: 'array',
    //               of: [
    //                 defineField({
    //                   name: 'value',
    //                   title: 'Value',
    //                   description: 'The value for the column',
    //                   type: 'string',
    //                   validation: (Rule) => Rule.required(),
    //                 }),
    //               ],
    //             }),
    //           ],
    //         },
    //       ],
    //       validation: (Rule) => Rule.required(),
    //       description: 'Add columns for the table',
    //     }),
    //   ],
    //   preview: {
    //     select: {
    //       title: 'title',
    //     },
    //     prepare({ title }) {
    //       return {
    //         title: title || 'Table',
    //       }
    //     },
    //   },
    // },
    // {
    //   type: 'image',
    //   fields: [
    //     {
    //       name: 'alt',
    //       type: 'string',
    //       title: 'Alternative text',
    //       description: 'Important for SEO and accessiblity.',
    //       validation: (Rule) => Rule.required(),
    //     },
    //     {
    //       name: 'caption',
    //       type: 'string',
    //       title: 'Caption',
    //       description: 'Optional caption for the image',
    //     },
    //   ],
    // },
    // {
    //   name: 'fullBleedImage',
    //   title: 'Full Bleed Image',
    //   type: 'image',
    //   fields: [
    //     {
    //       name: 'alt',
    //       type: 'string',
    //       title: 'Alternative text',
    //       description: 'Important for SEO and accessiblity.',
    //       validation: (Rule) => Rule.required(),
    //     },
    //     {
    //       name: 'caption',
    //       type: 'string',
    //       title: 'Caption',
    //       description: 'Optional caption for the image',
    //     },
    //   ],
    // },
  ],
})
