import React, { useCallback, useId, useRef, useState } from 'react';
import { useToast } from '@/components/ui/ToastProvider';
import { CIDADES_ATENDIDAS, buildWhatsAppUrl } from '@/config/business';
import { readLocalStorage, writeLocalStorage } from '@/utils/storage';

const CUSTOM_CITIES_STORAGE_KEY = 'flacar_cidades_v1';

export const CoverageSection: React.FC = () => {
  const { showToast } = useToast();
  const addCityInputId = useId();
  const addCityErrorId = useId();
  const consultCityInputId = useId();

  const [cities, setCities] = useState<string[]>(() => {
    const saved = readLocalStorage<string[]>(CUSTOM_CITIES_STORAGE_KEY, []);
    if (Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
    return [...CIDADES_ATENDIDAS];
  });
  const [newCityInput, setNewCityInput] = useState('');
  const [cityError, setCityError] = useState('');
  const [consultCityName, setConsultCityName] = useState('');
  const cityInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddCity = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const cleaned = newCityInput.trim().replace(/\s+/g, ' ');
      if (!cleaned) {
        setCityError('Informe o nome da cidade para adicionar.');
        cityInputRef.current?.focus();
        return;
      }
      if (cleaned.length < 2) {
        setCityError('Digite um nome de cidade válido.');
        cityInputRef.current?.focus();
        return;
      }
      const alreadyExists = cities.some(
        (existing) => existing.toLocaleLowerCase('pt-BR') === cleaned.toLocaleLowerCase('pt-BR')
      );
      if (alreadyExists) {
        setCityError(`A cidade "${cleaned}" já está na lista.`);
        cityInputRef.current?.focus();
        return;
      }

      const nextCities = [...cities, cleaned];
      setCities(nextCities);
      writeLocalStorage(CUSTOM_CITIES_STORAGE_KEY, nextCities);
      setNewCityInput('');
      setCityError('');
      showToast(`Cidade "${cleaned}" adicionada com sucesso!`, { variant: 'success' });
      cityInputRef.current?.focus();
    },
    [cities, newCityInput, showToast]
  );

  const handleRemoveCity = useCallback(
    (cityToRemove: string) => {
      const nextCities = cities.filter((c) => c !== cityToRemove);
      setCities(nextCities);
      writeLocalStorage(CUSTOM_CITIES_STORAGE_KEY, nextCities);
      showToast(`Cidade "${cityToRemove}" removida.`);
    },
    [cities, showToast]
  );

  const handleResetDefaultCities = useCallback(() => {
    const defaults = [...CIDADES_ATENDIDAS];
    setCities(defaults);
    writeLocalStorage(CUSTOM_CITIES_STORAGE_KEY, defaults);
    setCityError('');
    showToast('Lista padrão de cidades restaurada.');
  }, [showToast]);

  const isDefaultList =
    cities.length === CIDADES_ATENDIDAS.length &&
    cities.every((city, index) => city === CIDADES_ATENDIDAS[index]);

  const consultTrimmed = consultCityName.trim();
  const consultWhatsAppUrl = buildWhatsAppUrl(
    consultTrimmed
      ? `Olá! Gostaria de consultar o valor de entrega para a cidade de ${consultTrimmed}.`
      : 'Olá! Gostaria de consultar o valor de entrega para outra cidade da região.'
  );

  return (
    <section className="py-20 bg-navy" id="cobertura">
      <div className="shell-container">
        <div className="section-head">
          <span className="eyebrow-badge">Cobertura</span>
          <h2 className="inline-flex items-center justify-center gap-2">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF6B00"
              strokeWidth="2.2"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>Cidades atendidas</span>
          </h2>
          <p>Atendemos estas cidades com coleta rápida e entrega no mesmo dia.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[26px]">
          <div className="card-soft">
            <form onSubmit={handleAddCity} noValidate className="mb-4">
              <label
                htmlFor={addCityInputId}
                className="block font-bold text-[0.88rem] mb-1.5 text-white"
              >
                Cadastrar cidade atendida
              </label>
              <div className="flex flex-wrap gap-2.5 items-center">
                <input
                  ref={cityInputRef}
                  id={addCityInputId}
                  name="newCity"
                  type="text"
                  placeholder="Ex.: Ampére"
                  value={newCityInput}
                  aria-invalid={cityError ? 'true' : undefined}
                  aria-errormessage={cityError ? addCityErrorId : undefined}
                  onChange={(e) => {
                    setNewCityInput(e.target.value);
                    if (cityError) {
                      setCityError('');
                    }
                  }}
                  className={`flex-1 min-w-[180px] px-3.5 py-2.5 rounded-xl border-[1.5px] text-[0.95rem] bg-navy text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-orange focus:shadow-[0_0_0_4px_rgba(255,107,0,0.25)] ${
                    cityError ? 'border-[#ff8a8a]' : 'border-white/[0.12]'
                  }`}
                />
                <button
                  type="submit"
                  className="btn-accent !py-2.5 !px-4 !text-[0.88rem] focus-ring"
                >
                  + Adicionar cidade
                </button>
              </div>
              {cityError && (
                <div
                  id={addCityErrorId}
                  role="alert"
                  className="text-[#ff8a8a] text-[0.8rem] mt-1.5 font-semibold"
                >
                  {cityError}
                </div>
              )}
            </form>

            <div className="flex flex-wrap gap-2.5">
              {cities.map((cidade) => {
                const isBaseCity = CIDADES_ATENDIDAS.includes(cidade);
                return (
                  <div
                    key={cidade}
                    className="px-3.5 py-2 rounded-full bg-navy border border-white/[0.08] text-[0.9rem] font-semibold text-white inline-flex items-center gap-2 transition-all hover:border-brand-orange"
                  >
                    <a
                      href={buildWhatsAppUrl(
                        `Olá! Vocês atendem em ${cidade}? Gostaria de fazer um pedido.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-brand-orange no-underline focus-ring rounded"
                    >
                      {cidade}
                    </a>
                    {!isBaseCity && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCity(cidade)}
                        aria-label={`Remover cidade ${cidade}`}
                        className="text-brand-muted hover:text-[#ff8a8a] bg-transparent border-none cursor-pointer text-sm leading-none px-1 focus-ring rounded"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[0.82rem] text-brand-muted">
              <span>
                {cities.length} {cities.length === 1 ? 'cidade atendida' : 'cidades atendidas'}
              </span>
              {!isDefaultList && (
                <button
                  type="button"
                  onClick={handleResetDefaultCities}
                  className="text-brand-orange hover:underline font-semibold bg-transparent border-none cursor-pointer focus-ring rounded"
                >
                  Restaurar cidades padrão
                </button>
              )}
            </div>
          </div>

          <div className="rounded-[22px] p-[26px] text-left shadow-soft border border-[#FF6B00]/40 bg-gradient-to-br from-[#102A43] to-[#0D1B2A]">
            <h3 className="text-[1.12rem] font-bold text-white mb-1.5">
              Precisa entregar em outra cidade? Também atendemos!
            </h3>
            <p className="text-[0.95rem] text-brand-muted mb-4">
              Para cidades fora desta lista, a entrega é possível com valor diferenciado, calculado
              conforme a distância. Consulte pelo WhatsApp.
            </p>
            <div className="mb-3.5">
              <label
                htmlFor={consultCityInputId}
                className="block font-bold text-[0.85rem] mb-1.5 text-white"
              >
                Qual cidade você deseja consultar? (opcional)
              </label>
              <input
                id={consultCityInputId}
                type="text"
                name="consultCityName"
                placeholder="Ex.: Francisco Beltrão"
                value={consultCityName}
                onChange={(e) => setConsultCityName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-[1.5px] border-white/[0.12] text-[0.95rem] bg-navy text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-orange focus:shadow-[0_0_0_4px_rgba(255,107,0,0.25)]"
              />
            </div>
            <a
              href={consultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (consultTrimmed) {
                  window.setTimeout(() => setConsultCityName(''), 300);
                }
              }}
              className="btn-accent focus-ring"
            >
              Consultar outra cidade
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
