import { HORA_ABERTURA, HORA_FECHAMENTO } from '@/config/business';

export function checkIsOpenNow(referenceDate: Date = new Date()): boolean {
  const day = referenceDate.getDay();
  const hour = referenceDate.getHours() + referenceDate.getMinutes() / 60;
  return day >= 1 && day <= 5 && hour >= HORA_ABERTURA && hour < HORA_FECHAMENTO;
}
