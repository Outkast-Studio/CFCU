/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 */

import { definePlugin, type DocumentDefinition } from 'sanity'
import { type StructureResolver } from 'sanity/desk'
import { iframeOptions } from './previewPane'
import { Iframe } from 'sanity-plugin-iframe-pane'
import globalSettings from 'schemas/singletons/globalSettings'
import homepage from 'schemas/singletons/homepage'
import testModules from 'schemas/singletons/testModules'
import { Browser, Folder } from '@phosphor-icons/react/dist/ssr'
import fourOhFour from 'schemas/singletons/404'

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
    const hiddenTypes = [
      'media.tag',
      'globalSettings',
      'homepage',
      'post',
      'subPage',
      'testModules',
      'blogHomePage',
      'locationHomePage',
      'location',
      'modules',
      'ctaInContent',
      'ctaFullMedia',
      'ctaText',
      'ctaCardGridHome',
      'ctaCardGrid',
      'ctaTopicRow',
      'getInspired',
      'textCardGrid',
      'subPageHero',
      'relatedStories',
      'accordion',
      'siteAlert',
      'tabs',
      'columnSplit',
      'imageGrid',
      'quickExit',
      'post',
      'rateTable',
      'wysiwyg',
      'author',
      'topic',
      'teamGrid',
      'embed',
      '404',
    ]

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

    const fourOhFourListItem = S.listItem()
      .title(fourOhFour.title)
      .icon(fourOhFour.icon)
      .child(
        S.editor()
          .title(fourOhFour.title)
          .id(fourOhFour.name)
          .schemaType(fourOhFour.name)
          .documentId(fourOhFour.name)
          .views([
            S.view.form(),
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ]),
      )
    const testModulesListItem = S.listItem()
      .title(testModules.title)
      .icon(testModules.icon)
      .child(
        S.editor()
          .title(testModules.title)
          .id(testModules.name)
          .schemaType(testModules.name)
          .documentId(testModules.name)
          .views([
            S.view.form(),
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ]),
      )

    const postsListItem = S.listItem()
      .title('Blog')
      .child(
        S.list()
          .title('Blog')
          .items([
            S.listItem()
              .title('Blog home page')
              .icon(Browser)
              .child(
                S.document()
                  .schemaType('blogHomePage')
                  .documentId('blogHomePage')
                  .views([
                    S.view.form(),
                    S.view
                      .component(Iframe)
                      .options(iframeOptions)
                      .title('Preview'),
                  ]),
              ),
            S.listItem()
              .title('Topics')
              .schemaType('topic')
              .child(S.documentTypeList('topic').title('Topics')),
            S.listItem()
              .title('Blog Posts')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Blog Posts')),
          ]),
      )

    const locationsListItem = S.listItem()
      .title('Locations')
      .child(
        S.list()
          .title('Locations')
          .items([
            S.listItem()
              .title('Location home page')
              .icon(Browser)
              .child(
                S.document()
                  .schemaType('locationHomePage')
                  .documentId('locationHomePage')
                  .views([
                    S.view.form(),
                    S.view
                      .component(Iframe)
                      .options(iframeOptions)
                      .title('Preview'),
                  ]),
              ),
            S.listItem()
              .title('Locations')
              .schemaType('location')
              .child(S.documentTypeList('location').title('Locations')),
          ]),
      )
    const subpagesListItem = S.listItem()
      .title('Sub Pages')
      .icon(Folder)
      .schemaType('subPage')
      .child(S.documentTypeList('subPage').title('Sub Pages'))

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
        fourOhFourListItem,
        S.divider(),
        postsListItem,
        S.divider(),
        subpagesListItem,
        S.divider(),
        locationsListItem,
        S.divider(),
        ...defaultListItems,
      ])
  }
}
