'use client'

import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn/select'

export type TSelectOptions = {
  id?: string | number
  value: string
  content: string
}

export default function SelectUncontrolled({
  name,
  items,
  slotOption,
  placeholder,
  className,
  defaultValue,
  containerClassName,
  optionsClassName,
  side,
  value,
  label,
  disabled,
  onChange,
}: {
  name?: string | number
  items: TSelectOptions[]
  slotOption?: ReactNode
  placeholder: string
  className?: string
  value?: string
  defaultValue?: string
  side?: 'left' | 'right' | 'top' | 'bottom'
  containerClassName?: string
  optionsClassName?: string
  onChange?: (value: string) => void
  disabled?: boolean
  label?: string
}) {
  const [currentValue, setCurrentValue] = React.useState(defaultValue)

  function handleChange(value: string) {
    setCurrentValue(value)

    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex w-full items-center justify-between">
          <label className="leading-sm text-sm font-semibold text-gray-700">
            {label}
          </label>
        </div>
      )}
      <Select
        key={name}
        defaultValue={currentValue}
        value={value}
        onValueChange={handleChange}
      >
        <SelectTrigger
          disabled={disabled}
          className={twMerge('max-h-12 w-full text-gray-700', className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          side={side}
          className={twMerge(
            'z-[1000] h-40 min-h-20',
            items && 'h-fit',
            containerClassName,
          )}
        >
          {slotOption && slotOption}
          {items.map((item, index) => (
            <SelectItem
              value={item.value}
              key={(item.id || item.value) + index.toString()}
              className={optionsClassName}
            >
              {item.content}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
