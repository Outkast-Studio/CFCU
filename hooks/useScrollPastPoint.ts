import { useState, useEffect } from 'react'

export function useScrollPastPoint(threshold: number): boolean {
  const [isPastPoint, setIsPastPoint] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop
      setIsPastPoint(currentScrollPosition > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isPastPoint
}
