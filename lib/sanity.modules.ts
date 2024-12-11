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
      topic->{
        _id,
        title,
        "slug": slug.current,
        "relatedPosts": *[_type == 'post' && references(^._id)] | order(createdAt desc)[0...3]{
      ...,
          // Add any other fields you need from the post
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
      useTopic,
      posts[]->{
        ...,
      },
      topic->{
        _id,
        title,
        "slug": slug.current,
        "relatedPosts": *[_type == 'post' && references(^._id)] | order(createdAt desc)[0...3]{
      ...,
          // Add any other fields you need from the post
        }
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
    }
  }
`

export const ratesModulesFragment = groq`
  "modules": modules[]->{
    ...,
  }
`
