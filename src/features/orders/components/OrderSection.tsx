import React from 'react';
import { HORARIO_TEXTO } from '@/config/business';
import { formatBRL } from '@/utils/formatters';
import { maskPhoneNumber, maskStreetAddress } from '@/utils/privacyMask';
import { useOrders } from '../hooks/useOrders';

interface OrderSectionProps {
  isOpen: boolean;
  onOpenPrivacyModal: () => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({ isOpen, onOpenPrivacyModal }) => {
  const {
    values,
    invalidFields,
    distanceError,
    orders,
    estimate,
    filledRequiredCount,
    totalRequiredCount,
    progressPercent,
    lastOrderSummary,
    successBoxRef,
    isSubmitting,
    honeypotValue,
    privacyAgreed,
    privacyError,
    whatsAppSummaryUrl,
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
  } = useOrders(isOpen);

  return (
    <section className="py-20 bg-navy" id="pedir">
      <div className="shell-container">
        <div className="section-head">
          <span className="eyebrow-badge">Pedir entrega agora</span>
          <h2>Peça sua entrega em um minuto</h2>
          <p>Preencha os dados abaixo. Confirmamos tudo pelo WhatsApp antes de sair.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-[26px] items-start">
          <div>
            <form
              className="bg-navy-card rounded-[26px] p-[30px] shadow-hover border border-white/[0.08]"
              onSubmit={handleSubmit}
              noValidate
            >
              <div
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  padding: 0,
                  margin: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                  border: 0,
                }}
                aria-hidden="true"
              >
                <label htmlFor="order-field-website">Website (deixe em branco)</label>
                <input
                  type="text"
                  id="order-field-website"
                  name="user_website_trap"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypotValue}
                  onChange={(e) => setHoneypotValue(e.target.value)}
                />
              </div>

              {isOpen ? (
                <div className="flex gap-3 items-start px-4 py-3.5 rounded-2xl mb-5 text-[0.9rem] leading-normal bg-[#22c55e]/[0.08] border border-[#22c55e]/40 text-[#d1fae5]">
                  <span className="pulse-dot mt-1.5 shrink-0" aria-hidden="true" />
                  <div>
                    <strong className="block mb-0.5">Atendimento ativo agora</strong>
                    <span>Nossa equipe está respondendo pedidos neste momento.</span>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 items-start px-4 py-3.5 rounded-2xl mb-5 text-[0.9rem] leading-normal bg-navy border-[1.5px] border-brand-orange text-white">
                  <span className="text-brand-orange mt-0.5 shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <div>
                    <strong className="block mb-0.5">Estamos fora do horário</strong>
                    <span>
                      Seu pedido será respondido no próximo horário útil ({HORARIO_TEXTO}), mas o
                      formulário continua funcionando normalmente.
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="order-field-storeName"
                    className="block font-bold text-[0.9rem] mb-1.5 text-white"
                  >
                    Nome do comércio <span className="text-[#ff8a8a]">*</span>
                  </label>
                  <input
                    type="text"
                    id="order-field-storeName"
                    name="storeName"
                    placeholder="Ex.: Padaria Pão Quente"
                    autoComplete="organization"
                    value={values.storeName}
                    aria-invalid={invalidFields.storeName ? 'true' : undefined}
                    aria-errormessage={invalidFields.storeName ? 'err-storeName' : undefined}
                    aria-describedby="help-storeName"
                    onChange={(e) => handleFieldChange('storeName', e.target.value)}
                    onBlur={() => handleFieldBlur('storeName')}
                    className={`form-input ${invalidFields.storeName ? 'border-[#ff8a8a]' : ''}`}
                  />
                  <div id="help-storeName" className="text-[0.8rem] text-brand-muted mt-1">
                    Como seu estabelecimento é conhecido.
                  </div>
                  {invalidFields.storeName && (
                    <div
                      id="err-storeName"
                      role="alert"
                      className="text-[#ff8a8a] text-[0.8rem] mt-1 font-semibold"
                    >
                      Informe o nome do comércio.
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="order-field-personName"
                    className="block font-bold text-[0.9rem] mb-1.5 text-white"
                  >
                    Seu nome <span className="text-[#ff8a8a]">*</span>
                  </label>
                  <input
                    type="text"
                    id="order-field-personName"
                    name="personName"
                    placeholder="Ex.: Marina Souza"
                    autoComplete="name"
                    value={values.personName}
                    aria-invalid={invalidFields.personName ? 'true' : undefined}
                    aria-errormessage={invalidFields.personName ? 'err-personName' : undefined}
                    aria-describedby="help-personName"
                    onChange={(e) => handleFieldChange('personName', e.target.value)}
                    onBlur={() => handleFieldBlur('personName')}
                    className={`form-input ${invalidFields.personName ? 'border-[#ff8a8a]' : ''}`}
                  />
                  <div id="help-personName" className="text-[0.8rem] text-brand-muted mt-1">
                    Quem está fazendo o pedido.
                  </div>
                  {invalidFields.personName && (
                    <div
                      id="err-personName"
                      role="alert"
                      className="text-[#ff8a8a] text-[0.8rem] mt-1 font-semibold"
                    >
                      Informe seu nome.
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="order-field-phone"
                    className="block font-bold text-[0.9rem] mb-1.5 text-white"
                  >
                    WhatsApp <span className="text-[#ff8a8a]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="order-field-phone"
                    name="phone"
                    placeholder="(46) 99916-4146"
                    autoComplete="tel"
                    inputMode="tel"
                    value={values.phone}
                    aria-invalid={invalidFields.phone ? 'true' : undefined}
                    aria-errormessage={invalidFields.phone ? 'err-phone' : undefined}
                    aria-describedby="help-phone"
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    onBlur={() => handleFieldBlur('phone')}
                    className={`form-input ${invalidFields.phone ? 'border-[#ff8a8a]' : ''}`}
                  />
                  <div id="help-phone" className="text-[0.8rem] text-brand-muted mt-1">
                    Usaremos para confirmar o pedido.
                  </div>
                  {invalidFields.phone && (
                    <div
                      id="err-phone"
                      role="alert"
                      className="text-[#ff8a8a] text-[0.8rem] mt-1 font-semibold"
                    >
                      Informe um WhatsApp válido com DDD.
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="order-field-itemType"
                    className="block font-bold text-[0.9rem] mb-1.5 text-white"
                  >
                    Tipo de item <span className="text-[#ff8a8a]">*</span>
                  </label>
                  <select
                    id="order-field-itemType"
                    name="itemType"
                    value={values.itemType}
                    aria-invalid={invalidFields.itemType ? 'true' : undefined}
                    aria-errormessage={invalidFields.itemType ? 'err-itemType' : undefined}
                    aria-describedby="help-itemType"
                    onChange={(e) => {
                      handleFieldChange('itemType', e.target.value);
                    }}
                    onBlur={() => handleFieldBlur('itemType')}
                    className={`form-input ${invalidFields.itemType ? 'border-[#ff8a8a]' : ''}`}
                  >
                    <option value="">Selecione…</option>
                    <option value="documento">Documento</option>
                    <option value="comida">Comida</option>
                    <option value="compra">Compra / mercadoria</option>
                    <option value="outro">Outro</option>
                  </select>
                  <div id="help-itemType" className="text-[0.8rem] text-brand-muted mt-1">
                    Ajuda a escolher a bag certa.
                  </div>
                  {invalidFields.itemType && (
                    <div
                      id="err-itemType"
                      role="alert"
                      className="text-[#ff8a8a] text-[0.8rem] mt-1 font-semibold"
                    >
                      Escolha o tipo de item.
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="order-field-pickup"
                    className="block font-bold text-[0.9rem] mb-1.5 text-white"
                  >
                    Endereço de coleta <span className="text-[#ff8a8a]">*</span>
                  </label>
                  <input
                    type="text"
                    id="order-field-pickup"
                    name="pickup"
                    placeholder="Rua, número, cidade"
                    autoComplete="street-address"
                    value={values.pickup}
                    aria-invalid={invalidFields.pickup ? 'true' : undefined}
                    aria-errormessage={invalidFields.pickup ? 'err-pickup' : undefined}
                    aria-describedby="help-pickup"
                    onChange={(e) => handleFieldChange('pickup', e.target.value)}
                    onBlur={() => handleFieldBlur('pickup')}
                    className={`form-input ${invalidFields.pickup ? 'border-[#ff8a8a]' : ''}`}
                  />
                  <div id="help-pickup" className="text-[0.8rem] text-brand-muted mt-1">
                    Onde o motoboy vai buscar o pedido.
                  </div>
                  {invalidFields.pickup && (
                    <div
                      id="err-pickup"
                      role="alert"
                      className="text-[#ff8a8a] text-[0.8rem] mt-1 font-semibold"
                    >
                      Informe o endereço de coleta.
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="order-field-dropoff"
                    className="block font-bold text-[0.9rem] mb-1.5 text-white"
                  >
                    Endereço de entrega <span className="text-[#ff8a8a]">*</span>
                  </label>
                  <input
                    type="text"
                    id="order-field-dropoff"
                    name="dropoff"
                    placeholder="Rua, número, cidade"
                    autoComplete="off"
                    value={values.dropoff}
                    aria-invalid={invalidFields.dropoff ? 'true' : undefined}
                    aria-errormessage={invalidFields.dropoff ? 'err-dropoff' : undefined}
                    aria-describedby="help-dropoff"
                    onChange={(e) => handleFieldChange('dropoff', e.target.value)}
                    onBlur={() => handleFieldBlur('dropoff')}
                    className={`form-input ${invalidFields.dropoff ? 'border-[#ff8a8a]' : ''}`}
                  />
                  <div id="help-dropoff" className="text-[0.8rem] text-brand-muted mt-1">
                    Para onde o item deve ir.
                  </div>
                  {invalidFields.dropoff && (
                    <div
                      id="err-dropoff"
                      role="alert"
                      className="text-[#ff8a8a] text-[0.8rem] mt-1 font-semibold"
                    >
                      Informe o endereço de entrega.
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="order-field-distance"
                    className="block font-bold text-[0.9rem] mb-1.5 text-white"
                  >
                    Distância estimada (km)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    id="order-field-distance"
                    name="distance"
                    placeholder="Ex.: 4,5"
                    value={values.distance}
                    aria-invalid={distanceError ? 'true' : undefined}
                    aria-errormessage={distanceError ? 'err-distance' : undefined}
                    aria-describedby="help-distance"
                    onChange={(e) => handleFieldChange('distance', e.target.value)}
                    onBlur={handleDistanceBlur}
                    className={`form-input ${distanceError ? 'border-[#ff8a8a]' : ''}`}
                  />
                  <div id="help-distance" className="text-[0.8rem] text-brand-muted mt-1">
                    Opcional. Usamos para estimar a faixa de preço.
                  </div>
                  {distanceError && (
                    <div
                      id="err-distance"
                      role="alert"
                      className="text-[#ff8a8a] text-[0.8rem] mt-1 font-semibold"
                    >
                      {distanceError}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="order-field-orderNote"
                    className="block font-bold text-[0.9rem] mb-1.5 text-white"
                  >
                    Observações
                  </label>
                  <textarea
                    id="order-field-orderNote"
                    name="orderNote"
                    rows={3}
                    placeholder="Ex.: Pedido pronto às 14h, tocar interfone 302"
                    value={values.orderNote}
                    aria-describedby="help-orderNote"
                    onChange={(e) => handleFieldChange('orderNote', e.target.value)}
                    className="form-input resize-y"
                  />
                  <div id="help-orderNote" className="text-[0.8rem] text-brand-muted mt-1">
                    Instruções para o motoboy.
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3.5 rounded-xl bg-navy border border-white/10">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-brand-muted leading-relaxed">
                  <input
                    type="checkbox"
                    id="order-field-privacy"
                    checked={privacyAgreed}
                    onChange={(e) => {
                      setPrivacyAgreed(e.target.checked);
                    }}
                    className="w-4 h-4 mt-0.5 accent-brand-orange cursor-pointer focus-ring shrink-0"
                  />
                  <span>
                    Concordo com o tratamento dos dados informados exclusivamente para realização
                    desta entrega, conforme nosso{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onOpenPrivacyModal();
                      }}
                      className="text-brand-orange hover:underline font-bold bg-transparent border-none cursor-pointer p-0 inline focus-ring rounded"
                    >
                      Aviso de Privacidade (LGPD)
                    </button>
                    .
                  </span>
                </label>
                {privacyError && (
                  <p className="text-[#ff8a8a] text-xs font-semibold mt-2 mb-0">
                    Por favor, confirme a ciência da privacidade para solicitar a entrega.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mt-[22px] items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-accent min-w-[200px] focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processando...' : 'Confirmar pedido'}
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn-ghost focus-ring"
                >
                  Limpar campos
                </button>
              </div>

              {lastOrderSummary && (
                <div
                  ref={successBoxRef}
                  className="bg-navy-card border border-brand-orange rounded-[22px] p-[26px] mt-5 animate-fade-up"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-[52px] h-[52px] rounded-full bg-brand-orange text-white grid place-items-center mb-2.5">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="3"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-[1.15rem] font-bold text-white mb-1.5">Pedido recebido!</h3>
                  <p className="text-[0.8rem] text-brand-muted m-0">
                    Confira o resumo abaixo e envie no WhatsApp para confirmarmos com você. O
                    formulário acima já está limpo caso queira cadastrar outro pedido em seguida.
                  </p>
                  <pre className="whitespace-pre-wrap bg-navy rounded-[14px] p-4 font-sans text-[0.9rem] border border-white/[0.08] text-white my-3.5">
                    {lastOrderSummary}
                  </pre>
                  <div className="flex flex-wrap gap-3 items-center">
                    <a
                      href={whatsAppSummaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-wa-green focus-ring"
                    >
                      Enviar no WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="btn-ghost focus-ring"
                    >
                      Copiar resumo
                    </button>
                    <button
                      type="button"
                      onClick={handleStartNewOrder}
                      className="btn-accent focus-ring"
                    >
                      Fazer novo pedido
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-[26px] bg-navy-card rounded-[22px] p-[22px] border border-white/[0.08] shadow-soft">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <h3 className="m-0 text-[1.05rem] font-bold text-white">
                    Histórico de pedidos (Protegido por LGPD)
                  </h3>
                  <p className="text-[0.8rem] text-brand-muted mt-0.5 mb-0">
                    Dados sensíveis são mascarados neste dispositivo.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="pill">
                    {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
                  </span>
                  {orders.length > 0 && (
                    <button
                      type="button"
                      onClick={clearHistory}
                      className="text-xs text-brand-muted hover:text-[#ff8a8a] underline bg-transparent border-none cursor-pointer focus-ring rounded px-1"
                    >
                      Excluir dados locais
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-2.5 mt-3.5">
                {orders.length === 0 ? (
                  <div className="text-[0.8rem] text-brand-muted">
                    Nenhum pedido ainda. Seus pedidos aparecerão aqui.
                  </div>
                ) : (
                  orders
                    .slice()
                    .reverse()
                    .map((order) => (
                      <div
                        key={order.id}
                        className="flex justify-between items-center gap-3 flex-wrap px-3.5 py-3 rounded-[14px] bg-navy border border-white/[0.08]"
                      >
                        <div>
                          <strong className="block text-[0.95rem] text-white">
                            #{String(order.id).padStart(3, '0')} · {order.storeName}
                            <span className="text-xs font-normal text-brand-muted ml-2">
                              {maskPhoneNumber(order.phone)}
                            </span>
                          </strong>
                          <span className="text-[0.82rem] text-brand-orange">
                            {maskStreetAddress(order.pickup)} → {maskStreetAddress(order.dropoff)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="px-2.5 py-1 rounded-full text-[0.75rem] font-bold bg-brand-yellow/15 text-brand-yellow">
                            {order.status}
                          </span>
                          <span className="text-[0.85rem] font-semibold text-white">
                            {order.estimate !== null ? formatBRL(order.estimate) : 'A confirmar'}
                          </span>
                          <a
                            href={getOrderWhatsAppUrl(order)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-emerald-400 hover:underline focus-ring rounded px-1"
                          >
                            Reenviar no WhatsApp
                          </a>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>

          <aside
            className="bg-gradient-to-br from-[#102A43] to-[#0D1B2A] text-white rounded-[24px] p-7 shadow-hover lg:sticky lg:top-24 border border-white/[0.08]"
            aria-label="Resumo do valor estimado"
          >
            <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-brand-yellow">
              Valor estimado
            </span>
            <div className="text-[2.6rem] font-extrabold text-brand-orange my-1.5 leading-none">
              {estimate.displayText}
            </div>
            <div className="text-[0.85rem] text-brand-muted">{estimate.caption}</div>
            <div className="mt-[18px] p-3.5 rounded-[14px] bg-brand-orange/12 text-[0.88rem] text-white">
              {estimate.tint}
            </div>

            <div
              className="h-2 bg-white/12 rounded-full overflow-hidden mt-4"
              aria-hidden="true"
            >
              <div
                className="h-full bg-gradient-to-r from-brand-orange to-brand-yellow transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[0.78rem] text-brand-muted mt-1.5">
              Preencha {filledRequiredCount} de {totalRequiredCount} campos obrigatórios
            </div>

            <div className="flex flex-wrap gap-2 mt-[18px]">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[0.78rem] font-bold bg-white/10 text-[#fde68a] border border-white/12">
                Coleta em até 30 min
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[0.78rem] font-bold bg-white/10 text-[#fde68a] border border-white/12">
                Sem mensalidade
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
