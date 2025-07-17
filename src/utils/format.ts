import { DashboardMetric } from "@/services/dashboard/dashboard-service-client";

// Formatar valor principal baseado na unidade
export const formatMainValue = (value: number, unit: string): string => {
  switch (unit) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);

    case "percentage":
      return `${value.toFixed(1)}%`;

    case "count":
      return value.toString();

    default:
      return value.toString();
  }
};

// Formatar texto de mudança
export const formatChangeText = (
  changeValue: number | null | undefined,
  changeUnit: string,
  changeText: string,
): string => {
  if (changeValue === null || changeValue === undefined) {
    return changeText; // Para casos como "3 ending today"
  }

  const sign = changeValue >= 0 ? "+" : "";

  switch (changeUnit) {
    case "percentage":
      return `${sign}${changeValue.toFixed(1)}% ${changeText}`;

    case "percentage_points":
      return `${sign}${changeValue.toFixed(1)}pp ${changeText}`;

    case "absolute":
      return `${sign}${changeValue} ${changeText}`;

    default:
      return changeText;
  }
};

// Determinar cor do valor principal
export const getMainValueColor = (
  value: number,
  unit: string,
  title: string,
): string => {
  if (title === "Total Profit") {
    return value < 0 ? "text-red-600 font-bold" : "text-green-600 font-bold";
  }

  if (title === "Win Rate") {
    if (value < 40) return "text-red-600 font-bold";
    if (value > 60) return "text-green-600 font-bold";
    return "text-orange-600 font-bold";
  }

  return "text-foreground font-bold";
};

// Determinar cor do texto de mudança
export const getChangeColor = (
  mainValue: number,
  changeValue: number | null | undefined,
  title: string,
): string => {
  // Se não há valor de mudança, é neutro
  if (changeValue === null || changeValue === undefined) {
    return "text-muted-foreground";
  }

  if (title === "Total Profit") {
    // Se está no prejuízo
    if (mainValue < 0) {
      if (changeValue > 0) {
        return "text-orange-600 font-medium"; // Melhorando mas ainda negativo
      }
      return "text-negative-pure font-medium"; // Piorando e negativo
    }

    // Se está no lucro
    if (changeValue > 0) {
      return "text-green-600 font-medium"; // Melhorando
    }
    return "text-orange-600 font-medium"; // Piorando mas ainda positivo
  }

  if (title === "Win Rate") {
    // Se win rate é muito baixo
    if (mainValue < 40) {
      if (changeValue > 0) {
        return "text-orange-600 font-medium"; // Melhorando mas ainda baixo
      }
      return "text-red-700 font-medium"; // Baixo e piorando
    }

    // Win rate normal/bom
    if (changeValue > 0) {
      return "text-green-600 font-medium";
    }
    return "text-red-600 font-medium";
  }

  if (title === "Total Bets") {
    if (changeValue > 0) {
      return "text-blue-600 font-medium"; // Mais atividade
    }
    return "text-gray-600 font-medium"; // Menos atividade
  }

  // Default: neutro
  return "text-muted-foreground";
};

// Função principal para processar uma métrica
export const processMetric = (metric: DashboardMetric) => {
  const formattedValue = formatMainValue(metric.value, metric.unit);
  const formattedChange = formatChangeText(
    metric.changeValue,
    metric.changeUnit,
    metric.changeText,
  );
  const mainColor = getMainValueColor(metric.value, metric.unit, metric.title);
  const changeColor = getChangeColor(
    metric.value,
    metric.changeValue,
    metric.title,
  );

  return {
    formattedValue,
    formattedChange,
    mainColor,
    changeColor,
    isNegative: metric.value < 0,
    isImproving: (metric.changeValue ?? 0) > 0,
    isDeclining: (metric.changeValue ?? 0) < 0,
  };
};

export const formatDateInBrazilianTime = (date: Date) => {
  return date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatOdds(value: number): string {
  return value.toFixed(2);
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
}
