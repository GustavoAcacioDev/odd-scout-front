'use client'

import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type TLoadingContext = {
  isLoadingWithTransition: boolean
}

type TSetterLoadingContext = {
  startLoading: () => void
  endLoading: () => void
}

const LoadingContext = createContext({} as TLoadingContext)
const SetterLoadingContext = createContext({} as TSetterLoadingContext)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoadingWithTransition, setIsLoading] = useState(false)

  function startLoading() {
    setIsLoading(true)
  }

  function endLoading() {
    setIsLoading(false)
  }

  const LoadingContextValue = useMemo(
    () => ({ isLoadingWithTransition }),
    [isLoadingWithTransition],
  )

  const SetterLoadingContextValue = useMemo(
    () => ({ startLoading, endLoading }),
    [],
  )

  return (
    <SetterLoadingContext.Provider value={SetterLoadingContextValue}>
      <LoadingContext.Provider value={LoadingContextValue}>
        {children}
      </LoadingContext.Provider>
    </SetterLoadingContext.Provider>
  )
}

export const useLoadingContext = () => useContext(LoadingContext)

export const useSetterLoadingContext = () => {
  const context = useContext(SetterLoadingContext)

  if (!context) {
    throw new Error(
      'useSetterLoadingContext must be used within a LoadingProvider',
    )
  }

  return context
}
