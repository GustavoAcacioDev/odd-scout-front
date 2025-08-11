'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  DollarSign,
} from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/shadcn/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/shadcn/dialog'
import { Input } from '@/components/ui/shadcn/input'
import { Label } from '@/components/ui/shadcn/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select'
import useCustomToast from '@/hooks/use-custom-toast'
import {
  getWalletBalance,
  initiateDeposit,
  requestWithdrawal,
} from '@/services/wallet/wallet-service-client'
import { formatCurrency } from '@/utils/format'

export default function WalletActions() {
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [withdrawMethod, setWithdrawMethod] = useState('')
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false)
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false)

  const { successToast, errorToast } = useCustomToast()
  const queryClient = useQueryClient()

  const { data: walletData } = useQuery({
    queryKey: ['wallet-balance'],
    queryFn: getWalletBalance,
    refetchInterval: 30000,
  })

  const depositMutation = useMutation({
    mutationFn: initiateDeposit,
    onSuccess: (data) => {
      successToast('success', 'Deposit initiated successfully!')
      queryClient.invalidateQueries({ queryKey: ['wallet-balance'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-transactions'] })
      setDepositAmount('')
      setPaymentMethod('')
      setIsDepositDialogOpen(false)

      // If there's a payment URL, open it
      if (data.value?.paymentUrl) {
        window.open(data.value.paymentUrl, '_blank')
      }
    },
    onError: (error: any) => {
      errorToast('error', error?.message || 'Failed to initiate deposit')
    },
  })

  const withdrawMutation = useMutation({
    mutationFn: requestWithdrawal,
    onSuccess: (data) => {
      successToast(
        'success',
        `Withdrawal request submitted! Processing time: ${data.value?.estimatedProcessingTime || 'Unknown'}`,
      )
      queryClient.invalidateQueries({ queryKey: ['wallet-balance'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-transactions'] })
      setWithdrawAmount('')
      setWithdrawMethod('')
      setIsWithdrawDialogOpen(false)
    },
    onError: (error: any) => {
      errorToast('error', error?.message || 'Failed to request withdrawal')
    },
  })

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount)
    if (amount < 10) {
      errorToast('error', 'Minimum deposit amount is $10.00')
    }
  }

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount)
    const availableBalance = 0

    if (amount < 25) {
      errorToast('error', 'Minimum withdrawal amount is $25.00')
      return
    }

    if (amount > availableBalance) {
      errorToast('error', 'Insufficient balance for withdrawal')
      return
    }

    withdrawMutation.mutate({
      amount,
      withdrawalMethod: withdrawMethod as any,
    })
  }

  const availableBalance = walletData?.value?.availableBalance || 0

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Deposit Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDownLeft className="h-5 w-5 text-green-600" />
            Deposit Funds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm">
            Add money to your wallet to start betting on value opportunities.
          </p>

          <Dialog
            open={isDepositDialogOpen}
            onOpenChange={setIsDepositDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Make Deposit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Deposit Funds</DialogTitle>
                <DialogDescription>
                  Choose your preferred payment method and enter the amount to
                  deposit.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="deposit-amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      id="deposit-amount"
                      type="number"
                      placeholder="100.00"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="pl-10"
                      min="10"
                      step="10"
                    />
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Minimum deposit: $10.00
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">
                        Credit/Debit Card
                      </SelectItem>
                      <SelectItem value="bank-transfer">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[50, 100, 250, 500].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setDepositAmount(amount.toString())}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button
                  onClick={handleDeposit}
                  disabled={
                    !depositAmount ||
                    !paymentMethod ||
                    parseFloat(depositAmount) < 10 ||
                    depositMutation.isPending
                  }
                  className="w-full"
                >
                  {depositMutation.isPending
                    ? 'Processing...'
                    : `Deposit ${depositAmount ? formatCurrency(parseFloat(depositAmount)) : '$0.00'}`}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Withdraw Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-blue-600" />
            Withdraw Funds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm">
            Transfer your winnings back to your preferred payment method.
          </p>

          <Dialog
            open={isWithdrawDialogOpen}
            onOpenChange={setIsWithdrawDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <DollarSign className="mr-2 h-4 w-4" />
                Request Withdrawal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Withdraw Funds</DialogTitle>
                <DialogDescription>
                  Enter the amount you want to withdraw from your available
                  balance.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-sm font-medium">Available Balance</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(availableBalance)}
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="withdraw-amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      id="withdraw-amount"
                      type="number"
                      placeholder="50.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="pl-10"
                      min="25"
                      max={availableBalance.toString()}
                      step="25"
                    />
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Minimum withdrawal: $25.00
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="withdraw-method">Withdrawal Method</Label>
                  <Select
                    value={withdrawMethod}
                    onValueChange={setWithdrawMethod}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select withdrawal method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank-transfer">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Processing Time Info */}
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-600">
                    <strong>Processing Time:</strong> Bank transfers typically
                    take 1-3 business days. PayPal and crypto withdrawals are
                    usually processed within 24 hours.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  onClick={handleWithdraw}
                  disabled={
                    !withdrawAmount ||
                    !withdrawMethod ||
                    parseFloat(withdrawAmount) < 25 ||
                    parseFloat(withdrawAmount) > availableBalance ||
                    withdrawMutation.isPending
                  }
                  className="w-full"
                  variant="outline"
                >
                  {withdrawMutation.isPending
                    ? 'Processing...'
                    : `Withdraw ${withdrawAmount ? formatCurrency(parseFloat(withdrawAmount)) : '$0.00'}`}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}
