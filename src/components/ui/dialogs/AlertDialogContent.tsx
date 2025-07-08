'use client'

import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { LottieSuccessCheck } from '@/assets/lottie-animations'
import { error, warning } from '@/assets/svg'

type TAlertDialogContentProps = {
  children: React.ReactNode
  type: 'success' | 'fail' | 'warning'
  title: string
}

export default function AlertDialogContent({
  children,
  type,
  title,
}: TAlertDialogContentProps) {
  const isNode = typeof children === 'object'

  function renderHeader() {
    switch (type) {
      case 'success':
        return (
          <Image
            src={LottieSuccessCheck}
            alt="Operação concluída"
            width={240}
            height={240}
          />
        )
      case 'fail':
        return <Image src={error} alt="" />
      case 'warning':
        return <Image src={warning} alt="" />
      default:
        return null
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      {renderHeader()}
      {
        <h1
          className={twMerge(
            'text-xl font-bold leading-6',
            type === 'success' && 'text-gray-800',
            type === 'fail' && 'text-negativePure',
            type === 'warning' && 'text-gray-800',
          )}
        >
          {title}
        </h1>
      }
      {isNode ? (
        children
      ) : (
        <p className="paragraph-primary w-full break-words">{children}</p>
      )}
    </div>
  )
}
