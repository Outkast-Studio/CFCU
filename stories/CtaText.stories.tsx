//@ts-nocheck

import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CtaText from '../components/global/modules/ctaText'
import { CtaTextType, ThemeLabel } from 'types/sanity'
import { PortableTextBlock } from '@portabletext/types'

const RichTextEditor = ({ value, onChange }) => {
  return (
    <textarea
      value={JSON.stringify(value, null, 2)}
      onChange={(e) => {
        try {
          const newValue = JSON.parse(e.target.value)
          onChange(newValue)
        } catch (error) {
          console.error('Invalid JSON:', error)
        }
      }}
      rows={10}
      style={{ width: '100%' }}
    />
  )
}

const meta: Meta<typeof CtaText> = {
  title: 'Components/CtaText',
  component: CtaText,
  tags: ['autodocs'],
  argTypes: {
    data: {
      table: {
        disable: true,
      },
    },
    //@ts-ignore
    'data.theme.label': {
      control: 'select',
      options: ['Lavender', 'Orange', 'Green', 'Yellow', 'White'],
      table: {
        category: 'Appearance',
      },
      name: 'Theme',
    },
    'data.title': {
      control: 'text',
      table: {
        category: 'Content',
      },
      name: 'Title',
    },
    'data.cta.title': {
      control: 'text',
      table: {
        category: 'Call to Action',
      },
      name: 'CTA Text',
    },
    'data.cta.path': {
      control: 'text',
      table: {
        category: 'Call to Action',
      },
      name: 'CTA Link',
    },
  },
}

export default meta
type Story = StoryObj<typeof CtaText>

const mockDescription: PortableTextBlock[] = [
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: 'Our focus is on equitably serving as many people and organizations/businesses, as possible from our broader communities and beyond.',
      },
    ],
  },
]

const mockData: CtaTextType = {
  theme: {
    value: 'lavender',
    label: 'Lavender' as ThemeLabel,
  },
  title: 'Become a Member',
  description: mockDescription,
  cta: {
    title: 'Apply Today',
    path: '/join',
  },
}

export const Lavender: Story = {
  args: {
    data: mockData,
  },
}

export const Orange: Story = {
  args: {
    data: {
      ...mockData,
      theme: {
        value: 'orange',
        label: 'Orange' as ThemeLabel,
      },
    },
  },
}

export const Green: Story = {
  args: {
    data: {
      ...mockData,
      theme: {
        value: 'green',
        label: 'Green' as ThemeLabel,
      },
    },
  },
}

export const Yellow: Story = {
  args: {
    data: {
      ...mockData,
      theme: {
        value: 'yellow',
        label: 'Yellow' as ThemeLabel,
      },
    },
  },
}

export const White: Story = {
  args: {
    data: {
      ...mockData,
      theme: {
        value: 'white',
        label: 'White' as ThemeLabel,
      },
    },
  },
}
