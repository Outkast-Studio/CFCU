import { useEffect } from 'react'
import { usePaneRouter } from 'sanity/desk'

export const AutoPreviewPane = () => {
  const {
    setView,
    duplicateCurrent,
    groupIndex,
    hasGroupSiblings,
    routerPanesState,
  } = usePaneRouter()

  useEffect(() => {
    console.log(routerPanesState)
    // Check if "preview" is active
    const isPreviewActive = routerPanesState.some((group) =>
      group.some((pane) => pane.params?.view === 'preview'),
    )

    if (!isPreviewActive) {
      if (hasGroupSiblings) {
        if (groupIndex === 1) {
          setView('preview')
        }
      } else {
        duplicateCurrent()
      }
    }
    // Ignoring this because adding deps causes lots of loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
