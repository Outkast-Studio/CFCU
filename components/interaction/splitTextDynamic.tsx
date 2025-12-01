import { stegaClean } from '@sanity/client/stega'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'
import React, { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(SplitText)

type Props = {
  value: string
  classNames: string
  wrapperHeights: string // e.g. "h-[56px] flex items-center"
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
  isHeading = false, // not used but kept for API
  setLineAmount = () => {},
}: Props) => {
  const headingRef = useRef<HTMLSpanElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    let ctx: gsap.Context | null = null
    let split: SplitText | null = null
    let isMounted = true

    const init = async () => {
      // Wait for fonts to be ready (Font Loading API)
      if (typeof document !== 'undefined' && 'fonts' in document) {
        try {
          // Wait until *all* fonts are loaded
          await (document as any).fonts.ready
        } catch {
          // ignore; worst case we just behave like before
        }
      } else {
        // Fallback: at least wait for window load
        await new Promise<void>((resolve) => {
          if (document.readyState === 'complete') return resolve()
          window.addEventListener('load', () => resolve(), { once: true })
        })
      }

      if (!isMounted || !headingRef.current) return

      ctx = gsap.context(() => {
        if (!headingRef.current) return

        split = new SplitText(headingRef.current, {
          type: 'lines',
          linesClass: 'line opacity-0',
        })

        setLineAmount(split.lines.length)

        gsap.set(headingRef.current, { opacity: 1 })

        // Wrap each line in a div with your height classes
        split.lines.forEach((line: HTMLElement) => {
          const wrapperDiv = document.createElement('div')
          wrapperDiv.className = wrapperHeights // Tailwind classes as a single string
          line.parentNode?.insertBefore(wrapperDiv, line)
          wrapperDiv.appendChild(line)
        })

        gsap.set(split.lines, { yPercent: 100 })

        tlRef.current = gsap
          .timeline({
            paused: true,
            delay,
            onComplete: () => {
              headingRef.current?.classList.remove('opacity-0')
              split?.revert()
            },
          })
          .fromTo(
            split.lines,
            { yPercent, opacity: 0 },
            {
              duration,
              yPercent: 0,
              opacity: 1,
              stagger,
              ease: 'power4.out',
            },
          )
      }, headingRef)

      // Auto-play if not paused on mount
      if (!paused) {
        tlRef.current?.play(0)
      }
    }

    init()

    return () => {
      isMounted = false
      tlRef.current?.kill()
      split?.revert()
      ctx?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // run once on mount

  // Respond to pause/unpause changes
  useEffect(() => {
    if (!tlRef.current) return
    if (paused) {
      tlRef.current.pause()
    } else {
      tlRef.current.play()
    }
  }, [paused])

  return (
    <span
      ref={headingRef}
      className={clsx(classNames, 'opacity-0 w-max unbalance')}
    >
      {stegaClean(value)}
    </span>
  )
}

export default SplitTextDynamic
