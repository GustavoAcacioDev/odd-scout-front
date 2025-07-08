'use client'

import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

export type TOpenDialogStatus = 'fail' | 'warning' | 'success'

export type TOpenDialogData = {
  content: React.ReactNode
  status: TOpenDialogStatus
  title?: string
  buttonText?: string
} | null

type TResponseDialogContext = {
  open: boolean
  content: TOpenDialogData
}

type TSetResponseDialogContext = {
  openDialog: (contentObj: TOpenDialogData) => void
  closeDialog: () => void
}

const ResponseDialogContext = createContext({} as TResponseDialogContext)
const SetResponseDialogContext = createContext({} as TSetResponseDialogContext)

interface ResponseDialogProviderProps {
  children: ReactNode
}

export function ResponseDialogProvider({
  children,
}: ResponseDialogProviderProps) {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState<TOpenDialogData>(null)

  const openDialog = (contentObj: TOpenDialogData) => {
    setOpen(true)
    setContent(contentObj)
  }

  const closeDialog = () => {
    setOpen(false)

    setTimeout(() => {
      setContent(null)
    }, 300)
  }

  const contextValue = useMemo(
    () => ({
      open,
      content,
    }),
    [open, content],
  )

  const contextSetters = useMemo(
    () => ({
      openDialog,
      closeDialog,
    }),
    [],
  )

  return (
    <SetResponseDialogContext.Provider value={contextSetters}>
      <ResponseDialogContext.Provider value={contextValue}>
        {children}
      </ResponseDialogContext.Provider>
    </SetResponseDialogContext.Provider>
  )
}

export const useResponseDialog = () => {
  const context = useContext(ResponseDialogContext)

  if (!context) {
    throw new Error(
      'useResponseDialogContext must be used within a ResponseDialogProvider',
    )
  }

  return context
}

export const useSetResponseDialog = () => {
  const context = useContext(SetResponseDialogContext)

  if (!context) {
    throw new Error(
      'useSetResponseDialogContext must be used within a ResponseDialogProvider',
    )
  }

  return context
}
