'use client'
import { useTableContext } from '@/contexts/TableContext'
import { TPageSizeOptions } from '@/table-config/table-config'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn/select'

export default function TableSizeSelect() {
  const {
    pageSize,
    currentPage,
    totalItems,
    handleLastPage,
    handleSetPageSize,
  } = useTableContext()

  const handleChange = (size: TPageSizeOptions) => {
    const sizeNumber = +size
    const updatedLastPage = Math.ceil(totalItems! / sizeNumber)

    handleSetPageSize(size)

    if (currentPage > updatedLastPage) {
      handleLastPage(updatedLastPage)
    }
  }

  return (
    <Select defaultValue={String(pageSize)} onValueChange={handleChange}>
      <div className="flex items-center gap-2">
        <span>Exibir: </span>

        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue placeholder="Filtrar" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="5">5 por página</SelectItem>
            <SelectItem value="10">10 por página</SelectItem>
            <SelectItem value="20">20 por página</SelectItem>
          </SelectGroup>
        </SelectContent>
      </div>
    </Select>
  )
}
