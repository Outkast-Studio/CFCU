import React from 'react'
import { useEffect, useRef } from 'react'
import { SplitText } from 'gsap/dist/SplitText'
import { gsap } from 'gsap'
import { PortableText } from '@portabletext/react'
import { myWysiwygComponentsWithoutPadding } from 'pages/_app'
import { clsx } from 'clsx'
import { stegaClean } from '@sanity/client/stega'
import { useWindowSize } from 'hooks/useWindowSize'

const SplitTextDynamic = ({
  value,
  classNames,
  wrapperHeights,
  stagger,
  duration,
  delay = 0,
  paused = false,
  yPercent = 100,
}) => {
  const headingRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headingRef.current) return

      const split = new SplitText(headingRef.current, {
        type: 'lines',
        linesClass: 'line opacity-0',
      })
      gsap.set(headingRef.current, { opacity: 1 })
      split.lines.forEach((line: HTMLDivElement) => {
        const wrapperDiv = document.createElement('div')
        wrapperDiv.classList.add(...wrapperHeights)
        line.parentNode.insertBefore(wrapperDiv, line)
        wrapperDiv.appendChild(line)
      })
      gsap.set(split.lines, { yPercent: 100 })
      tlRef.current = gsap.timeline({ paused: true }).fromTo(
        split.lines,
        {
          yPercent,
          opacity: 0,
        },
        {
          duration: duration,
          yPercent: 0,
          opacity: 1,
          stagger: stagger,
          ease: 'power4.out',
          delay,
        },
      )
    })
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (paused) return
    tlRef.current.play()
  }, [paused])
  //TODO need to consider accessibility here.
  return (
    <>
      <p ref={headingRef} className={clsx(classNames, 'opacity-0')}>
        {stegaClean(value)}
      </p>
    </>
  )
}
export default SplitTextDynamic
