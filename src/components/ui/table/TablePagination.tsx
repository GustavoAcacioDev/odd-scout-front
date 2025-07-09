'use client'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { useTableContext } from '@/contexts/TableContext'

interface ITablePaginationProps {
  className?: string
}

export default function TablePagination({ className }: ITablePaginationProps) {
  const {
    currentPage,
    totalPages,
    isFetchingData,
    handleNextPage,
    handlePrevPage,
    handleFirstPage,
    handleLastPage,
  } = useTableContext()

  const handleFetchNextPage = () => {
    handleNextPage()
  }

  return (
    <div
      className={twMerge(
        'ml-auto flex w-fit items-center justify-between gap-3',
        className,
      )}
    >
      <button
        onClick={handleFirstPage}
        disabled={isFetchingData}
        className="group"
      >
        <ChevronsLeft
          className="text-gray-500 transition-colors group-disabled:opacity-50 hover:text-gray-700"
          strokeWidth={2}
        />
      </button>
      <button
        onClick={handlePrevPage}
        disabled={isFetchingData}
        className="group"
      >
        <ChevronLeft
          className="text-gray-500 transition-colors group-disabled:opacity-50 hover:text-gray-700"
          strokeWidth={2}
        />
      </button>
      <div className="leading-xs rounded border-2 border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700">
        {currentPage} de {totalPages || 1}
      </div>
      <button
        onClick={handleFetchNextPage}
        disabled={isFetchingData}
        className="group"
      >
        <ChevronRight
          strokeWidth={2}
          className="text-gray-500 transition-colors group-disabled:opacity-50 hover:text-gray-700"
        />
      </button>
      <button
        onClick={() => handleLastPage()}
        disabled={isFetchingData}
        className="group"
      >
        <ChevronsRight
          className="text-gray-500 transition-colors group-disabled:opacity-50 hover:text-gray-700"
          strokeWidth={2}
        />
      </button>
    </div>
  )
}
