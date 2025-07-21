"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { TAvaliableBets } from "@/services/bets/bet-service-client";
import { Button } from "@/components/ui/shadcn/button";
import { renderBestOutcome } from "@/utils/bet-utils";
import PlaceBetDialog from "@/components/dialogs/PlaceBetDialog";
import { formatOdds, formatPercentage } from "@/utils/format";

export const availableBetsColumns: ColumnDef<TAvaliableBets>[] = [
  {
    accessorKey: "expectedValue",
    header: "EV",
    cell: (info) => {
      const value = info.getValue() as number;
      return (
        <span className="font-semibold text-green-600">
          {formatPercentage(value)}
        </span>
      );
    },
    size: 5,
    minSize: 5,
    maxSize: 5,
  },
  {
    accessorKey: "team1",
    header: "Event",
    cell: (info) => (
      <div>
        <div className="font-medium">
          {info.row.original.team1} vs {info.row.original.team2}
        </div>
        <div className="text-sm text-gray-500">{info.row.original.league}</div>
      </div>
    ),
    size: 30,
    minSize: 30,
    maxSize: 30,
  },
  {
    accessorKey: "bestOutcome",
    header: "Recommended Bet",
    cell: (info) => (
      <span className="font-medium">
        {renderBestOutcome(info.getValue() as 1 | 2 | 3)}
      </span>
    ),
    size: 20,
    minSize: 20,
    maxSize: 20,
  },
  {
    accessorKey: "betbyOdd",
    header: "Betby Odds",
    cell: (info) => (
      <span className="font-semibold text-green-600">
        {formatOdds(info.getValue() as number)}
      </span>
    ),
    size: 10,
    minSize: 10,
    maxSize: 10,
  },
  {
    accessorKey: "pinnacleOdd",
    header: "Pinnacle Odds",
    cell: (info) => formatOdds(info.getValue() as number),
    size: 10,
    minSize: 10,
    maxSize: 10,
  },
  {
    accessorKey: "id",
    header: "Ações",
    cell: (info) => <PlaceBetDialog betData={info.row.original} />,
    size: 5,
    minSize: 5,
    maxSize: 5,
  },
];
