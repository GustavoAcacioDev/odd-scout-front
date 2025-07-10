import { ColumnDef } from "@tanstack/react-table";

import { TAvaliableBets } from "@/services/bets/bet-service-client";
import { Button } from "@/components/ui/shadcn/button";
import { renderBestOutcome } from "@/utils/bet-utils";

export const availableBetsColumns: ColumnDef<TAvaliableBets>[] = [
  {
    accessorKey: "expectedValue",
    header: "EV",
    cell: (info) => info.getValue(),
    size: 5,
    minSize: 5,
    maxSize: 5,
  },
  {
    accessorKey: "team1",
    header: "Event",
    cell: (info) => `${info.row.original.team1} vs ${info.row.original.team2}`,
    size: 30,
    minSize: 30,
    maxSize: 30,
  },
  {
    accessorKey: "bestOutcome",
    header: "Recommended Bet",
    cell: (info) => renderBestOutcome(info.getValue() as 1 | 2 | 3),
    size: 20,
    minSize: 20,
    maxSize: 20,
  },
  {
    accessorKey: "betbyOdd",
    header: "Betby Odds",
    cell: (info) => info.getValue(),
    size: 10,
    minSize: 10,
    maxSize: 10,
  },
  {
    accessorKey: "pinnacleOdd",
    header: "Pinnacle Odds",
    cell: (info) => info.getValue(),
    size: 10,
    minSize: 10,
    maxSize: 10,
  },
  {
    accessorKey: "id",
    header: "Ações",
    cell: (info) => (
      <Button size="sm">
        Place Bet
      </Button>
    ),
    size: 5,
    minSize: 5,
    maxSize: 5,
  },
];
