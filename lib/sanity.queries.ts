import { groq } from 'next-sanity'

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

//TODO: Rename to the title of the page (Example: getCaseStudyPage)
export const dynamicPageBySlugQuery = groq`
*[_type == "dynamicPage" && slug.current == $slug][0]`

export const dynamicPageSlugsQuery = groq`
*[_type == "dynamicPage" && defined(slug.current)][].slug.current
`

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
      cta{
        ...,
        link->{
            _id,
            _type,
            title,
            "slug": slug.current
          }
      },
      "featuredArticle": featuredArticle->{
    ...,
      },
      "articleGrid": articleGrid[]->{
...,
      }
    },
    _type == "ctaTopicRow" => {
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
    _type == "ctaCardGridHome" => {
      ...,
      linkList[]{
        ...,
        link->{
            _id,
            _type,
            title,
            "slug": slug.current,
          }
      }
    },
    _type == "ctaCardGrid" => {
      ...,
      cards[]{
        ...,
        cardLink{
        ...,
          link->{
            _id,
            _type,
            title,
            "slug": slug.current,
            externalLink
          }
        }
      }
    },
    _type == "ctaFullMedia" => {
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
    _type == "ctaInContent" => {
      ...,
      ctaCard{
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

  }
    }
  },
}`
