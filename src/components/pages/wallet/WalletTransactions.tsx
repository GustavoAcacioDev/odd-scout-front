'use client'

import { useQuery } from '@tanstack/react-query'
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Search,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/shadcn/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card'
import { Input } from '@/components/ui/shadcn/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select'
import { getTransactionHistory } from '@/services/wallet/wallet-service-client'
import { formatCurrency } from '@/utils/format'

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'bet' | 'payout'
  amount: number
  status: 'pending' | 'completed' | 'failed'
  description: string
  createdAt: string
  method?: string
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 500.0,
    status: 'completed',
    description: 'Deposit via Credit Card',
    createdAt: '2024-01-15T10:30:00Z',
    method: 'Credit Card',
  },
  {
    id: '2',
    type: 'bet',
    amount: -50.0,
    status: 'completed',
    description: 'Bet: Real Madrid vs Barcelona',
    createdAt: '2024-01-15T14:45:00Z',
  },
  {
    id: '3',
    type: 'payout',
    amount: 107.5,
    status: 'completed',
    description: 'Payout: Real Madrid vs Barcelona',
    createdAt: '2024-01-16T18:00:00Z',
  },
  {
    id: '4',
    type: 'withdrawal',
    amount: -200.0,
    status: 'pending',
    description: 'Withdrawal to Bank Account',
    createdAt: '2024-01-17T09:15:00Z',
    method: 'Bank Transfer',
  },
  {
    id: '5',
    type: 'bet',
    amount: -75.0,
    status: 'completed',
    description: 'Bet: Liverpool vs Man City',
    createdAt: '2024-01-17T16:20:00Z',
  },
  {
    id: '6',
    type: 'deposit',
    amount: 250.0,
    status: 'failed',
    description: 'Deposit via PayPal',
    createdAt: '2024-01-18T11:00:00Z',
    method: 'PayPal',
  },
]

export default function WalletTransactions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')

  const { data: transactionsData, isLoading } = useQuery({
    queryKey: ['wallet-transactions', typeFilter, statusFilter],
    queryFn: () =>
      getTransactionHistory({
        pageNumber: 1,
        pageSize: 50,
        type: typeFilter as any,
        status: statusFilter as any,
      }),
    refetchInterval: 30000,
  })

  const transactions = transactionsData?.items || mockTransactions

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      return matchesSearch
    })
  }, [searchTerm, transactions])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'payout':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />
      case 'withdrawal':
      case 'bet':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case 'failed':
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  const getAmountColor = (amount: number) => {
    return amount > 0 ? 'text-green-600' : 'text-red-600'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>

        {/* Filters */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Types</SelectItem>
              <SelectItem value="Deposit">Deposits</SelectItem>
              <SelectItem value="Withdrawal">Withdrawals</SelectItem>
              <SelectItem value="Bet">Bets</SelectItem>
              <SelectItem value="Payout">Payouts</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Status</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="py-8 text-center">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-16 rounded bg-gray-200"></div>
                ))}
              </div>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              No transactions found matching your criteria.
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getTransactionIcon(transaction.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString()}{' '}
                        at{' '}
                        {new Date(transaction.createdAt).toLocaleTimeString(
                          [],
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )}
                      </p>
                      {transaction.method && (
                        <>
                          <span className="text-xs text-gray-300">•</span>
                          <p className="text-xs text-gray-500">
                            {transaction.method}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {getStatusBadge(transaction.status)}
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${getAmountColor(transaction.amount)}`}
                    >
                      {transaction.amount > 0 ? '+' : ''}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredTransactions.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Showing {filteredTransactions.length} of {transactions.length}{' '}
              transactions
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
