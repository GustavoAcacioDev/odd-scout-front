'use client'

import {
  createContext,
  createRef,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

import {
  INITIAL_PAGE_SIZE,
  TPageSizeOptions,
} from '@/table-config/table-config'

type TSearchInput = Record<string, string>

type TTableContext = {
  currentPage: number
  hasNextPage: boolean
  totalItems: number | null
  totalPages: number
  selectedIds: number[]
  isFetchingData: boolean
  isAnyItemSelected: boolean
  isAllItemsSelected: boolean
  searchInput: TSearchInput
  pageSize: TPageSizeOptions
  filterButtonRef: React.MutableRefObject<HTMLButtonElement | null>
  handleClearSearchInput: (name?: string, excludeFields?: string[]) => void
  handleNextPage: () => void
  handlePrevPage: () => void
  handleFirstPage: () => void
  handleLastPage: (lastPage?: number) => void
  handleUpdateSelectedId: (id: number, mode: 'sum' | 'minus') => void
  handleClearSelectedIds: () => void
  handleSetIsFetchingData: (value: boolean) => void
  handleSetIsAnyItemSelected: (value: boolean) => void
  handleSetIsAllItemsSelected: (value: boolean) => void
  handleSetPageSize: (size: TPageSizeOptions) => void
  handleSetSearchInput: (name: string, value: string) => void
  handleSetTotalItems: (total: number) => void
  handleInputOnEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const TableContext = createContext({} as TTableContext)

const filterButtonRef = createRef<HTMLButtonElement>()

export function TableProvider({
  children,
  inputDefaultValues = {},
  initialTotalItems,
}: {
  children: ReactNode
  inputDefaultValues?: TSearchInput
  initialTotalItems?: number
}) {
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<TPageSizeOptions>(INITIAL_PAGE_SIZE)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState<number>(initialTotalItems || 0)
  const totalPages = Math.ceil(totalItems / +pageSize)
  const [hasNextPage, setHasNextPage] = useState<boolean>(
    currentPage < totalPages,
  )
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isAllItemsSelected, setIsAllItemsSelected] = useState<boolean>(false)
  const [isAnyItemSelected, setIsAnyItemSelected] = useState<boolean>(false)
  const [searchInput, setSearchInput] =
    useState<TSearchInput>(inputDefaultValues)

  const handleSetSearchInput = useCallback((name: string, value: string) => {
    setSearchInput((prev) => ({ ...prev, [name]: value }))
    setCurrentPage(1)
  }, [])

  const handleClearSearchInput = useCallback(
    (name?: string, excludeFields?: string[]) => {
      setSearchInput((prev) => {
        if (name) {
          // Limpa apenas o campo específico
          return { ...prev, [name]: '' }
        } else {
          // Limpa todos os campos
          const clearedInputs = Object.keys(prev).reduce(
            (acc, key) => {
              if (
                excludeFields &&
                excludeFields.length > 0 &&
                excludeFields.includes(key)
              ) {
                acc[key] = prev[key]
                return acc
              }

              acc[key] = ''
              return acc
            },
            {} as typeof prev,
          )
          return clearedInputs
        }
      })
      setCurrentPage(1)
    },
    [],
  )

  const handleSetIsFetchingData = useCallback((value: boolean) => {
    setIsFetchingData(value)
  }, [])

  const handleSetPageSize = useCallback((size: TPageSizeOptions) => {
    setPageSize(size)
  }, [])

  const handleSetTotalItems = useCallback((total: number) => {
    setTotalItems(total)
  }, [])

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev >= totalPages ? totalPages : prev + 1))
    setHasNextPage(currentPage + 1 < totalPages)
  }, [currentPage, totalPages])

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => (prev === 1 ? 1 : prev - 1))
    setHasNextPage(true)
  }, [])

  const handleFirstPage = useCallback(() => {
    setCurrentPage(1)
    setHasNextPage(totalPages > 1)
  }, [totalPages])

  const handleLastPage = useCallback(
    (lastPage?: number) => {
      setCurrentPage(lastPage || totalPages)
      setHasNextPage(false)
    },
    [totalPages],
  )

  const handleUpdateSelectedId = useCallback(
    (id: number, mode: 'sum' | 'minus') => {
      setSelectedIds((prevIds) => {
        if (mode === 'sum') {
          // Adiciona o ID se ele ainda não estiver no array
          return prevIds.includes(id) ? prevIds : [...prevIds, id]
        } else if (mode === 'minus') {
          // Remove o ID se ele estiver no array
          return prevIds.filter((selectedId) => selectedId !== id)
        }
        return prevIds // Retorna o estado atual se o modo for inválido
      })
    },
    [],
  )

  const handleClearSelectedIds = useCallback(() => {
    setSelectedIds([])
  }, [])

  const handleSetIsAnyItemSelected = useCallback((value: boolean) => {
    setIsAnyItemSelected(value)
  }, [])

  const handleSetIsAllItemsSelected = useCallback((value: boolean) => {
    setIsAllItemsSelected(value)
  }, [])

  const handleInputOnEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!filterButtonRef.current) return

      if (event.key === 'Enter') {
        filterButtonRef.current?.click()
      }
    },
    [],
  )

  return (
    <TableContext.Provider
      value={{
        currentPage,
        hasNextPage,
        searchInput,
        totalItems,
        totalPages,
        pageSize,
        selectedIds,
        isFetchingData,
        isAllItemsSelected,
        isAnyItemSelected,
        filterButtonRef,
        handleClearSearchInput,
        handleFirstPage,
        handleLastPage,
        handleNextPage,
        handlePrevPage,
        handleSetIsFetchingData,
        handleSetIsAnyItemSelected,
        handleSetIsAllItemsSelected,
        handleSetPageSize,
        handleUpdateSelectedId,
        handleClearSelectedIds,
        handleSetSearchInput,
        handleSetTotalItems,
        handleInputOnEnter,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export const useTableContext = () => useContext(TableContext)
