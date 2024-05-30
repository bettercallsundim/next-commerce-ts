import React from 'react'

type Props = {
  children:React.ReactNode
}

const Container = ({children}: Props) => {
  return (
    <div className="container mx-auto py-4 px-8">{children}</div>
  )
}

export default Container