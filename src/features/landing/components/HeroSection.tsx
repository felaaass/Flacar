import React from 'react';
import { BrandEmblem } from '@/components/ui/BrandLogo';
import { buildWhatsAppUrl } from '@/config/business';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-section pt-10 pb-16 lg:pt-14 lg:pb-24 relative overflow-hidden" id="inicio">
      <div className="shell-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-3.5 mb-6">
              <BrandEmblem className="w-12 h-12 shrink-0 drop-shadow-[0_4px_16px_rgba(255,107,0,0.35)]" decorative />
              <div className="flex flex-col">
                <span className="font-extrabold text-[1.4rem] tracking-[0.02em] text-white leading-none">
                  FLACAR
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="h-[2px] w-4 bg-brand-yellow rounded-full" />
                  <span className="text-[0.68rem] font-bold tracking-[0.25em] text-brand-orange">
                    ENTREGAS
                  </span>
                  <span className="h-[2px] w-4 bg-brand-yellow rounded-full" />
                </div>
              </div>
            </div>

            <div className="pill mb-4">
              <span className="pill-dot" />
              <span>Motoboys disponíveis agora na sua região</span>
            </div>

            <h1 className="text-[clamp(2.1rem,4.2vw,3.3rem)] leading-[1.12] font-extrabold tracking-[-0.02em] text-white my-3 text-balance">
              Sua loja entrega mais rápido,{' '}
              <span className="text-brand-orange">com quem você conhece</span>
            </h1>

            <p className="text-[1.05rem] lg:text-[1.12rem] text-brand-muted max-w-[560px] leading-relaxed mb-7">
              Motoboy fixo de confiança, contato direto por WhatsApp e acompanhamento de uma pessoa
              real. Para padarias, mercadinhos, papelarias e pet shops da sua cidade.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a href="#pedir" className="btn-accent !py-3.5 !px-7 !text-base">
                Solicitar entrega
              </a>
              <a
                href={buildWhatsAppUrl('Olá! Quero uma entrega pela Flacar.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-green !py-3.5 !px-6 !text-base focus-ring"
              >
                Falar no WhatsApp
              </a>
            </div>

            <p className="text-[0.84rem] text-brand-muted mt-4">
              Atendimento de segunda a sexta, das 8h às 18h.
            </p>
          </div>

          <div className="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none">
            <div className="relative bg-navy-card rounded-[28px] p-6 sm:p-7 shadow-hover border border-white/[0.08] backdrop-blur-sm">
              <span className="absolute -top-3.5 right-6 bg-brand-orange text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-orange tracking-wide uppercase">
                Coleta em até 30 min
              </span>

              <div className="moto-stage h-[220px] sm:h-[260px] rounded-[22px] overflow-hidden relative grid place-items-center border border-white/[0.05]">
                <BrandEmblem
                  className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] relative z-10 animate-brand-in drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
                  decorative
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
                <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-navy/90 border border-white/[0.06] transition-all hover:-translate-y-0.5 hover:border-brand-orange/30">
                  <span className="w-8 h-8 rounded-lg bg-brand-orange/15 text-brand-orange grid place-items-center mb-0.5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <strong className="text-[0.88rem] text-white leading-tight">
                    Motoboy fixo
                  </strong>
                  <span className="text-[0.76rem] text-brand-muted leading-snug">
                    Sempre a mesma pessoa na sua loja
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-navy/90 border border-white/[0.06] transition-all hover:-translate-y-0.5 hover:border-brand-orange/30">
                  <span className="w-8 h-8 rounded-lg bg-brand-orange/15 text-brand-orange grid place-items-center mb-0.5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  <strong className="text-[0.88rem] text-white leading-tight">
                    Contato direto
                  </strong>
                  <span className="text-[0.76rem] text-brand-muted leading-snug">
                    Pessoa real no WhatsApp
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-navy/90 border border-white/[0.06] transition-all hover:-translate-y-0.5 hover:border-brand-orange/30">
                  <span className="w-8 h-8 rounded-lg bg-brand-orange/15 text-brand-orange grid place-items-center mb-0.5">
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
                  <strong className="text-[0.88rem] text-white leading-tight">
                    Em até 30 min
                  </strong>
                  <span className="text-[0.76rem] text-brand-muted leading-snug">
                    Segunda a sexta, até as 18h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
