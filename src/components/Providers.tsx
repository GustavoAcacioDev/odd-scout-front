'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { LoadingProvider } from '@/contexts/LoadingContext'
import { ResponseDialogProvider } from '@/contexts/ResponseDialogContext'

const queryClient = new QueryClient()

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ResponseDialogProvider>{children}</ResponseDialogProvider>
        </QueryClientProvider>
      </SessionProvider>
    </LoadingProvider>
  )
}

export default Providers
