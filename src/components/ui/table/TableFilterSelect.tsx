import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { useTableContext } from '@/contexts/TableContext'

import SelectUncontrolled, {
  TSelectOptions,
} from '../select/SelectUncontrolled'

interface ITableFilterSelectProps {
  items: TSelectOptions[]
  name: string
  placeholder: string
  defaultValue?: string
  slotOption?: ReactNode
  label?: string
  disabled?: boolean
  className?: string
}

export default function TableFilterSelect({
  items,
  name,
  placeholder,
  defaultValue,
  slotOption,
  label,
  disabled,
  className,
}: ITableFilterSelectProps) {
  const { handleSetSearchInput, searchInput } = useTableContext()

  return (
    <SelectUncontrolled
      items={items}
      name={name}
      placeholder={placeholder}
      slotOption={slotOption}
      value={searchInput[name]}
      label={label}
      disabled={disabled}
      defaultValue={searchInput[name] ?? defaultValue}
      className={twMerge(
        'leading-xs w-[200px] text-xs font-semibold text-gray-800',
        className,
      )}
      onChange={(value) => handleSetSearchInput(name, value)}
    />
  )
}
