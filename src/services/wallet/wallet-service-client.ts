import { fetchAuthClient } from '@/lib/fetchWrapperClient/fetch-auth-client'

import { ApiResponse, ApiResponseList } from '../../../global'

export interface WalletBalance {
  balance: number
  lastUpdated: string
}

export interface BalanceSummary {
  currentBalance: number
  totalDeposits: number
  totalWithdrawals: number
  totalBetsPlaced: number
  totalBetWinnings: number
  netProfitFromBets: number
  lastTransactions: Transaction[]
  summary: {
    totalIn: number
    totalOut: number
    netChange: number
  }
}

export interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'bet' | 'payout' | 'refund'
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  description: string
  createdAt: string
  processedAt?: string
  method?: string
  referenceId?: string
  fee?: number
}

export interface DepositRequest {
  amount: number
  description?: string
  externalReference?: string
}

export interface WithdrawalRequest {
  amount: number
  withdrawalMethod: 'bank-transfer' | 'paypal' | 'crypto'
  accountDetails?: {
    accountNumber?: string
    routingNumber?: string
    paypalEmail?: string
    cryptoAddress?: string
  }
}

export interface TransactionFilters {
  pageNumber?: number
  pageSize?: number
  type?: 'Deposit' | 'Withdrawal' | 'Bet' | 'Payout' | 'Refund'
  status?: 'Pending' | 'Completed' | 'Failed' | 'Cancelled'
  fromDate?: string
  toDate?: string
}

// Get current balance
export function getWalletBalance() {
  const fetch = fetchAuthClient()

  const res = fetch.get<ApiResponse<WalletBalance>>('/balance/current')

  return res
}

// Get balance summary
export function getBalanceSummary() {
  const fetch = fetchAuthClient()

  const res = fetch.get<ApiResponse<BalanceSummary>>('/balance/summary')

  return res
}

// Get transaction history
export function getTransactionHistory(filters?: TransactionFilters) {
  const fetch = fetchAuthClient()

  const queryParams = new URLSearchParams()

  if (filters?.pageNumber)
    queryParams.append('pageNumber', filters.pageNumber.toString())
  if (filters?.pageSize)
    queryParams.append('pageSize', filters.pageSize.toString())
  if (filters?.type) queryParams.append('type', filters.type)
  if (filters?.status) queryParams.append('status', filters.status)
  if (filters?.fromDate) queryParams.append('fromDate', filters.fromDate)
  if (filters?.toDate) queryParams.append('toDate', filters.toDate)

  const res = fetch.get<ApiResponseList<Transaction>>(
    `/balance/transactions?${queryParams.toString()}`,
  )

  return res
}

// Initiate deposit
export function initiateDeposit(data: DepositRequest) {
  const fetch = fetchAuthClient()

  const res = fetch.post<DepositRequest, ApiResponse<any>>(
    '/balance/deposit',
    data,
  )

  return res
}

// Request withdrawal
export function requestWithdrawal(data: WithdrawalRequest) {
  const fetch = fetchAuthClient()

  const res = fetch.post<
    WithdrawalRequest,
    ApiResponse<{
      transactionId: string
      estimatedProcessingTime: string
      fee: number
      netAmount: number
    }>
  >('/wallet/withdraw', data)

  return res
}

// Get specific transaction
export function getTransaction(transactionId: string) {
  const fetch = fetchAuthClient()

  const res = fetch.get<ApiResponse<Transaction>>(
    `/wallet/transactions/${transactionId}`,
  )

  return res
}

// Cancel pending transaction (if supported)
export function cancelTransaction(transactionId: string) {
  const fetch = fetchAuthClient()

  const res = fetch.post<null, ApiResponse<null>>(
    `/wallet/transactions/${transactionId}/cancel`,
    null,
  )

  return res
}
