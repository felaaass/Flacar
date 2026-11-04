export type ExtraKey = 'wait' | 'rain' | 'volume';

export interface ExtraConfig {
  key: ExtraKey;
  shortLabel: string;
  label: string;
  price: number;
}

export const WHATSAPP_NUMERO = '5546999164146';
export const WHATSAPP_EXIBICAO = '(46) 99916-4146';
export const EMAIL_CONTATO = 'flaviokich@gmail.com';
export const ENDERECO = 'Rua Paraná, 908 — Planalto, PR';
export const CIDADES_ATENDIDAS: readonly string[] = [
  'Planalto',
  'Capanema',
  'Pérola do Oeste',
  'Realeza',
];

export const HORA_ABERTURA = 8;
export const HORA_FECHAMENTO = 18;
export const HORARIO_TEXTO = 'Seg a sex, das 8h às 18h';
export const HORARIO_EXTENSO = 'Segunda a sexta, das 8h às 18h';

export const TAXA_FIXA = 8.0;
export const VALOR_KM = 2.5;

export const EXTRAS_CONFIG: Record<ExtraKey, ExtraConfig> = {
  wait: {
    key: 'wait',
    shortLabel: 'Espera no local',
    label: 'Espera no local (a cada 15 min)',
    price: 5.0,
  },
  rain: {
    key: 'rain',
    shortLabel: 'Chuva',
    label: 'Chuva',
    price: 4.0,
  },
  volume: {
    key: 'volume',
    shortLabel: 'Volume: carga volumosa ou pesada',
    label: 'Volume (carga volumosa ou pesada)',
    price: 6.0,
  },
};

export const EXTRAS_LIST: readonly ExtraConfig[] = [
  EXTRAS_CONFIG.wait,
  EXTRAS_CONFIG.rain,
  EXTRAS_CONFIG.volume,
];

export function buildWhatsAppUrl(message: string, phone: string = WHATSAPP_NUMERO): string {
  const baseUrl = ['https:', '', 'wa.me', phone].join('/');
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
