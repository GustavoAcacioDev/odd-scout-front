'use client'
import { twMerge } from 'tailwind-merge'

import {
  useResponseDialog,
  useSetResponseDialog,
} from '@/contexts/ResponseDialogContext'

import AlertDialogContent from './AlertDialogContent'
import CustomDialog from './CustomDialog'

export default function ResponseDialog() {
  const { open, content } = useResponseDialog()
  const { closeDialog } = useSetResponseDialog()

  if (!content) return null

  return (
    <CustomDialog
      openDialog={open}
      closeDialog={closeDialog}
      cancelLabel={content?.buttonText || 'Entendi'}
      onOpenChange={closeDialog}
      containerClassName={twMerge(
        'max-w-[95%]',
        content?.status === 'success' && 'md:max-w-[536px]',
      )}
    >
      <AlertDialogContent
        type={content?.status || 'fail'}
        title={content?.title || 'Não conseguimos concluir a operação.'}
      >
        {content?.content}
      </AlertDialogContent>
    </CustomDialog>
  )
}
