import React from 'react';
import { HORARIO_TEXTO } from '@/config/business';

interface StatusBannerProps {
  isOpen: boolean;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({ isOpen }) => {
  if (isOpen) {
    return (
      <div
        className="sticky top-0 z-[49] flex items-center justify-center gap-2.5 flex-wrap px-4 py-2 text-center text-[0.86rem] font-semibold border-b border-white/[0.08] bg-[#0f3d2e] text-[#d1fae5] transition-colors"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex items-center gap-2">
          <span className="pulse-dot" aria-hidden="true" />
          <span>Estamos atendendo agora · {HORARIO_TEXTO}</span>
        </span>
      </div>
    );
  }

  return (
    <div
      className="sticky top-0 z-[49] flex items-center justify-center gap-2.5 flex-wrap px-4 py-2 text-center text-[0.86rem] font-semibold border-b border-[#FF6B00]/45 bg-[#FF6B00]/16 text-[#ffd7b5] transition-colors"
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex items-center gap-2">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
          className="shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>Estamos fora do horário de atendimento · {HORARIO_TEXTO}</span>
      </span>
      <small className="block w-full font-medium text-[0.8rem] opacity-90">
        Deixe seu pedido — respondemos no próximo horário útil.
      </small>
    </div>
  );
};
