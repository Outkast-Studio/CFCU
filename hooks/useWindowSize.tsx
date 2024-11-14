import { useEffect, useState } from 'react'
import debounce from 'just-debounce-it'

/**
 * @name useWindowSize
 * @description A React hook that listens to window size and tracks transitions between mobile and tablet+.
 * @returns {object} { width, height, transitionedFromMobile, transitionedToMobile }
 */

export function useWindowSize(debounceDelay = 500) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [transitionedFromMobile, setTransitionedFromMobile] = useState(false)
  const [transitionedToMobile, setTransitionedToMobile] = useState(false)

  useEffect(() => {
    const onWindowResize = debounce(
      () => {
        const currentWidth = Math.min(
          window.innerWidth,
          document.documentElement.clientWidth,
        )
        const currentHeight = Math.min(
          window.innerHeight,
          document.documentElement.clientHeight,
        )

        // Check for transition
        if (isMobile && currentWidth >= 800) {
          setTransitionedFromMobile(true)
          setTransitionedToMobile(false)
        } else if (!isMobile && currentWidth < 800) {
          setTransitionedToMobile(true)
          setTransitionedFromMobile(false)
        }

        setWidth(currentWidth)
        setHeight(currentHeight)
        setIsMobile(currentWidth < 800)
      },
      debounceDelay,
      true,
    )

    window.addEventListener('resize', onWindowResize, false)

    onWindowResize()

    return () => window.removeEventListener('resize', onWindowResize, false)
  }, [debounceDelay, isMobile])

  return { width, height, transitionedFromMobile, transitionedToMobile }
}
