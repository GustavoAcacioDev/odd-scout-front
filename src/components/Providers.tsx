import React from 'react'

import { LoadingProvider } from '@/contexts/LoadingContext'
import { ResponseDialogProvider } from '@/contexts/ResponseDialogContext'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <ResponseDialogProvider>{children}</ResponseDialogProvider>
    </LoadingProvider>
  )
}

export default Providers
