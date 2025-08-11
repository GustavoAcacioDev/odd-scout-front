import { useMutation, useQueryClient } from '@tanstack/react-query'

import { placeValueBet } from '@/services/bets/bet-service-client'

import useCustomToast from './use-custom-toast'

export interface PlaceBetData {
  valueBetId: string
  amount: number
}

export function usePlaceBet() {
  const queryClient = useQueryClient()
  const { successToast, errorToast } = useCustomToast()

  return useMutation({
    mutationFn: (data: PlaceBetData) => placeValueBet(data),
    onSuccess: (response) => {
      // Invalidar queries relacionadas após sucesso
      queryClient.invalidateQueries({ queryKey: ['get-available-bets'] })
      queryClient.invalidateQueries({ queryKey: ['get-bets-history'] })
      queryClient.invalidateQueries({ queryKey: ['get-dashboard-metrics'] })

      successToast(
        'Aposta realizada com sucesso!',
        `Aposta de R$ ${response.value.bet.amount.toFixed(2)} confirmada.`,
      )
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        'Erro ao realizar aposta. Tente novamente.'

      errorToast('Erro ao realizar aposta', errorMessage)
    },
  })
}
