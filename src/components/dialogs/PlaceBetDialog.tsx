"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { TAvaliableBets } from "@/services/bets/bet-service-client";
import { renderBestOutcome } from "@/utils/bet-utils";
import {
  ExternalLink,
  TrendingUp,
  Calculator,
  AlertCircle,
} from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { usePlaceBet } from "@/hooks/use-place-bet";

interface PlaceBetDialogProps {
  betData: TAvaliableBets;
}

export default function PlaceBetDialog({ betData }: PlaceBetDialogProps) {
  const [open, setOpen] = useState(false);
  const [betAmount, setBetAmount] = useState<string>("");
  const { mutate: placeBet, isPending } = usePlaceBet();

  const recommendedBet = useMemo(() => {
    const b = betData.betbyOdd - 1;
    const p = betData.impliedProbability;
    const q = 1 - p;

    const kellyFraction = (b * p - q) / b;

    const conservativeKelly = Math.min(kellyFraction, 0.25);

    const defaultBankroll = 1000;
    const recommendedAmount = defaultBankroll * conservativeKelly;

    return recommendedAmount;
  }, [betData]);

  const potentialReturn = useMemo(() => {
    const amount = parseFloat(betAmount) || 0;
    return amount * betData.betbyOdd;
  }, [betAmount, betData.betbyOdd]);

  const potentialProfit = useMemo(() => {
    const amount = parseFloat(betAmount) || 0;
    return potentialReturn - amount;
  }, [potentialReturn, betAmount]);

  const handlePlaceBet = () => {
    const amount = parseFloat(betAmount);
    if (amount <= 0) return;

    placeBet(
      {
        valueBetId: betData.id,
        amount: amount,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setBetAmount("");
        },
      },
    );
  };

  const handleOpenBetPage = () => {
    window.open(
      process.env.NEXT_PUBLIC__BET_HOUSE_URL + betData.link,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const isValidAmount = parseFloat(betAmount) > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Place Bet</Button>
      </DialogTrigger>
      <DialogContent className="p-6 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Realizar Aposta</DialogTitle>
          <DialogDescription>
            Revise os detalhes da aposta antes de prosseguir
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full gap-6 py-4">
          {/* Informações do Evento */}
          <div className="grid gap-2">
            <Label className="text-sm text-gray-500">Evento</Label>
            <div className="font-medium">
              {betData.team1} vs {betData.team2}
            </div>
            <div className="text-sm text-gray-500">{betData.league}</div>
          </div>

          {/* Recomendação */}
          <div className="grid gap-2">
            <Label className="text-sm text-gray-500">Recomendação</Label>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-medium">
                {renderBestOutcome(betData.bestOutcome)}
              </span>
              <span className="text-sm text-gray-500">
                @ {betData.betbyOdd.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid w-full grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4">
            <div className="text-center">
              <div className="text-sm text-gray-500">EV</div>
              <div className="font-semibold text-green-600">
                {(betData.expectedValue * 100).toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Prob. Implícita</div>
              <div className="font-semibold">
                {(betData.impliedProbability * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Confiança</div>
              <div className="font-semibold">
                {betData.confidenceScore.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Comparação de Odds */}
          <div className="grid gap-2">
            <Label className="text-sm text-gray-500">Comparação de Odds</Label>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm text-gray-500">Betby (Valor)</div>
                <div className="font-semibold text-green-600">
                  {betData.betbyOdd.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Pinnacle (Ref.)</div>
                <div className="font-semibold">
                  {betData.pinnacleOdd.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Valor da Aposta */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="amount">Valor da Aposta</Label>
              <button
                type="button"
                onClick={() => setBetAmount(recommendedBet.toString())}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Calculator className="h-3 w-3" />
                Usar recomendado: {formatCurrency(recommendedBet)}
              </button>
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="text-lg"
              min="0"
              step="5"
            />
            <p className="text-xs text-gray-500">
              Valor recomendado baseado no Kelly Criterion conservador (25%
              máx.)
            </p>
          </div>

          {/* Retorno Potencial */}
          {isValidAmount && (
            <div className="grid gap-2 rounded-lg bg-blue-50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Retorno Potencial:</span>
                <span className="font-semibold">
                  {formatCurrency(potentialReturn)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Lucro Potencial:</span>
                <span className="font-semibold text-green-600">
                  +{formatCurrency(potentialProfit)}
                </span>
              </div>
            </div>
          )}

          {/* Aviso */}
          <div className="flex items-start gap-2 rounded-lg bg-yellow-50 p-3">
            <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-600" />
            <p className="text-xs text-yellow-800">
              Aposte com responsabilidade. Nunca aposte mais do que você pode
              perder. O valor recomendado é apenas uma sugestão baseada em
              análise matemática.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="action-blue"
            onClick={handleOpenBetPage}
            disabled={isPending}
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Abrir Site de Apostas
          </Button>
          <Button
            variant="action"
            onClick={handlePlaceBet}
            disabled={!isValidAmount || isPending}
          >
            {isPending ? "Processando..." : "Confirmar Aposta"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
