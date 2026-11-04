import { useCallback, useRef, useState } from 'react';
import { ExtraKey } from '@/config/business';
import { useToast } from '@/components/ui/ToastProvider';
import { DeliveryCalculationResult } from '../types';
import {
  buildCalculatorWhatsAppUrl,
  calculateDeliveryPrice,
  validateDistanceInput,
} from '../utils/calculateDelivery';

export function useDeliveryCalculator() {
  const { showToast } = useToast();
  const [distanceInput, setDistanceInput] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<ExtraKey[]>([]);
  const [error, setError] = useState('');
  const [result, setResult] = useState<DeliveryCalculationResult | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDistanceChange = useCallback(
    (value: string) => {
      setDistanceInput(value);
      if (error) {
        const check = validateDistanceInput(value);
        if (check.valid || value.trim() === '') {
          setError('');
        }
      }
    },
    [error]
  );

  const handleDistanceBlur = useCallback(() => {
    if (distanceInput.trim() === '') {
      return;
    }
    const validation = validateDistanceInput(distanceInput);
    if (!validation.valid) {
      setError(validation.errorMessage);
    }
  }, [distanceInput]);

  const toggleExtra = useCallback(
    (key: ExtraKey) => {
      setSelectedExtras((prev) => {
        const nextExtras = prev.includes(key)
          ? prev.filter((item) => item !== key)
          : [...prev, key];

        if (result !== null) {
          const validation = validateDistanceInput(distanceInput);
          if (validation.valid && validation.km !== null) {
            setResult(calculateDeliveryPrice(validation.km, nextExtras));
          }
        }
        return nextExtras;
      });
    },
    [distanceInput, result]
  );

  const handleCalculate = useCallback(() => {
    const validation = validateDistanceInput(distanceInput);
    if (!validation.valid || validation.km === null) {
      setError(validation.errorMessage);
      inputRef.current?.focus();
      return;
    }
    setError('');
    const computed = calculateDeliveryPrice(validation.km, selectedExtras);
    setResult(computed);
    setAnimKey((prev) => prev + 1);
  }, [distanceInput, selectedExtras]);

  const handleSendWhatsApp = useCallback(() => {
    if (!result) {
      showToast('Calcule a entrega antes de enviar.', { variant: 'error' });
      return;
    }
    const url = buildCalculatorWhatsAppUrl(result);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [result, showToast]);

  const handleReset = useCallback(() => {
    setDistanceInput('');
    setSelectedExtras([]);
    setError('');
    setResult(null);
    inputRef.current?.focus();
  }, []);

  return {
    distanceInput,
    selectedExtras,
    error,
    result,
    animKey,
    inputRef,
    handleDistanceChange,
    handleDistanceBlur,
    toggleExtra,
    handleCalculate,
    handleSendWhatsApp,
    handleReset,
  };
}
