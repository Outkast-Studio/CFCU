import { groq } from 'next-sanity'

export const modulesFragment = groq`
  "modules": modules[]->{
    ...,
    _type == "wysiwyg" => {
      ...,
      content[]{
    ...,
      markDefs[]{
        ...,
      _type == "wysiwygPageLink" => {
        ...,
        externalLink->{
          openInNewTab,
          "link": externalLink
        },
        link->{
          _type,
          "link": slug.current
        }
      }
    }
  }},
    _type == "ctaText" => {
      ...,
      ctas[]{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current
        },
        externalLink->{
          _id,
          _type,
          externalLink,
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
        },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
        },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
        },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
          },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
        },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
          },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
          },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
        },
          externalLink->{
            _id,
            _type, 
            externalLink,
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

export const homepageModulesFragment = groq`
  "homepageModules": homepageModules[]->{
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
        },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
        },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
        },
          externalLink->{
            _id,
            _type, 
            externalLink,
          }
      }
    },
    _type == "ctaCardGridHome" => {
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
          },
          externalLink->{
            _id,
            _type, 
            externalLink,
          }
        }
      },
      linkList[]{
        ...,
        link->{
          _id,
          _type,
          title,
          "slug": slug.current,
        },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
          },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
        },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
          },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
          },
          externalLink->{
            _id,
            _type, 
            externalLink,
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
        },
          externalLink->{
            _id,
            _type, 
            externalLink,
          }
      }
    }
  }
`
