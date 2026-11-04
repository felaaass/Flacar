export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatKm(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function parseDecimalPtBr(raw: string): number | null {
  const trimmed = String(raw).trim();
  if (trimmed === '') {
    return null;
  }
  const normalized =
    trimmed.includes(',') && trimmed.includes('.')
      ? trimmed.replace(/\./g, '').replace(',', '.')
      : trimmed.replace(',', '.');

  if (!/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(normalized)) {
    return Number.NaN;
  }
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export function maskPhonePtBr(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) {
    return digits.length ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
