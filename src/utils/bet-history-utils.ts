export interface BetStatusInfo {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function getBetStatusInfo(status: string): BetStatusInfo {
  const statusMap: Record<string, BetStatusInfo> = {
    won: {
      label: "Won",
      color: "text-green-800",
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
    },
    lost: {
      label: "Lost",
      color: "text-red-800",
      bgColor: "bg-red-100",
      borderColor: "border-red-200",
    },
    open: {
      label: "Open",
      color: "text-blue-800",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
    },
    void: {
      label: "Void",
      color: "text-gray-800",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-200",
    },
    "cashed out": {
      label: "Cashed Out",
      color: "text-yellow-800",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-200",
    },
  };

  return statusMap[status.toLowerCase()] || statusMap["void"];
}

export function getProfitDisplayInfo(profit: number) {
  const isPositive = profit > 0;
  const isNegative = profit < 0;

  return {
    value: Math.abs(profit),
    sign: isPositive ? "+" : isNegative ? "-" : "",
    color: isPositive
      ? "text-green-600"
      : isNegative
        ? "text-red-600"
        : "text-gray-600",
    weight: isPositive || isNegative ? "font-semibold" : "font-normal",
  };
}

export function formatEventDateTime(dateTimeString: string) {
  const date = new Date(dateTimeString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  // Se foi há menos de 24 horas, mostrar tempo relativo
  if (diffInHours < 24) {
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    }
    return `${Math.floor(diffInHours)}h ago`;
  }

  // Se foi há menos de 7 dias, mostrar em dias
  if (diffInHours < 168) {
    return `${Math.floor(diffInHours / 24)}d ago`;
  }

  // Senão, mostrar data completa
  return date.toLocaleDateString("pt-BR");
}

export function calculateROI(totalProfit: number, totalStaked: number): number {
  if (totalStaked === 0) return 0;
  return (totalProfit / totalStaked) * 100;
}

export function calculateWinRate(wonBets: number, totalBets: number): number {
  if (totalBets === 0) return 0;
  return (wonBets / totalBets) * 100;
}

export function getMarketTypeDisplayName(marketType: string): string {
  const marketTypeMap: Record<string, string> = {
    winner: "Match Winner",
    over_under: "Over/Under",
    both_teams_score: "Both Teams to Score",
    handicap: "Handicap",
    correct_score: "Correct Score",
    first_goal: "First Goal",
    total_goals: "Total Goals",
  };

  return marketTypeMap[marketType.toLowerCase()] || marketType;
}

export function generateCSVFromBetHistory(bets: any[]) {
  const headers = [
    "Date",
    "Time",
    "Event",
    "League",
    "Bet",
    "Market Type",
    "Stake (R$)",
    "Odds",
    "Potential Payout (R$)",
    "Profit/Loss (R$)",
    "Status",
  ];

  const csvContent = [
    headers.join(","),
    ...bets.map((bet) => {
      const date = new Date(bet.placedAt);
      return [
        date.toLocaleDateString("pt-BR"),
        date.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        `"${bet.team1} vs ${bet.team2}"`,
        `"${bet.league}"`,
        `"${bet.selectedOutcomeDescription}"`,
        `"${getMarketTypeDisplayName(bet.marketType)}"`,
        bet.amount.toFixed(2).replace(".", ","),
        bet.odds.toFixed(2).replace(".", ","),
        bet.potentialPayout.toFixed(2).replace(".", ","),
        bet.profit.toFixed(2).replace(".", ","),
        `"${bet.statusDescription}"`,
      ].join(",");
    }),
  ].join("\n");

  return csvContent;
}
