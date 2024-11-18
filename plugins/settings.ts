/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 */

import { definePlugin, type DocumentDefinition } from 'sanity'
import { type StructureResolver } from 'sanity/desk'
import { iframeOptions } from './previewPane'
import { Iframe } from 'sanity-plugin-iframe-pane'
import globalSettings from 'schemas/singletons/globalSettings'
import homepage from 'schemas/singletons/homepage'

export const settingsPlugin = definePlugin<{ type: string }>(({ type }) => {
  return {
    name: 'settings',
    document: {
      // Hide 'Settings' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => templateItem.templateId !== type)
        }

        return prev
      },
      // Removes the "duplicate" action on the "settings" singleton
      actions: (prev, { schemaType }) => {
        if (schemaType === type) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
})

// The StructureResolver is how we're changing the DeskTool structure to linking to a single "Settings" document, instead of rendering "settings" in a list
// like how "Post" and "Author" is handled.
export const settingsStructure = (
  typeDef: DocumentDefinition,
): StructureResolver => {
  return (S) => {
    const hiddenTypes = ['media.tag', 'globalSettings', 'homepage', 'post']

    const globalSettingsListItem = S.listItem()
      .title(globalSettings.title)
      .icon(globalSettings.icon)
      .child(
        S.editor()
          .title(globalSettings.title)
          .id(globalSettings.name)
          .schemaType(globalSettings.name)
          .documentId(globalSettings.name)
          .views([
            S.view.form(),
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ]),
      )
    const homepageListItem = S.listItem()
      .title(homepage.title)
      .icon(homepage.icon)
      .child(
        S.editor()
          .title(homepage.title)
          .id(homepage.name)
          .schemaType(homepage.name)
          .documentId(homepage.name)
          .views([
            S.view.form(),
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ]),
      )

    const postsListItem = S.listItem()
      .title('Posts')
      .schemaType('post')
      .child(S.documentTypeList('post').title('Posts'))

    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => !hiddenTypes.includes(listItem.getId()),
    )

    return S.list()
      .title('Content')
      .items([
        globalSettingsListItem,
        S.divider(),
        homepageListItem,
        S.divider(),
        postsListItem,
        ...defaultListItems,
      ])
  }
}
