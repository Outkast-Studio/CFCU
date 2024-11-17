import { ThemeLabel } from 'types/sanity'

export const themeConfig = {
  Lavendar: {
    background: '#3C1053',
    heading: '#F56600',
    icon: '#F56600',
    copy: '#fff',
    ctaBackground: '#fff',
    monotoneCopy: '#fff',
  },
  Orange: {
    background: '#F56600',
    heading: '#3C1053',
    icon: 'text-blue-400',
    copy: '#3C1053',
    monotoneCopy: '#000',
  },
  Green: {
    background: '#008566',
    heading: '#FFFFFF',
    copy: '#FFFFFF',
    ctaBackground: '#fff',
    monotoneCopy: '#fff',
  },
  Yellow: {
    background: '#FFC600',
    heading: '#3C1053',
    copy: '#3C1053',
    monotoneCopy: '#000',
  },
  White: {
    background: '#FFFFFF',
    heading: '#3C1053',
    copy: '#3C1053',
    ctaBackground: '#fff',
    monotoneCopy: '#000',
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
