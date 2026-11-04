import { useCallback, useMemo, useRef, useState } from 'react';
import { useToast } from '@/components/ui/ToastProvider';
import { MAX_DELIVERY_KM } from '@/features/calculator/utils/calculateDelivery';
import { maskPhonePtBr, parseDecimalPtBr } from '@/utils/formatters';
import { sanitizeInput, sanitizeMultiLine } from '@/utils/sanitizer';
import { readLocalStorage, writeLocalStorage } from '@/utils/storage';
import { OrderFormValues, OrderRecord, RequiredOrderField } from '../types';
import {
  buildOrderSummaryText,
  buildOrderWhatsAppUrl,
  computeOrderEstimate,
} from '../utils/orderFormatting';

const ORDERS_STORAGE_KEY = 'flacar_orders_v1';
const MIN_SUBMIT_INTERVAL_MS = 4000;

const INITIAL_VALUES: OrderFormValues = {
  storeName: '',
  personName: '',
  phone: '',
  itemType: '',
  pickup: '',
  dropoff: '',
  distance: '',
  orderNote: '',
};

const REQUIRED_FIELDS: readonly RequiredOrderField[] = [
  'storeName',
  'personName',
  'phone',
  'itemType',
  'pickup',
  'dropoff',
];

function validateSingleField(field: RequiredOrderField, values: OrderFormValues): boolean {
  const val = values[field].trim();
  if (field === 'phone') {
    const digits = val.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 11;
  }
  return val !== '';
}

function validateOptionalDistance(rawDistance: string): string {
  const trimmed = rawDistance.trim();
  if (trimmed === '') {
    return '';
  }
  const parsed = parseDecimalPtBr(trimmed);
  if (parsed === null) {
    return '';
  }
  if (Number.isNaN(parsed)) {
    return 'Use apenas números na distância (ex.: 4,5).';
  }
  if (parsed <= 0) {
    return 'A distância estimada deve ser maior que zero.';
  }
  if (parsed > MAX_DELIVERY_KM) {
    return 'Informe uma distância válida (máx. 2.000 km).';
  }
  return '';
}

