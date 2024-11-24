import { groq } from 'next-sanity'
import { modulesFragment } from 'lib/sanity.modules'
export const globalSettingsQuery = groq`*[_type == "globalSettings"][0]{
  ...,
  navigation{
    ...,
    topLevelNavigation[]{
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
  ${modulesFragment}
}`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0]`

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
  ${modulesFragment}
}`

export const testModulesQuery = groq`
*[_type == "testModules"][0]{
  ...,
  ${modulesFragment}
}`
