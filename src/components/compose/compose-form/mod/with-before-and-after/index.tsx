import React from 'react'

export interface WithBeforeAndAfterProps {
  children: React.ReactNode
  before?: React.ReactNode
  after?: React.ReactNode
}

export default function WithBeforeAndAfter(props: WithBeforeAndAfterProps) {
  const { before, after, children } = props

  return (
    <div>
      {before}
      {children}
      {after}
    </div>
  )
}

