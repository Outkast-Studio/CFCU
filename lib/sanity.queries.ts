import { groq } from 'next-sanity'
import {
  modulesFragment,
  ratesModulesFragment,
  homepageModulesFragment,
} from 'lib/sanity.modules'
export const globalSettingsQuery = groq`*[_type == "globalSettings"][0]{
  ...,
  globalAlerts[]->{
    ...,
  },
  globalEmbeds[]->{
    ...,
  },
  navigation{
    ...,
    topLevelNavigation[]{
      ...,
      titleLink{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        }
      },
      links[]{
        ...,
 
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        }
      }
    },
    navigationCta{
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
    bottomLevelNavigation[]{
      ...,
      links[]{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        }
      }
    }
  },
  footer{
    ...,
    companyLinks[]{
      ...,
      link->{
        _id,
        _type,
        title,
        "slug": slug.current
      }
    },
    resourceLinks[]{
      ...,
      link->{
        _id,
        _type,
        title,
        "slug": slug.current
      }
    }   
  }
  
}`

export const dynamicPageBySlugQuery = groq`
*[_type == "dynamicPage" && slug.current == $slug][0]`

export const dynamicPageSlugsQuery = groq`
*[_type == "dynamicPage" && defined(slug.current)][].slug.current
`

export const subPageBySlugQuery = groq`
*[_type == "subPage" && slug.current == $slug][0]{
  ...,
  parent->{
    ...,
  },
  childrenPages[]->{
    ...,
  },
  ${modulesFragment}
}`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0]{
  ...,
  author->{
    ...,
  },
  topics[]->{
    ...,
  },
  ${modulesFragment}
}`

export const homepageQuery = groq`*[_type == "homepage"][0]{
...,
hero{
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
emotionalNavigation{
  ...,
  navigationCards[]{
    ...,
    theme{
      ...,
      label
    },
    links[]{
      ...,
      link->{
        _id,
        _type,
        title,
        "slug": slug.current
      }
    }
  }
},
  ${homepageModulesFragment}
}`

export const testModulesQuery = groq`
*[_type == "testModules"][0]{
  ...,
  ${modulesFragment}
}`

export const ratePageBySlugQuery = groq`
*[_type == "rates" && slug.current == $slug][0]{
  ...,
  ${ratesModulesFragment}
}
`

export const ratePageSlugsQuery = groq`
*[_type == "rates" && defined(slug.current)][].slug.current
`

export const locationBySlugQuery = groq`
*[_type == "location" && slug.current == $slug][0]{
  ...,
  ${modulesFragment}
}`

export const locationSlugsQuery = groq`
*[_type == "location" && defined(slug.current)][].slug.current
`

export const locationsQuery = groq`
*[_type == "location"] | order(orderRank){
  ...,
  ${modulesFragment}
}`

export const locationHomepageQuery = groq`*[_type == "locationHomePage"][0]{
  ...,
  ${modulesFragment}
}`

// export const allPostsQuery = groq`
// *[_type == "post"]{
//   ...,
//   ${modulesFragment}
// }`

export const allPostsQuery = groq`
*[_type == "post"] | order(publishedAt desc) {
  ...,
  ${modulesFragment}
}[$start...$end]
`
export const blogHomepageQuery = groq`*[_type == "blogHomePage"][0]{
  ...,
  ${modulesFragment}
}`

export const individualPostBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0]{
  ...,
  author->{
    ...,
  },
  topics[]->{
    ...,
  },
  ${modulesFragment}
}`

export const individualPostSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

// export const topicBySlugQuery = groq`
// *[_type == "topic" && slug.current == $slug][0]{
//   ...,
//  "relatedPosts": *[_type == "post" && references(^._id)]{
// ...,
//   }
// }`

export const topicSlugsQuery = groq`
*[_type == "topic" && defined(slug.current)][].slug.current
`

export const allTopicsQuery = groq`
*[_type == "topic"]{
  ...,
  "relatedPosts": *[_type == "post" && references(^._id)]{
...,
  }
}`

export const topicBySlugQuery = groq`
*[_type == "topic" && slug.current == $slug][0]{
  ...,
}`

export const relatedPostsQuery = groq`
*[_type == "post" && references($topicId)] | order(publishedAt desc) [$start...$end] {
  ...,
 
}`

export const fourOhFourQuery = groq`*[_type == "404"][0]{
  ...,
}`
