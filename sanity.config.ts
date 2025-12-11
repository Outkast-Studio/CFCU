/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import {
  apiVersion,
  dataset,
  DRAFT_MODE_ROUTE,
  projectId,
} from 'lib/sanity.api'
import { locate } from 'plugins/locate'
import { previewDocumentNode } from 'plugins/previewPane'
import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { presentationTool } from 'sanity/presentation'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import settingsType from 'schemas/settings'
import { schema } from 'schemas'
import { media } from 'sanity-plugin-media'
import Logo from './components/Sanity/Logo'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input'
import { debugSecrets } from '@sanity/preview-url-secret/sanity-plugin-debug-secrets'

const title = 'CFCU'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema,
  plugins: [
    deskTool({
      structure: settingsStructure(settingsType),
      defaultDocumentNode: previewDocumentNode(),
    }),
    media(),
    settingsPlugin({ type: settingsType.name }),
    simplerColorInput({
      // Note: These are all optional
      defaultColorFormat: 'hex',
      defaultColorList: [
        { label: 'Orange', value: '#F56600' },
        { label: 'Green', value: '#008566' },
        { label: 'Yellow', value: '#FFC600' },
        { label: 'Lavender', value: '#3C1053' },
        { label: 'White', value: '#FFFFFF' },
      ],
      enableSearch: true,
    }),
    inlineSvgInput(),
    unsplashImageAsset(),
    visionTool(),
    (process.env.NODE_ENV !== 'production' ||
      process.env.VERCEL_ENV !== 'production') &&
      debugSecrets(),
  ],
  icon: Logo,
})
