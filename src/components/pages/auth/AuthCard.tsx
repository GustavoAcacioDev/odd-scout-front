import React from 'react'

function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6 p-4">
      {children}
    </div>
  )
}

export default AuthCard
