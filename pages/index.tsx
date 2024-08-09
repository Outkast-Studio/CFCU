import PreviewComponent from 'components/PreviewComponent'
import { readToken } from 'lib/sanity.api'
import { getAllWork, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings, Work, allWorkQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import { QueryParams, SanityDocument } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'
import { useLiveQuery } from 'next-sanity/preview'
import IndexPage from 'components/IndexPage'
interface PageProps extends SharedPageProps {
  work: Work[]
  params: QueryParams
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<Work[]>(props.work, allWorkQuery)
  const { work, draftMode } = props
  //Presentation laye when stable.
  // if (draftMode) {
  //   return (
  //     <PreviewComponent
  //       document={work}
  //       params={props.params}
  //       documentType="index"
  //       query={allWorkQuery}
  //     />
  //   )
  // }

  return <IndexPage work={data} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const work = await getAllWork(client)

  return {
    props: {
      work,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
