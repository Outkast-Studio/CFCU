import type React from 'react'
// Add this to your existing TextDecorators.tsx file
export const Highlight = ({ children }: { children: React.ReactNode }) => {
  return <span style={{ color: '#F56600' }}>{children}</span>
}
