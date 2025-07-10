import { RefetchOptions } from '@tanstack/react-query'
import { Search } from 'lucide-react'

import { useTableContext } from '@/contexts/TableContext'

import Spinner from '../loading/Spinner'
import { Button } from '../shadcn/button'

type TTableSearchButton = {
  isFetching?: boolean
  disabled?: boolean
  customText?: string
  onClick?: () => void
  refetch: (options?: RefetchOptions | undefined) => void
}

export default function TableSearchButton({
  isFetching,
  disabled,
  customText,
  onClick,
  refetch,
}: TTableSearchButton) {
  const { filterButtonRef } = useTableContext()

  return (
    <Button
      variant={'action-blue'}
      size={'md'}
      className="flex min-w-fit justify-between gap-3"
      onClick={() => {
        onClick?.()
        refetch()
      }}
      ref={filterButtonRef}
      disabled={isFetching || disabled}
    >
      {isFetching ? (
        <Spinner className="h-6 w-6 fill-white" />
      ) : (
        <Search className="text-white" />
      )}
      <span>{customText || 'Pesquisar'}</span>
    </Button>
  )
}
