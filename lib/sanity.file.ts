import { buildFileUrl } from '@sanity/asset-utils'
import { parseAssetId } from '@sanity/asset-utils'

export const urlForFile = (source: any) => {
  const parts = parseAssetId(source)
  return buildFileUrl(parts, {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  })
}