export function useOrders(isOpen: boolean) {
  const { showToast } = useToast();
  const [values, setValues] = useState<OrderFormValues>(INITIAL_VALUES);
  const [honeypotValue, setHoneypotValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const lastSubmitTimeRef = useRef<number>(0);

  const [invalidFields, setInvalidFields] = useState<Record<RequiredOrderField, boolean>>({
    storeName: false,
    personName: false,
    phone: false,
    itemType: false,
    pickup: false,
    dropoff: false,
  });
  const [distanceError, setDistanceError] = useState('');
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    readLocalStorage<OrderRecord[]>(ORDERS_STORAGE_KEY, [])
  );
  const [lastOrderSummary, setLastOrderSummary] = useState<string | null>(null);
  const successBoxRef = useRef<HTMLDivElement | null>(null);

  const estimate = useMemo(() => computeOrderEstimate(values.distance), [values.distance]);

  const filledRequiredCount = useMemo(() => {
    return REQUIRED_FIELDS.filter((field) => values[field].trim() !== '').length;
  }, [values]);

  const progressPercent = Math.round((filledRequiredCount / REQUIRED_FIELDS.length) * 100);

  const handleFieldChange = useCallback(
    (field: keyof OrderFormValues, rawValue: string) => {
      const formattedValue = field === 'phone' ? maskPhonePtBr(rawValue) : rawValue;
      setValues((prev) => {
        const next = { ...prev, [field]: formattedValue };
        if (
          field in invalidFields &&
          invalidFields[field as RequiredOrderField] &&
          validateSingleField(field as RequiredOrderField, next)
        ) {
          setInvalidFields((prevInvalid) => ({
            ...prevInvalid,
            [field]: false,
          }));
        }
        return next;
      });
      if (field === 'distance' && distanceError) {
        const nextErr = validateOptionalDistance(formattedValue);
        if (!nextErr) {
          setDistanceError('');
        }
      }
    },
    [distanceError, invalidFields]
  );

  const handleFieldBlur = useCallback(
    (field: RequiredOrderField) => {
      const isValid = validateSingleField(field, values);
      setInvalidFields((prev) => ({
        ...prev,
        [field]: !isValid,
      }));
    },
    [values]
  );

  const handleDistanceBlur = useCallback(() => {
    setDistanceError(validateOptionalDistance(values.distance));
  }, [values.distance]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (honeypotValue.trim() !== '') {
        return;
      }

      const now = Date.now();
      if (now - lastSubmitTimeRef.current < MIN_SUBMIT_INTERVAL_MS) {
        showToast('Aguarde alguns segundos antes de enviar outro pedido.', { variant: 'error' });
        return;
      }

      if (!privacyAgreed) {
        setPrivacyError(true);
        const consentEl = document.getElementById('order-field-privacy');
        consentEl?.focus();
        showToast('Para continuar, confirme a ciência do tratamento de dados (LGPD).', {
          variant: 'error',
        });
        return;
      }
      setPrivacyError(false);

      const nextInvalid: Record<RequiredOrderField, boolean> = {
        storeName: false,
        personName: false,
        phone: false,
        itemType: false,
        pickup: false,
        dropoff: false,
      };
      let firstInvalidFieldId: string | null = null;

      for (const field of REQUIRED_FIELDS) {
        const valid = validateSingleField(field, values);
        if (!valid) {
          nextInvalid[field] = true;
          if (!firstInvalidFieldId) {
            firstInvalidFieldId = `order-field-${field}`;
          }
        }
      }

      const distErr = validateOptionalDistance(values.distance);
      setDistanceError(distErr);
      if (distErr && !firstInvalidFieldId) {
        firstInvalidFieldId = 'order-field-distance';
      }

      setInvalidFields(nextInvalid);

      if (firstInvalidFieldId) {
        const el = document.getElementById(firstInvalidFieldId);
        el?.focus();
        showToast('Revise os campos destacados antes de enviar.', { variant: 'error' });
        return;
      }

      setIsSubmitting(true);
      lastSubmitTimeRef.current = now;

      const parsedDistance = parseDecimalPtBr(values.distance);
      const cleanDistance =
        parsedDistance !== null && !Number.isNaN(parsedDistance) && parsedDistance > 0
          ? parsedDistance
          : null;

      const nextId =
        orders.length > 0 ? Math.max(...orders.map((item) => item.id)) + 1 : 1;

      const newOrder: OrderRecord = {
        id: nextId,
        storeName: sanitizeInput(values.storeName),
        personName: sanitizeInput(values.personName),
        phone: sanitizeInput(values.phone),
        pickup: sanitizeInput(values.pickup),
        dropoff: sanitizeInput(values.dropoff),
        itemType: values.itemType,
        distance: cleanDistance,
        note: sanitizeMultiLine(values.orderNote),
        estimate: estimate.value,
        status: 'Aguardando',
        createdAtIso: new Date().toISOString(),
      };

      const updatedOrders = [...orders, newOrder];
      setOrders(updatedOrders);
      writeLocalStorage(ORDERS_STORAGE_KEY, updatedOrders);

      const summary = buildOrderSummaryText(newOrder, isOpen);
      setLastOrderSummary(summary);
      setValues(INITIAL_VALUES);
      setDistanceError('');
      setIsSubmitting(false);

      showToast(`Pedido #${String(newOrder.id).padStart(3, '0')} registrado com sucesso!`, {
        title: 'Tudo certo',
        variant: 'success',
      });

      window.setTimeout(() => {
        successBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 60);
    },
    [estimate.value, honeypotValue, isOpen, orders, privacyAgreed, showToast, values]
  );

  const handleResetForm = useCallback(() => {
    setValues(INITIAL_VALUES);
    setInvalidFields({
      storeName: false,
      personName: false,
      phone: false,
      itemType: false,
      pickup: false,
      dropoff: false,
    });
    setDistanceError('');
    setPrivacyError(false);
    setLastOrderSummary(null);
    showToast('Campos limpos. Você pode começar um novo pedido.');
  }, [showToast]);

  const handleStartNewOrder = useCallback(() => {
    setValues(INITIAL_VALUES);
    setInvalidFields({
      storeName: false,
      personName: false,
      phone: false,
      itemType: false,
      pickup: false,
      dropoff: false,
    });
    setDistanceError('');
    setPrivacyError(false);
    setLastOrderSummary(null);
    const firstInput = document.getElementById('order-field-storeName');
    firstInput?.focus();
  }, []);

  const handleCopySummary = useCallback(() => {
    if (!lastOrderSummary) {
      return;
    }
    if (!navigator.clipboard) {
      showToast('Seu navegador não permite copiar automaticamente.', { variant: 'error' });
      return;
    }
    navigator.clipboard.writeText(lastOrderSummary).then(
      () => showToast('Resumo copiado para a área de transferência.', { variant: 'success' }),
      () =>
        showToast('Não foi possível copiar. Selecione o texto manualmente.', {
          variant: 'error',
        })
    );
  }, [lastOrderSummary, showToast]);

  const getOrderWhatsAppUrl = useCallback(
    (order: OrderRecord) => {
      const summary = buildOrderSummaryText(order, isOpen);
      return buildOrderWhatsAppUrl(summary);
    },
    [isOpen]
  );

  const clearHistory = useCallback(() => {
    setOrders([]);
    writeLocalStorage(ORDERS_STORAGE_KEY, []);
    showToast('Histórico de pedidos excluído deste navegador.');
  }, [showToast]);

  return {
    values,
    invalidFields,
    distanceError,
    orders,
    estimate,
    filledRequiredCount,
    totalRequiredCount: REQUIRED_FIELDS.length,
    progressPercent,
    lastOrderSummary,
    successBoxRef,
    isSubmitting,
    honeypotValue,
    privacyAgreed,
    privacyError,
    whatsAppSummaryUrl: lastOrderSummary ? buildOrderWhatsAppUrl(lastOrderSummary) : '#',
    setHoneypotValue,
    setPrivacyAgreed,
    handleFieldChange,
    handleFieldBlur,
    handleDistanceBlur,
    handleSubmit,
    handleResetForm,
    handleStartNewOrder,
    handleCopySummary,
    getOrderWhatsAppUrl,
    clearHistory,
  };
}
