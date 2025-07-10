'use client'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

import { useSetResponseDialog } from '@/contexts/ResponseDialogContext'
import { createLog } from '@/services/general/log-service-client'
import { TFormSubmitHandler } from '@/types/form-submit'

import useCustomToast from './use-custom-toast'

interface ValidationErrors {
  [fieldName: string]: string[]
}

function mapValidationErrors(errors: ValidationErrors): Map<number, string[]> {
  const errorMap = new Map<number, string[]>()

  Object.entries(errors).forEach(([_, messages], index) => {
    errorMap.set(index, messages)
  })

  return errorMap
}

export function useFormSubmitHandler() {
  const { successToast } = useCustomToast()
  const { openDialog } = useSetResponseDialog()
  const pathname = usePathname()

  const onSubmitHandler = useCallback(
    async function onSubmitHandler<TData, TResponse>({
      data,
      service,
      options,
    }: TFormSubmitHandler<TData, TResponse>) {
      const toastSuccessTitle = options.onSuccessMessage?.title || 'Sucesso'
      const toastSuccessMessage =
        options.onSuccessMessage?.message || 'Operação efetuada com sucesso!'

      const onFailureDialogTitle =
        options.onFailureMessage?.title || 'Algo deu errado'
      const onFailureDialogMessage = options.onFailureMessage?.message

      const onCatchDialogTitle =
        options.onCatchMessage?.dialog?.title || 'Algo deu errado'
      const onCatchDialogMessage =
        options.onCatchMessage?.dialog?.message ||
        'Não foi possível executar a operação. Por favor tente novamente mais tarde.'

      const onCatchLog =
        options.onCatchMessage?.log ||
        `Error on ${options.onCatchMessage.log?.path || ''}`

      try {
        const res = await service(data)

        if (res.isSuccess) {
          if (!options.onSuccessMessage?.disableToast) {
            successToast(toastSuccessTitle, toastSuccessMessage)
          }

          if (options.onSuccessCb) {
            options.onSuccessCb(res)
          }
        } else {
          openDialog({
            status: options.onFailureMessage?.status || 'fail',
            title: onFailureDialogTitle,
            content: onFailureDialogMessage || res.errors[0],
          })

          if (options.onFailureCb) {
            options.onFailureCb(res)
          }
        }
      } catch (error) {
        const objError = error as Error
        const errorMessage = JSON.parse(objError.message)
        const errorCause = JSON.parse(errorMessage.error).errors
        console.log(errorCause)
        const errorDetail = JSON.parse(errorMessage.error).detail
        const errorMappedResponse =
          (mapValidationErrors(errorCause || [{ '': [errorDetail] }]).get(
            0,
          ) || [''])[0] || errorDetail

        if (onCatchLog) {
          console.error(onCatchLog, error)
        }

        createLog({
          block:
            options.onCatchMessage.logService?.block ||
            'Catch of onSubmitHandler',
          component:
            options.onCatchMessage.logService?.component ||
            'useFormSubmitHandler',
          error: objError.message,
          route: pathname,
        })

        openDialog({
          status: options.onCatchMessage.dialog?.status || 'fail',
          title: onCatchDialogTitle,
          content: errorMappedResponse || onCatchDialogMessage,
        })

        if (options.onCatchCb) {
          options.onCatchCb(error as Error)
        }
      }
    },
    [pathname, openDialog, successToast],
  )

  return { onSubmitHandler }
}
