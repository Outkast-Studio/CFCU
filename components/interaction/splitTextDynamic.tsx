import React from 'react'
import { useEffect, useRef } from 'react'
import { SplitText } from 'gsap/dist/SplitText'
import { gsap } from 'gsap'
import { PortableText } from '@portabletext/react'
import { myWysiwygComponentsWithoutPadding } from 'pages/_app'
import { clsx } from 'clsx'
import { stegaClean } from '@sanity/client/stega'
import { useWindowSize } from 'hooks/useWindowSize'
import { useState } from 'react'

type Props = {
  value: string
  classNames: string
  wrapperHeights: string
  stagger: number
  duration: number
  delay?: number
  paused?: boolean
  yPercent?: number
  isHeading?: boolean
  setLineAmount?: (count: number) => void
}

const SplitTextDynamic = ({
  value,
  classNames,
  wrapperHeights,
  stagger,
  duration,
  delay = 0,
  paused = false,
  yPercent = 100,
  isHeading = false,
  setLineAmount = () => {},
}: Props) => {
  const headingRef = useRef(null)
  const tlRef = useRef(null)
  const accessibilityRef = useRef(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headingRef.current) return

      const split = new SplitText(headingRef.current, {
        type: 'lines',
        linesClass: 'line opacity-0',
      })
      setLineAmount(split.lines.length)
      gsap.set(headingRef.current, { opacity: 1 })
      split.lines.forEach((line: HTMLDivElement) => {
        const wrapperDiv = document.createElement('div')
        wrapperDiv.classList.add(...wrapperHeights)
        line.parentNode.insertBefore(wrapperDiv, line)
        wrapperDiv.appendChild(line)
      })
      gsap.set(split.lines, { yPercent: 100 })
      tlRef.current = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            // headingRef.current.remove()
            setAnimationComplete(true)
          },
        })
        .fromTo(
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
      {/* {animationComplete && (
        <>{isHeading ? <>{value}</> : <p ref={accessibilityRef}>{value}</p>}</>
      )} */}
    </>
  )
}
export default SplitTextDynamic
