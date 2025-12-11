// middleware.js
import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

let goPhpRedirectsCache = null
let lastFetch = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function getGoPhpRedirects() {
  const now = Date.now()

  if (goPhpRedirectsCache && now - lastFetch < CACHE_DURATION) {
    return goPhpRedirectsCache
  }

  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: '2021-03-25',
      useCdn: false,
    })

    const sanityRedirects = await client.fetch(`*[_type == "redirects"]{
      ...,
    }`)

    const goPhpRedirects = {}

    sanityRedirects[0].redirects.forEach((redirect) => {
      if (redirect.source.startsWith('/go.php?bid=')) {
        const bidMatch = redirect.source.match(/bid=(\d+)/)
        if (bidMatch) {
          const bidValue = bidMatch[1]
          goPhpRedirects[bidValue] = {
            destination: redirect.destination,
            permanent: redirect.permanent,
          }
        }
      }
    })

    goPhpRedirectsCache = goPhpRedirects
    lastFetch = now

    return goPhpRedirects
  } catch (error) {
    console.error('Error fetching /go.php redirects in middleware:', error)
    return goPhpRedirectsCache || {}
  }
}

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || 'user'
const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS || 'pass'

function unauthorizedResponse() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected"',
    },
  })
}

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/go.php')) {
    const url = request.nextUrl.clone()

    if (url.pathname === '/go.php') {
      const bid = url.searchParams.get('bid')

      if (bid) {
        const goPhpRedirects = await getGoPhpRedirects()

        if (goPhpRedirects[bid]) {
          const statusCode = goPhpRedirects[bid].permanent ? 308 : 307

          // Fix: Create absolute URL for redirect
          let destination = goPhpRedirects[bid].destination

          // If destination is relative, make it absolute
          if (destination.startsWith('/')) {
            destination = new URL(destination, request.url).toString()
          }

          console.log(`Redirecting /go.php?bid=${bid} to ${destination}`)
          return NextResponse.redirect(destination, statusCode)
        }
      }
    }
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }

  const isLocal = process.env.NODE_ENV === 'development'
  const isProd = process.env.VERCEL_ENV === 'production'
  const shouldProtect = isLocal || !isProd

  if (!request.nextUrl.pathname.startsWith('/go.php') && shouldProtect) {
    const authHeader = request.headers.get('authorization')

    // If no Authorization header, ask for credentials
    if (!authHeader) {
      return unauthorizedResponse()
    }

    // Expect header like: "Basic base64(username:password)"
    const [scheme, encoded] = authHeader.split(' ')

    if (scheme !== 'Basic' || !encoded) {
      return unauthorizedResponse()
    }

    // Decode "username:password"
    // Edge-safe base64 decode
    let decoded = ''
    try {
      decoded = atob(encoded)
    } catch {
      return unauthorizedResponse()
    }

    const [user, pass] = decoded.split(':')

    if (user !== BASIC_AUTH_USER || pass !== BASIC_AUTH_PASS) {
      return unauthorizedResponse()
    }

    // Auth OK → continue to the app
    return NextResponse.next()
  }

  return NextResponse.next()
}

// export const config = {
//   matcher: '/go.php',
// }
