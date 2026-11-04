import React from 'react';
import { WhatsAppIcon } from '@/components/layout/FloatingWhatsApp';
import { CompactLogo } from '@/components/ui/BrandLogo';
import {
  EMAIL_CONTATO,
  ENDERECO,
  HORARIO_EXTENSO,
  WHATSAPP_EXIBICAO,
  buildWhatsAppUrl,
} from '@/config/business';

interface FooterProps {
  isOpen: boolean;
  onOpenPromo?: () => void;
  onOpenPrivacyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  isOpen,
  onOpenPromo,
  onOpenPrivacyModal,
}) => {
  const whatsappCleanUrl = buildWhatsAppUrl('Olá! Quero pedir uma entrega pela Flacar.');

  return (
    <footer
      className="bg-navy-deep text-brand-muted pt-14 pb-7 border-t border-white/[0.08]"
      id="contato"
    >
      <div className="shell-container">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-[30px]">
          <div>
            <div className="mb-3">
              <CompactLogo size="sm" />
            </div>
            <p className="text-[0.92rem] text-brand-muted mb-3">
              Entregas rápidas de moto para o comércio local, com atendimento próximo e confiável.
            </p>
            <div className="flex gap-2.5 mt-3">
              <a
                href={whatsappCleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chamar Flacar no WhatsApp"
                className="w-[38px] h-[38px] rounded-xl bg-white/[0.08] grid place-items-center text-white transition-all hover:bg-brand-orange hover:-translate-y-0.5 focus-ring"
              >
                <WhatsAppIcon size={18} />
              </a>
              <a
                href={`mailto:${EMAIL_CONTATO}`}
                aria-label="Enviar e-mail para Flacar"
                className="w-[38px] h-[38px] rounded-xl bg-white/[0.08] grid place-items-center text-white transition-all hover:bg-brand-orange hover:-translate-y-0.5 focus-ring"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="22 6 12 13 2 6" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-3">Contato</h4>
            <ul className="space-y-2 text-[0.92rem]">
              <li className="flex items-center gap-2">
                <span className="text-brand-orange shrink-0">
                  <WhatsAppIcon size={18} />
                </span>
                <span>
                  WhatsApp:{' '}
                  <a
                    href={whatsappCleanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange hover:underline font-semibold focus-ring rounded"
                  >
                    {WHATSAPP_EXIBICAO}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FF6B00"
                  strokeWidth="2.2"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="22 6 12 13 2 6" />
                </svg>
                <a
                  href={`mailto:${EMAIL_CONTATO}`}
                  className="text-[#E2E8F0] hover:text-brand-orange hover:underline break-all focus-ring rounded"
                >
                  {EMAIL_CONTATO}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FF6B00"
                  strokeWidth="2.2"
                  aria-hidden="true"
                  className="shrink-0 mt-0.5"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-[#E2E8F0]">{ENDERECO}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-3">Horário de funcionamento</h4>
            <ul className="space-y-1.5 text-[0.92rem]">
              <li className="flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FF6B00"
                  strokeWidth="2.2"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <strong className="text-white">{HORARIO_EXTENSO}</strong>
              </li>
            </ul>
            <div
              className={`inline-flex items-center gap-2 font-bold text-[0.85rem] mt-2.5 ${
                isOpen ? 'text-[#86efac]' : 'text-brand-yellow'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full inline-block ${
                  isOpen ? 'bg-[#22c55e]' : 'bg-brand-orange'
                }`}
              />
              <span>{isOpen ? 'Aberto agora' : 'Fechado agora'}</span>
            </div>
          </div>
        </div>

        <div className="mt-[34px] pt-5 border-t border-white/[0.08] text-[0.82rem] text-brand-muted flex flex-wrap justify-between items-center gap-3">
          <span>© {new Date().getFullYear()} Flacar Entregas. Todos os direitos reservados.</span>
          <div className="flex items-center gap-4 flex-wrap">
            {onOpenPrivacyModal && (
              <button
                type="button"
                onClick={onOpenPrivacyModal}
                className="text-brand-muted hover:text-white hover:underline bg-transparent border-none cursor-pointer focus-ring rounded"
              >
                Aviso de Privacidade (LGPD)
              </button>
            )}
            {onOpenPromo && (
              <button
                type="button"
                onClick={onOpenPromo}
                className="text-brand-orange hover:underline font-semibold bg-transparent border-none cursor-pointer focus-ring rounded"
              >
                Ver Página de Divulgação (Bio)
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
