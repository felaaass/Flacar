import React from 'react';
import { buildWhatsAppUrl } from '@/config/business';

export const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 30,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={buildWhatsAppUrl('Olá! Quero pedir uma entrega pela Flacar.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Flacar no WhatsApp"
      className="wa-float focus-ring"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
};
