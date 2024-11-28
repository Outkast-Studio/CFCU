import { groq } from 'next-sanity'

export const modulesFragment = groq`
  "modules": modules[]->{
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
    },
      _type == "textCardGrid" => {
      ...,
      cards[]{
        ...,
        pageLink{
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
    _type == 'relatedStories' => {
      ...,
      posts[]->{
        ...,
      },
      pageLink{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        }
      }
    },
  }
`

export const ratesModulesFragment = groq`
  "modules": modules[]->{
    ...,
  }
`
