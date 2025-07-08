'use client'

import {
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'

import { Button } from '../shadcn/button'
import { Dialog, DialogContent } from '../shadcn/dialog'

interface CustomDialogProps {
  children: React.ReactNode
  openDialog: boolean
  cancelLabel?: string
  ActionButton?: React.ReactElement
  Trigger?: React.ReactElement
  dialogAccessibilityDescription?: string
  dialogAccessibilityTitle?: string
  btnContainerDirection?: 'column' | 'row'
  containerClassName?: string
  closeDialog: () => void
  onOpenChange?: (open: boolean) => void
}

export default function CustomDialog({
  children,
  openDialog,
  cancelLabel,
  ActionButton,
  dialogAccessibilityDescription,
  dialogAccessibilityTitle,
  Trigger,
  btnContainerDirection,
  containerClassName,
  closeDialog,
  onOpenChange,
}: CustomDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      {Trigger ? <DialogTrigger asChild>{Trigger}</DialogTrigger> : null}

      <DialogContent
        className={twMerge(
          'grid max-w-[90%] grid-rows-1fr-auto gap-0 overflow-hidden md:max-w-[450px]',
          containerClassName,
        )}
      >
        <DialogTitle className="hidden">
          {dialogAccessibilityTitle || ''}
        </DialogTitle>
        <DialogDescription className="hidden">
          {dialogAccessibilityDescription || ''}
        </DialogDescription>

        <section className="flex items-center justify-center overflow-auto p-6">
          {children}
        </section>

        <footer
          className={twMerge(
            'flex flex-col-reverse gap-4 border-t-[1px] border-gray-300 p-6 md:flex-row md:items-center md:justify-center',
            ActionButton && 'w-full justify-between',
            btnContainerDirection === 'column' && 'flex-col-reverse gap-4',
          )}
        >
          <Button
            variant={'outline'}
            onClick={closeDialog}
            className={twMerge(
              '',
              btnContainerDirection === 'column' && 'w-full',
            )}
          >
            {cancelLabel || 'Fechar'}
          </Button>
          {ActionButton && ActionButton}
        </footer>
      </DialogContent>
    </Dialog>
  )
}
