import React from 'react';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { StatusBanner } from '@/components/layout/StatusBanner';
import { CompactLogo, StackedHeroLogo } from '@/components/ui/BrandLogo';
import {
  CIDADES_ATENDIDAS,
  EMAIL_CONTATO,
  ENDERECO,
  EXTRAS_LIST,
  HORARIO_EXTENSO,
  TAXA_FIXA,
  VALOR_KM,
  WHATSAPP_EXIBICAO,
  buildWhatsAppUrl,
} from '@/config/business';
import { HowItWorksSection } from '@/features/landing/components/HowItWorksSection';
import { formatBRL } from '@/utils/formatters';

interface PromoPageProps {
  isOpen: boolean;
  onGoToMainSite: () => void;
}

export const PromoPage: React.FC<PromoPageProps> = ({ isOpen, onGoToMainSite }) => {
  const waUrl = buildWhatsAppUrl('Olá! Vi a página da Flacar Entregas e quero pedir uma entrega.');

  return (
    <div className="min-h-screen bg-navy text-white pb-20 sm:pb-0">
      <a href="#promo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <StatusBanner isOpen={isOpen} />

      <main id="promo-principal" tabIndex={-1}>
        <section className="hero-section py-14 text-center">
          <div className="shell-container max-w-2xl mx-auto">
            <StackedHeroLogo />
            <span className="pill mb-4">
              <span className="pill-dot" />
              <span>Entregas rápidas de moto na sua cidade</span>
            </span>
            <h1 className="text-[clamp(2rem,5vw,3.1rem)] leading-[1.12] font-extrabold my-4">
              Entregas rápidas de moto para sua loja ou empresa,{' '}
              <span className="text-brand-orange">sem mensalidade</span>
            </h1>
            <p className="text-[1.05rem] text-brand-muted mb-7">
              Motoboy fixo de confiança, coleta em até 30 minutos e atendimento direto com uma
              pessoa real pelo WhatsApp.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left mb-8">
              <div className="p-4 rounded-2xl bg-navy-card border border-white/[0.08]">
                <strong className="block text-white text-[0.92rem]">Motoboy identificado</strong>
                <span className="text-[0.8rem] text-brand-muted">
                  Confiança e cuidado em cada entrega
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-navy-card border border-white/[0.08]">
                <strong className="block text-white text-[0.92rem]">Coleta em até 30 min</strong>
                <span className="text-[0.8rem] text-brand-muted">
                  Agilidade de segunda a sexta, das 8h às 18h
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-navy-card border border-white/[0.08]">
                <strong className="block text-white text-[0.92rem]">Comprovante na hora</strong>
                <span className="text-[0.8rem] text-brand-muted">
                  Confirmação enviada direto no WhatsApp
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3.5">
              <button
                type="button"
                onClick={onGoToMainSite}
                className="btn-accent !py-3.5 !px-7 !text-base focus-ring"
              >
                Acessar o site e calcular entrega
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-green !py-3.5 !px-7 !text-base focus-ring"
              >
                Chamar no WhatsApp {WHATSAPP_EXIBICAO}
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-navy">
          <div className="shell-container">
            <div className="section-head">
              <span className="eyebrow-badge">Valores Transparentes</span>
              <h2>Quanto custa sua entrega</h2>
              <p>Sem taxa mensal e sem contrato. Você paga apenas quando solicitar.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              <div className="card-soft text-center border-2 border-brand-orange">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-yellow">
                  Valor Base
                </span>
                <div className="text-4xl font-extrabold text-brand-orange my-2">
                  {formatBRL(TAXA_FIXA)}
                </div>
                <p className="text-sm text-brand-muted">Taxa fixa de saída por coleta</p>
              </div>

              <div className="card-soft text-center border-2 border-brand-orange">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-yellow">
                  Distância
                </span>
                <div className="text-4xl font-extrabold text-brand-orange my-2">
                  + {formatBRL(VALOR_KM)}{' '}
                  <small className="text-base font-semibold text-brand-muted">/ km</small>
                </div>
                <p className="text-sm text-brand-muted">Adicionado por quilômetro rodado</p>
              </div>

              <div className="card-soft text-left">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-yellow block mb-2">
                  Taxas Extras Opcionais
                </span>
                <ul className="space-y-2 text-sm text-white">
                  {EXTRAS_LIST.map((extra) => (
                    <li key={extra.key} className="flex justify-between gap-2">
                      <span className="text-brand-muted">{extra.shortLabel}</span>
                      <strong className="text-brand-orange">{formatBRL(extra.price)}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <HowItWorksSection />

        <section className="py-16 bg-navy">
          <div className="shell-container max-w-4xl mx-auto">
            <div className="section-head">
              <span className="eyebrow-badge">Região de Atendimento</span>
              <h2>Cidades atendidas</h2>
              <p>Atendemos estas cidades com coleta rápida e entrega no mesmo dia.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {CIDADES_ATENDIDAS.map((cidade) => (
                <a
                  key={cidade}
                  href={buildWhatsAppUrl(
                    `Olá! Quero solicitar uma entrega em ${cidade} pela Flacar.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-navy-card border border-white/[0.08] text-base font-bold text-white hover:bg-brand-orange hover:border-brand-orange transition-all focus-ring"
                >
                  {cidade}
                </a>
              ))}
            </div>

            <div className="rounded-[22px] p-7 text-center border border-[#FF6B00]/40 bg-navy-card">
              <h3 className="text-xl font-bold text-white mb-2">
                Precisa entregar em outra cidade? Também atendemos!
              </h3>
              <p className="text-brand-muted text-[0.95rem] mb-5 max-w-xl mx-auto">
                Outras cidades são atendidas sob consulta, com valor diferenciado calculado pela
                distância.
              </p>
              <a
                href={buildWhatsAppUrl(
                  'Olá! Gostaria de consultar o valor de entrega para outra cidade.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Consultar outra cidade no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy-deep text-brand-muted py-12 border-t border-white/[0.08]">
        <div className="shell-container text-center max-w-xl mx-auto">
          <div className="flex justify-center mb-4">
            <CompactLogo size="md" />
          </div>
          <p className="text-white font-semibold mb-1">{HORARIO_EXTENSO}</p>
          <p className="text-sm mb-1">{ENDERECO}</p>
          <p className="text-sm mb-5">
            WhatsApp: {WHATSAPP_EXIBICAO} · E-mail: {EMAIL_CONTATO}
          </p>
          <button
            type="button"
            onClick={onGoToMainSite}
            className="btn-accent focus-ring"
          >
            Acessar o site completo de pedidos
          </button>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-navy-deep/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-2.5">
        <button
          type="button"
          onClick={onGoToMainSite}
          className="btn-accent flex-1 !py-3 !text-sm focus-ring"
        >
          Acessar o site
        </button>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa-green !py-3 !px-4 !text-sm focus-ring"
        >
          WhatsApp
        </a>
      </div>

      <FloatingWhatsApp />
    </div>
  );
};
