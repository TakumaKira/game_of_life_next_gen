import React from 'react'

export default function Scrollable({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      Scrollable
    </>
  )
}