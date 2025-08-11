'use client'

import { useQuery } from '@tanstack/react-query'
import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card'
import {
  getBalanceSummary,
  getWalletBalance,
} from '@/services/wallet/wallet-service-client'
import { formatCurrency } from '@/utils/format'

export default function WalletBalance() {
  const { data: balanceSummary, isLoading: isLoadingStats } = useQuery({
    queryKey: ['balance-summary'],
    queryFn: getBalanceSummary,
    refetchInterval: 30000,
  })

  const { data: walletData, isLoading: isLoadingWallet } = useQuery({
    queryKey: ['wallet-balance'],
    queryFn: getWalletBalance,
    refetchInterval: 30000,
  })

  const isLoading = isLoadingStats || isLoadingWallet

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="mb-2 h-4 w-1/2 rounded bg-gray-200"></div>
                <div className="h-8 w-3/4 rounded bg-gray-200"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const netProfit = balanceSummary?.value?.netProfitFromBets || 0
  const profitColor = netProfit >= 0 ? 'text-green-600' : 'text-red-600'
  const profitIcon = netProfit >= 0 ? TrendingUp : TrendingDown

  // Use real wallet data from balance summary
  const currentBalance =
    balanceSummary?.value?.currentBalance || walletData?.value?.balance || 0
  const totalDeposits = balanceSummary?.value?.totalDeposits || 0
  const totalWithdrawals = balanceSummary?.value?.totalWithdrawals || 0

  return (
    <div className="space-y-6">
      {/* Main Balance Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-blue-100">Current Balance</p>
              <p className="text-3xl font-bold">
                {formatCurrency(currentBalance)}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-100">Total Deposits</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(totalDeposits)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-100">Total Withdrawals</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(totalWithdrawals)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Profit/Loss
            </CardTitle>
            {React.createElement(profitIcon, {
              className: `h-4 w-4 ${profitColor}`,
            })}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${profitColor}`}>
              {netProfit >= 0 ? '+' : ''}
              {formatCurrency(netProfit)}
            </div>
            <p className="text-muted-foreground text-xs">
              Net profit from bets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bets Placed
            </CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(balanceSummary?.value?.totalBetsPlaced || 0)}
            </div>
            <p className="text-muted-foreground text-xs">
              Lifetime betting volume
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Winnings
            </CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(balanceSummary?.value?.totalBetWinnings || 0)}
            </div>
            <p className="text-muted-foreground text-xs">
              Total winnings from bets
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
