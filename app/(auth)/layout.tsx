import Logo from '@/components/logo'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function layout({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
    <Logo />
    {children}
  </div>
  )
}

export default layout