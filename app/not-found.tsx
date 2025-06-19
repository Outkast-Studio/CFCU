// app/not-found.tsx
import { redirect } from 'next/navigation'

export default function NotFound() {
  // Redirect to your Pages Router 404
  redirect('/404')
}
