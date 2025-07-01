import { useRef, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import DOMPurify from 'isomorphic-dompurify'
import Script from 'next/script'
import ErrorBoundary from './ErrorBoundary'
import { EmbedType } from 'types/sanity'
import { stegaClean } from '@sanity/client/stega'

function extractScriptContent(content) {
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi
  let scriptContent = ''
  let remainingContent = content

  const scripts = content.match(scriptRegex)

  if (scripts) {
    scripts.forEach((script) => {
      const match = script.match(/<script\b[^>]*>([\s\S]*?)<\/script>/)
      if (match && match[1]) {
        scriptContent += match[1] + '\n'
      }
      remainingContent = remainingContent.replace(script, '')
    })
  }
  return {
    scriptContent: scriptContent.trim(),
    remainingContent: remainingContent.trim(),
  }
}

export default function SanitizedEmbed({
  embed,
  isGlobal = false,
}: {
  embed: EmbedType
  isGlobal?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !embed?.scriptsForBody?.length) return

    // Configure DOMPurify
    DOMPurify.setConfig({
      ADD_TAGS: ['iframe', 'script'],
      ADD_ATTR: [
        'src',
        'class',
        'frameborder',
        'allowfullscreen',
        'id',
        'async',
        'data-access_code',
        'data-cc',
        'data-env',
      ],
      FORCE_BODY: true,
    })

    // Clear previous content
    containerRef.current.innerHTML = ''

    // Process each script
    embed.scriptsForBody.forEach((scriptContent, index) => {
      const sanitized = DOMPurify.sanitize(stegaClean(scriptContent.trim()))

      // Create a div to hold the sanitized content
      const scriptContainer = document.createElement('div')
      scriptContainer.innerHTML = sanitized

      // Extract and execute any scripts
      const scripts = scriptContainer.querySelectorAll('script')
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script')

        // Copy all attributes
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value)
        })

        // Copy the content
        newScript.textContent = oldScript.textContent

        // Replace the old script with the new one to force execution
        oldScript.parentNode?.replaceChild(newScript, oldScript)
      })

      // Append the container to our ref
      containerRef.current.appendChild(scriptContainer)
    })
  }, [embed?.scriptsForBody])

  return (
    <div className={clsx(!isGlobal && 'py-[24px]')} ref={containerRef}></div>
  )
}
