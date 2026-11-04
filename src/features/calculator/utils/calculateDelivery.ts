import {
  EMAIL_CONTATO,
  ENDERECO,
  EXTRAS_CONFIG,
  ExtraKey,
  HORARIO_TEXTO,
  TAXA_FIXA,
  VALOR_KM,
  buildWhatsAppUrl,
} from '@/config/business';
import { formatBRL, formatKm, parseDecimalPtBr } from '@/utils/formatters';
import { CalculationLine, DeliveryCalculationResult } from '../types';

export const MAX_DELIVERY_KM = 2000;

export function validateDistanceInput(rawDistance: string): {
  valid: boolean;
  km: number | null;
  errorMessage: string;
} {
  const parsed = parseDecimalPtBr(rawDistance);
  if (parsed === null) {
    return {
      valid: false,
      km: null,
      errorMessage: 'Informe a distância em km.',
    };
  }
  if (Number.isNaN(parsed)) {
    return {
      valid: false,
      km: null,
      errorMessage: 'Use apenas números (ex.: 3,5).',
    };
  }
  if (parsed <= 0) {
    return {
      valid: false,
      km: null,
      errorMessage: 'A distância deve ser maior que zero.',
    };
  }
  if (parsed > MAX_DELIVERY_KM) {
    return {
      valid: false,
      km: null,
      errorMessage: 'Informe uma distância válida (máx. 2.000 km).',
    };
  }
  return {
    valid: true,
    km: parsed,
    errorMessage: '',
  };
}

export function calculateDeliveryPrice(
  km: number,
  selectedExtras: ExtraKey[]
): DeliveryCalculationResult {
  const kmCost = km * VALOR_KM;
  const extrasTotal = selectedExtras.reduce(
    (sum, extraKey) => sum + EXTRAS_CONFIG[extraKey].price,
    0
  );
  const total = TAXA_FIXA + kmCost + extrasTotal;

  const lines: CalculationLine[] = [
    {
      id: 'base',
      label: 'Taxa fixa',
      amount: TAXA_FIXA,
    },
    {
      id: 'km',
      label: `Distância ${formatKm(km)} km × ${formatBRL(VALOR_KM)}`,
      subLabel: 'por km rodado',
      amount: kmCost,
    },
    ...selectedExtras.map((extraKey) => ({
      id: extraKey,
      label: EXTRAS_CONFIG[extraKey].label,
      amount: EXTRAS_CONFIG[extraKey].price,
    })),
  ];

  return {
    km,
    baseFee: TAXA_FIXA,
    kmCost,
    selectedExtras,
    extrasTotal,
    total,
    lines,
  };
}

export function buildCalculatorWhatsAppUrl(result: DeliveryCalculationResult): string {
  const extrasText =
    result.selectedExtras.length > 0
      ? result.selectedExtras
          .map(
            (key) =>
              `- ${EXTRAS_CONFIG[key].label}: ${formatBRL(EXTRAS_CONFIG[key].price)}`
          )
          .join('\n')
      : '- Nenhum';

  const message = [
    '*Cálculo de entrega Flacar*',
    'Atendemos: Planalto, Capanema, Pérola do Oeste e Realeza. Outras cidades sob consulta (valor diferenciado).',
    `Distância: ${formatKm(result.km)} km`,
    `Taxa fixa: ${formatBRL(result.baseFee)}`,
    `Km rodado: ${formatBRL(result.kmCost)}`,
    'Adicionais:',
    extrasText,
    `*Total: ${formatBRL(result.total)}*`,
    '',
    `Horário de atendimento: ${HORARIO_TEXTO}`,
    `Base: ${ENDERECO} · E-mail: ${EMAIL_CONTATO}`,
  ].join('\n');

  return buildWhatsAppUrl(message);
}
