export type ItemTypeOption = '' | 'documento' | 'comida' | 'compra' | 'outro';

export type RequiredOrderField =
  | 'storeName'
  | 'personName'
  | 'phone'
  | 'itemType'
  | 'pickup'
  | 'dropoff';

export interface OrderFormValues {
  storeName: string;
  personName: string;
  phone: string;
  itemType: ItemTypeOption;
  pickup: string;
  dropoff: string;
  distance: string;
  orderNote: string;
}

export interface OrderRecord {
  id: number;
  storeName: string;
  personName: string;
  phone: string;
  pickup: string;
  dropoff: string;
  itemType: ItemTypeOption;
  distance: number | null;
  note: string;
  estimate: number | null;
  status: 'Aguardando';
  createdAtIso: string;
}

export interface EstimateDisplay {
  value: number | null;
  displayText: string;
  caption: string;
  tint: string;
}
