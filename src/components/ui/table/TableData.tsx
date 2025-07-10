'use client'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { twMerge } from 'tailwind-merge'

import Spinner from '@/components/ui/loading/Spinner'

import ShowMoreButton from '../button/ShowMoreButton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../shadcn/table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  showData?: boolean
  emptyText?: React.ReactNode
  handleShowData?: () => void
  onClose?: () => void
}

export default function TableData<TData, TValue>({
  columns,
  data,
  isLoading,
  showData = true,
  emptyText = 'Sem resultados.',
  handleShowData,
}: DataTableProps<TData, TValue>) {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table className="h-fit max-h-[80vh]">
      <TableHeader>
        {getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                style={{ width: `${header.getSize()}%` }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="overflow-auto">
        {getRowModel().rows?.length ? (
          getRowModel().rows.map((row) => (
            <TableRow key={row.id} className={twMerge('truncate')}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={twMerge('')}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : isLoading ? (
          <TableRow className="text-center">
            <TableCell colSpan={columns.length} className="text-center">
              <Spinner className="inline fill-gray-700" />
            </TableCell>
          </TableRow>
        ) : showData ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              {emptyText}
            </TableCell>
          </TableRow>
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="p-5 text-center">
              <ShowMoreButton onClick={handleShowData} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
