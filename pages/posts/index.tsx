// pages/posts/index.tsx
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/posts/page/1',
      permanent: false,
    },
  }
}

export default function PostsIndex() {
  return null
}
