import {
  EMAIL_CONTATO,
  ENDERECO,
  HORARIO_TEXTO,
  TAXA_FIXA,
  VALOR_KM,
  buildWhatsAppUrl,
} from '@/config/business';
import { formatBRL, formatKm, parseDecimalPtBr } from '@/utils/formatters';
import { EstimateDisplay, ItemTypeOption, OrderRecord } from '../types';

export function getItemTypeLabel(value: ItemTypeOption): string {
  const map: Record<ItemTypeOption, string> = {
    '': 'Não informado',
    documento: 'Documento',
    comida: 'Comida',
    compra: 'Compra / mercadoria',
    outro: 'Outro',
  };
  return map[value] || 'Não informado';
}

export function computeOrderEstimate(rawDistance: string): EstimateDisplay {
  const km = parseDecimalPtBr(rawDistance);
  if (km === null || Number.isNaN(km) || km <= 0) {
    return {
      value: null,
      displayText: 'R$ 0,00',
      caption: 'Informe a distância para ver a faixa de preço.',
      tint: 'Faixa: aguardando distância.',
    };
  }

  const total = TAXA_FIXA + km * VALOR_KM;
  const formattedTotal = formatBRL(total);
  const formattedKm = formatKm(km);

  return {
    value: total,
    displayText: formattedTotal,
    caption: `Taxa fixa ${formatBRL(TAXA_FIXA)} + ${formattedKm} km × ${formatBRL(VALOR_KM)}`,
    tint: `Estimativa para ${formattedKm} km: ${formattedTotal}. A confirmação final é feita pelo WhatsApp.`,
  };
}

export function buildOrderSummaryText(order: OrderRecord, isOpen: boolean): string {
  const dateObj = new Date(order.createdAtIso);
  const timeStr = dateObj.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const estimateStr = order.estimate !== null ? formatBRL(order.estimate) : 'A confirmar';

  const lines: Array<string | null> = [
    `*Pedido Flacar Entregas #${String(order.id).padStart(3, '0')}*`,
    `Horário: ${timeStr}`,
    `Comércio: ${order.storeName}`,
    `Solicitante: ${order.personName}`,
    `WhatsApp: ${order.phone}`,
    `Coleta: ${order.pickup}`,
    `Entrega: ${order.dropoff}`,
    `Item: ${getItemTypeLabel(order.itemType)}`,
    'Atendemos: Planalto, Capanema, Pérola do Oeste e Realeza. Outras cidades sob consulta (valor diferenciado).',
    `Base: ${ENDERECO}`,
    order.distance !== null ? `Distância estimada: ${formatKm(order.distance)} km` : null,
    `Valor estimado: ${estimateStr}`,
    order.note ? `Observações: ${order.note}` : null,
    '',
    `Horário de atendimento: ${HORARIO_TEXTO}`,
    `E-mail: ${EMAIL_CONTATO}`,
    !isOpen
      ? 'Pedido enviado fora do horário de atendimento — será respondido no próximo horário útil.'
      : null,
  ];

  return lines.filter((line): line is string => line !== null).join('\n');
}

export function buildOrderWhatsAppUrl(summaryText: string): string {
  return buildWhatsAppUrl(summaryText);
}
