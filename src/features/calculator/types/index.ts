import { ExtraKey } from '@/config/business';

export interface CalculationLine {
  id: string;
  label: string;
  subLabel?: string;
  amount: number;
}

export interface DeliveryCalculationResult {
  km: number;
  baseFee: number;
  kmCost: number;
  selectedExtras: ExtraKey[];
  extrasTotal: number;
  total: number;
  lines: CalculationLine[];
}
