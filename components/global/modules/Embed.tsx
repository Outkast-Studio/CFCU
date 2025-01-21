'use client'

import { use, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import DOMPurify from 'isomorphic-dompurify'
import Script from 'next/script'
import ErrorBoundary from './ErrorBoundary'
import { EmbedType } from 'types/sanity'

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
  ;``
  DOMPurify.setConfig({
    ADD_TAGS: ['iframe', 'script'],
    ADD_ATTR: ['src', 'class', 'frameborder', 'allowfullscreen', 'id'],
    FORCE_BODY: true,
  })

  return (
    <div className={clsx(!isGlobal && 'py-[24px]')}>
      {embed?.scriptsForBody?.map((script, index) => (
        <div
          key={`embed-body-${index}`}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(script.trim()),
          }}
        />
      ))}
    </div>
  )
}
