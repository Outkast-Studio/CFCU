import { groq } from 'next-sanity'

export const globalSettingsQuery = groq`*[_type == "globalSettings"][0]`

//TODO: Rename to the title of the page (Example: getCaseStudyPage)
export const dynamicPageBySlugQuery = groq`
*[_type == "dynamicPage" && slug.current == $slug][0]`

export const dynamicPageSlugsQuery = groq`
*[_type == "dynamicPage" && defined(slug.current)][].slug.current
`

export const homepageQuery = groq`*[_type == "homepage"][0]{
...,
  "modules": modules[]{
    ...,
    _type == "ctaText" => {
      ...,
  cta{
  ...,
    link->{
        _id,
        _type,
        title,
        "slug": slug.current
      }
  }

    },
    _type == "getInspired" => {
      ...,
      "featuredArticle": featuredArticle->{
    ...,
      },
      "articleGrid": articleGrid[]->{
...,
      }
    }
  }
}`
