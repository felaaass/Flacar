import React, { useId } from 'react';
import { EXTRAS_LIST } from '@/config/business';
import { formatBRL } from '@/utils/formatters';
import { useDeliveryCalculator } from '../hooks/useDeliveryCalculator';

export const CalculatorSection: React.FC = () => {
  const distanceId = useId();
  const errorId = useId();
  const {
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
  } = useDeliveryCalculator();

  return (
    <section className="py-20 bg-navy-card relative" id="precos">
      <div className="shell-container">
        <div className="section-head">
          <span className="eyebrow-badge">Preços</span>
          <h2>Calcule sua entrega</h2>
          <p>Taxa fixa de R$ 8,00 + R$ 2,50 por km rodado, mais adicionais opcionais.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className={`grid gap-6 sm:gap-8 items-start transition-all duration-300 ${
              result ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-lg mx-auto'
            }`}
          >
            <div className="bg-navy border border-white/[0.08] rounded-[26px] p-6 sm:p-8 shadow-soft">
              <div>
                <label
                  htmlFor={distanceId}
                  className="block font-bold text-[0.92rem] mb-2 text-white"
                >
                  Distância (km) <span className="text-[#ff8a8a]">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    id={distanceId}
                    name="calcDistance"
                    inputMode="decimal"
                    placeholder="Ex.: 3,5"
                    autoComplete="off"
                    value={distanceInput}
                    aria-invalid={error ? 'true' : undefined}
                    aria-errormessage={error ? errorId : undefined}
                    aria-describedby={error ? errorId : undefined}
                    onChange={(e) => handleDistanceChange(e.target.value)}
                    onBlur={handleDistanceBlur}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        handleCalculate();
                      }
                    }}
                    className={`form-input !py-3.5 !px-4 text-lg font-semibold ${
                      error ? '!border-[#ff8a8a]' : ''
                    }`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-muted pointer-events-none">
                    km
                  </span>
                </div>
                {error && (
                  <div
                    id={errorId}
                    role="alert"
                    className="text-[#ff8a8a] text-[0.82rem] mt-2 font-semibold"
                  >
                    {error}
                  </div>
                )}
              </div>

              <fieldset className="border-none p-0 mt-6 mb-0">
                <legend className="font-bold text-[0.92rem] text-white mb-3 p-0">
                  Adicionais opcionais
                </legend>
                <div className="space-y-2.5">
                  {EXTRAS_LIST.map((extra) => {
                    const checked = selectedExtras.includes(extra.key);
                    const priceLabel =
                      extra.key === 'wait'
                        ? `(${formatBRL(extra.price)} a cada 15 min)`
                        : `(${formatBRL(extra.price)})`;

                    return (
                      <label
                        key={extra.key}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-[0.95rem] cursor-pointer transition-all ${
                          checked
                            ? 'bg-brand-orange/10 border-brand-orange text-white'
                            : 'bg-navy-card border-white/[0.08] text-white hover:border-white/20'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name={`extra_${extra.key}`}
                          checked={checked}
                          onChange={() => toggleExtra(extra.key)}
                          className="w-5 h-5 rounded accent-brand-orange cursor-pointer focus-ring shrink-0"
                        />
                        <span className="flex-1 flex justify-between items-center gap-2">
                          <span>{extra.shortLabel}</span>
                          <strong className="text-brand-yellow font-bold text-sm whitespace-nowrap">
                            {priceLabel}
                          </strong>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={handleCalculate}
                className="w-full mt-6 btn-accent !py-4 !text-base focus-ring"
              >
                Calcular entrega
              </button>
            </div>

            {result && (
              <div
                key={animKey}
                aria-live="polite"
                className="bg-navy border-2 border-brand-orange rounded-[26px] p-6 sm:p-8 shadow-hover animate-fade-up flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="text-xl font-bold text-white m-0">Resumo do cálculo</h3>
                    <span className="pill text-xs !py-1 !px-2.5">Cotação Pronta</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {result.lines.map((line) => (
                      <div
                        key={line.id}
                        className="flex justify-between items-start gap-3 text-white text-[0.95rem]"
                      >
                        <span>
                          <span className="font-medium">{line.label}</span>
                          {line.subLabel && (
                            <small className="block text-brand-muted text-xs mt-0.5">
                              {line.subLabel}
                            </small>
                          )}
                        </span>
                        <span className="font-bold text-white whitespace-nowrap">
                          {formatBRL(line.amount)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-white/10 my-5" />

                  <div className="flex justify-between items-baseline gap-3 flex-wrap bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <span className="font-extrabold text-brand-yellow text-sm tracking-wider">
                      TOTAL ESTIMADO
                    </span>
                    <strong className="text-3xl sm:text-4xl font-extrabold text-brand-orange leading-none">
                      {formatBRL(result.total)}
                    </strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="btn-wa-green flex-1 !py-3.5 focus-ring"
                  >
                    Enviar no WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-ghost !py-3.5 focus-ring"
                  >
                    Novo cálculo
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-brand-muted text-center mt-6">
            Valores de exemplo calculados para Planalto e região. Confirmação imediata no WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
};
