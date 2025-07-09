'use client'

import { twMerge } from 'tailwind-merge'

import { useTableContext } from '@/contexts/TableContext'

interface ITableEntriesProps {
  className?: string
  alternateText?: string
}

export default function TableEntries({
  className,
  alternateText,
}: ITableEntriesProps) {
  const { totalItems } = useTableContext()

  return (
    <span
      className={twMerge(
        'leading-xs text-xs font-semibold text-gray-500 italic',
        className,
      )}
    >
      {!totalItems ? 0 : totalItems} {alternateText || 'resultados encontrados'}
    </span>
  )
}
