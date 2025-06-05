import { createClient } from 'next-sanity'

/** @type {import('next').NextConfig} */
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
    ],
    dangerouslyAllowSVG: true,
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  // async redirects() {
  //   // const client = createClient({
  //   //   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  //   //   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  //   //   apiVersion: '2021-03-25',
  //   //   useCdn: false, // We need to use the API directly here
  //   // })
  //   // const sanityRedirects = await client.fetch(`*[_type == "redirects"]{
  //   //   ...,
  //   // }`)
  //   // return sanityRedirects[0].redirects.map((redirect) => ({
  //   //   source: redirect.source,
  //   //   destination: redirect.destination,
  //   //   permanent: redirect.permanent,
  //   // }))
  // },
}
export default config
