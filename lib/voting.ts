export type VotingType = "fibonacci" | "hours";

export type HoursRange = {
  min: number;
  max: number;
};

export const DEFAULT_VOTING_TYPE: VotingType = "fibonacci";

export const VOTING_TYPES: {
  value: VotingType;
  label: string;
  description: string;
}[] = [
  {
    value: "fibonacci",
    label: "Fibonacci",
    description: "Story points (0, 1, 2, 3, 5, 8...)",
  },
  {
    value: "hours",
    label: "Horas",
    description: "Estimativa em horas, com intervalo personalizado",
  },
];

export const FIBONACCI_DECK = [
  "0",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "21",
  "34",
  "?",
];

/**
 * Passos possíveis entre as cartas de horas. Usa-se o menor passo que caiba
 * em MAX_HOURS_CARDS cartas, para intervalos curtos saírem completos
 * (1h a 8h → 1h, 2h, 3h... 8h) e intervalos longos não virarem uma lista
 * gigante (0,5h a 1000h → de 100 em 100).
 */
export const HOURS_STEPS = [
  0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 25, 30, 40, 50, 60, 80, 100,
  120, 150, 200, 250, 500, 1000,
];

export const DEFAULT_HOURS_RANGE: HoursRange = { min: 0.5, max: 40 };

/** Limites absolutos aceitos no formulário de criação da sala. */
export const HOURS_LIMITS = { min: 0.5, max: 1000 };

/** Número máximo de cartas de horas (sem contar o "?"). */
export const MAX_HOURS_CARDS = 12;

export function normalizeVotingType(votingType: any): VotingType {
  return votingType === "hours" || votingType === "fibonacci"
    ? votingType
    : DEFAULT_VOTING_TYPE;
}

/** Aceita "1,5" e "1.5", devolve NaN quando não é um número utilizável. */
export function parseHoursInput(value: any): number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value !== "string") {
    return NaN;
  }

  const normalized = value.trim().replace(",", ".");

  if (normalized === "" || !/^\d*\.?\d*$/.test(normalized)) {
    return NaN;
  }

  return parseFloat(normalized);
}

function roundHours(value: number) {
  return Math.round(value * 100) / 100;
}

/** Devolve a mensagem de erro do intervalo, ou null quando está válido. */
export function validateHoursRange(min: any, max: any): string | null {
  const parsedMin = parseHoursInput(min);
  const parsedMax = parseHoursInput(max);

  if (isNaN(parsedMin) || isNaN(parsedMax)) {
    return "Informe as horas mínima e máxima da votação.";
  }

  if (parsedMin < HOURS_LIMITS.min) {
    return `A hora mínima deve ser de pelo menos ${formatHours(
      HOURS_LIMITS.min
    )}.`;
  }

  if (parsedMax > HOURS_LIMITS.max) {
    return `A hora máxima deve ser de no máximo ${formatHours(
      HOURS_LIMITS.max
    )}.`;
  }

  if (parsedMax <= parsedMin) {
    return "A hora máxima deve ser maior que a mínima.";
  }

  return null;
}

export function normalizeHoursRange(range: any): HoursRange {
  const parsedMin = parseHoursInput(range?.min);
  const parsedMax = parseHoursInput(range?.max);

  if (validateHoursRange(parsedMin, parsedMax)) {
    return { ...DEFAULT_HOURS_RANGE };
  }

  return { min: roundHours(parsedMin), max: roundHours(parsedMax) };
}

/** Múltiplos do passo entre min e max, mais as duas pontas. */
function hoursValuesForStep(min: number, max: number, step: number) {
  const values = [min];

  for (let index = Math.floor(min / step) + 1; index * step < max; index++) {
    values.push(roundHours(index * step));
  }

  values.push(max);

  return Array.from(new Set(values)).sort((a, b) => a - b);
}

/**
 * Monta o deck de horas dentro do intervalo escolhido, sempre incluindo as
 * pontas (mínimo e máximo), com o menor passo que caiba em MAX_HOURS_CARDS.
 */
export function buildHoursDeck(range: any): string[] {
  const { min, max } = normalizeHoursRange(range);

  const step =
    HOURS_STEPS.find(
      (candidate) =>
        hoursValuesForStep(min, max, candidate).length <= MAX_HOURS_CARDS
    ) ?? (max - min) / (MAX_HOURS_CARDS - 1);

  const values = hoursValuesForStep(min, max, step);

  return [...values.map((value) => String(value)), "?"];
}

export function getDeck(votingType: any, hoursRange?: any): string[] {
  if (normalizeVotingType(votingType) === "hours") {
    return buildHoursDeck(hoursRange);
  }

  return FIBONACCI_DECK;
}

function formatNumber(value: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function formatHours(value: number) {
  return `${formatNumber(value)}h`;
}

export function formatCardLabel(value: any, votingType: any) {
  if (value === null || value === undefined || value === "?") {
    return "?";
  }

  const parsed = parseFloat(value);

  if (isNaN(parsed)) {
    return String(value);
  }

  if (normalizeVotingType(votingType) === "hours") {
    return formatHours(parsed);
  }

  return formatNumber(parsed);
}

export function formatAverage(average: any, votingType: any) {
  const parsed = parseFloat(average);

  if (isNaN(parsed)) {
    return average;
  }

  const rounded = roundHours(parsed);

  if (normalizeVotingType(votingType) === "hours") {
    return formatHours(rounded);
  }

  return rounded.toFixed(2);
}

export function getVotingTypeLabel(votingType: any, hoursRange?: any) {
  const type = normalizeVotingType(votingType);

  if (type === "hours") {
    const { min, max } = normalizeHoursRange(hoursRange);

    return `Horas (${formatHours(min)} a ${formatHours(max)})`;
  }

  return VOTING_TYPES.find((option) => option.value === type)?.label ?? type;
}
