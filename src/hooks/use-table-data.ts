import {
  keepPreviousData,
  UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { useTableContext } from '@/contexts/TableContext'

interface UseTableDataProps<T> {
  queryKey: (string | number)[]
  queryFn: () => Promise<any>
  sideEffectCb?: () => void
  enabled?: boolean
  searchParams?: Record<string, string>
  extractItems?: (data: any) => T[]
  extractTotal?: (data: any) => number
  lengthAsTotal?: boolean
  options?: Omit<
    UndefinedInitialDataOptions<any, Error, any, (string | number)[]>,
    'queryKey' | 'queryFn' | 'enabled' | 'placeholderData'
  >
}

function useTableData<T>({
  queryKey,
  queryFn,
  enabled = true,
  searchParams = {},
  sideEffectCb,
  extractItems = (data: any) => data.items,
  extractTotal = (data: any) => data.total,
  lengthAsTotal,
  options,
}: UseTableDataProps<T>) {
  const {
    currentPage,
    pageSize,
    handleSetTotalItems,
    handleSetIsFetchingData,
  } = useTableContext()

  const [apiError, setApiError] = useState('')

  const { data, isLoading, isFetching, status, error, refetch } = useQuery({
    queryKey: [
      ...queryKey,
      currentPage,
      pageSize,
      ...Object.values(searchParams),
    ],
    queryFn,
    enabled,
    placeholderData: keepPreviousData,
    ...options,
  })

  const items = useMemo(() => {
    if (!data) return []

    return extractItems(data)
  }, [data, extractItems])

  useEffect(() => {
    if (status === 'success' && data) {
      if (data?.isSuccess === false) {
        setApiError(data?.errors[0] || '')
      }

      handleSetIsFetchingData(isFetching)
      handleSetTotalItems(lengthAsTotal ? items.length : extractTotal(data))
      sideEffectCb?.()
    }
  }, [
    status,
    data,
    items,
    isFetching,
    lengthAsTotal,
    handleSetIsFetchingData,
    handleSetTotalItems,
    extractTotal,
    sideEffectCb,
  ])

  return {
    items,
    isLoading,
    isFetching,
    error,
    apiError,
    refetch,
  }
}

export default useTableData
