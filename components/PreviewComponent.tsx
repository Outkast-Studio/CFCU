import { QueryParams, SanityDocument } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import Work from './Work'
import IndexPage from './IndexPage'
import Alert from './AlertBanner'

export default function PreviewComponent({
  document,
  params,
  query,
  documentType,
}: {
  document: any
  params: QueryParams
  query: string
  documentType: string
}) {
  const [data] = useLiveQuery(document, query, params)
  //This is for the presentation layer.
  switch (documentType) {
    case 'work':
      return (
        <>
          <Alert />
          <Work work={data} />
        </>
      )
    case 'index':
      return (
        <>
          <Alert />
          <IndexPage work={data} />
        </>
      )
    default:
      return <></>
  }
}
