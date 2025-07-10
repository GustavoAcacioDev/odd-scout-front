'use client'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ICustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: {
    hasError: boolean
    message: string
  }
  Icon: React.ReactElement
  direction?: 'row' | 'reverse-row'
  label?: string
}

export default function CustomInputWithIcon({
  error,
  Icon,
  direction,
  className,
  label,
  ...props
}: ICustomInputProps) {
  const isReverse = direction === 'reverse-row'

  return (
    <div className={twMerge('flex flex-col justify-between gap-3', className)}>
      {label && (
        <label
          htmlFor={props.id}
          className="leading-sm text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          className={twMerge(
            'h-12 w-full rounded-lg border-[1px] border-gray-400 px-4 py-3 text-gray-800 placeholder:text-sm placeholder:text-gray-500 focus:outline-gray-800 disabled:bg-gray-100',
            error?.hasError && 'border-red-500',
            isReverse ? 'pl-12' : 'pr-10',
          )}
          onChange={props.onChange}
        />

        <span
          className={twMerge(
            'absolute inset-y-0 flex items-center px-4',
            isReverse ? 'left-0' : 'right-0',
          )}
        >
          {Icon}
        </span>
      </div>

      {error?.hasError && (
        <span className="text-sm text-red-500">{error.message}</span>
      )}
    </div>
  )
}
