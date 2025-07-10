import { ColumnDef } from '@tanstack/react-table'

import { TAvaliableBets } from '@/services/bets/bet-service-client'

export const availableBetsColumns: ColumnDef<TAvaliableBets>[] = [
  {
    accessorKey: 'name',
    header: 'Nome do Sorteio',
    cell: (info) => info.getValue(),
    size: 50,
    minSize: 50,
    maxSize: 50,
  },
  {
    accessorKey: 'numberCustomers',
    header: 'Nº de Sorteados',
    cell: (info) => info.getValue(),
    size: 50,
    minSize: 50,
    maxSize: 50,
  },
]
