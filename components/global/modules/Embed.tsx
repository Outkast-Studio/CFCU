'use client'

import { useEffect, useState } from 'react'
import DOMPurify from 'isomorphic-dompurify'
import Script from 'next/script'
import ErrorBoundary from './ErrorBoundary'

interface EmbedType {
  scriptsForHead: string[]
  scriptsForBeforeBody: string[]
  scriptsForBody: string[]
}

export default function SanitizedEmbed({ embed }: { embed: EmbedType }) {
  const [scriptErrors, setScriptErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    window.addEventListener('error', function (event) {
      console.error('Error:')
    })
    DOMPurify.setConfig({
      ADD_TAGS: ['iframe'],
      ADD_ATTR: [
        'src',
        'class',
        'id',
        'style',
        'scrolling',
        'frameborder',
        'allowfullscreen',
      ],
    })
  }, [])

  const sanitizeScript = (script: string) => {
    const scriptContent = script.replace(/<\/?script[^>]*>/gi, '').trim()
    return DOMPurify.sanitize(scriptContent, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    })
  }

  const sanitizeIframe = (content: string) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['iframe'],
      ADD_ATTR: [
        'src',
        'class',
        'id',
        'style',
        'scrolling',
        'frameborder',
        'allowfullscreen',
      ],
    })
  }

  const handleScriptError = (event: ErrorEvent, scriptId: string) => {
    console.error(`Error in script ${scriptId}:`, event.error)
    setScriptErrors((prev) => ({ ...prev, [scriptId]: true }))
  }

  const wrapScriptWithErrorHandling = (script: string) => {
    return `
      try {
          ${script}
      } catch (error) {
        console.error("Error in embedded script:", error.message);
      }
    `
  }

  const renderScript = (
    script: string,
    index: number,
    location: 'head' | 'beforeBody',
  ) => {
    const scriptId = `${location}-script-${index}`
    if (scriptErrors[scriptId]) {
      return null // Don't render scripts that have errored
    }

    const wrappedScript = wrapScriptWithErrorHandling(sanitizeScript(script))

    return (
      <ErrorBoundary key={scriptId} fallback={<div>Error loading script</div>}>
        <Script
          id={scriptId}
          strategy={
            location === 'head' ? 'beforeInteractive' : 'afterInteractive'
          }
          onError={(e) => handleScriptError(e, scriptId)}
        >
          {wrappedScript}
        </Script>
      </ErrorBoundary>
    )
  }

  return (
    <>
      {embed.scriptsForHead?.map((script, index) =>
        renderScript(script, index, 'head'),
      )}
      {embed.scriptsForBeforeBody?.map((script, index) =>
        renderScript(script, index, 'beforeBody'),
      )}
      {embed.scriptsForBody?.map((content, index) => (
        <ErrorBoundary
          key={`body-${index}`}
          fallback={<div>Error loading content</div>}
        >
          <div dangerouslySetInnerHTML={{ __html: sanitizeIframe(content) }} />
        </ErrorBoundary>
      ))}
    </>
  )
}
