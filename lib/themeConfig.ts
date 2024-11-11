import { ThemeLabel } from 'types/sanity'

export const themeConfig = {
  Lavendar: {
    background: '#3C1053',
    heading: '#F56600',
    icon: '#F56600',
    copy: '#fff',
    ctaBackground: '#fff',
  },
  Orange: {
    background: 'bg-gray-900',
    heading: 'text-white',
    icon: 'text-blue-400',
    copy: 'text-gray-300',
  },
  nature: {
    background: 'bg-green-100',
    heading: 'text-green-800',
    icon: 'text-green-600',
    copy: 'text-green-700',
  },
  ocean: {
    background: 'bg-blue-100',
    heading: 'text-blue-800',
    icon: 'text-blue-600',
    copy: 'text-blue-700',
  },
} as const

export type ThemeName = keyof typeof themeConfig

export interface Theme {
  background: string
  heading: string
  icon: string
  copy: string
  ctaBackground: string
}

export function getThemeClasses(themeName: ThemeLabel) {
  return themeConfig[themeName]
}
