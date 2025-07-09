'use client'

import { SearchIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { useTableContext } from '@/contexts/TableContext'

import CustomInputWithIcon from '../input/CustomInputWithIcon'

interface ITableFilterInputProps {
  name: string
  placeholder: string
  className?: string
  label?: string
  disabled?: boolean
  type?: 'string' | 'number'
}

export default function TableFilterControlledInput({
  name,
  placeholder,
  label,
  disabled,
  className,
  type = 'string',
}: ITableFilterInputProps) {
  const { handleSetSearchInput, searchInput } = useTableContext()

  function handleChangeNumber(value: string) {
    if (type === 'number') {
      handleSetSearchInput(name, value.replace(/[^0-9]/g, ''))
    }
  }

  return (
    <CustomInputWithIcon
      Icon={<SearchIcon />}
      direction="reverse-row"
      placeholder={placeholder}
      label={label}
      className={twMerge('', className)}
      id={name}
      name={name}
      onChange={(e) =>
        type === 'number'
          ? handleChangeNumber(e.target.value)
          : handleSetSearchInput(name, e.target.value)
      }
      value={searchInput[name]}
      disabled={disabled}
    />
  )
}
