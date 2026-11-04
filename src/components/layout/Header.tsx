import React, { useState } from 'react';
import { CompactLogo } from '@/components/ui/BrandLogo';

const NAV_ITEMS = [
  { href: '#inicio', label: 'Início' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#para-sua-loja', label: 'Para sua loja' },
  { href: '#precos', label: 'Preços' },
  { href: '#pedir', label: 'Pedir agora' },
] as const;

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0D1B2A]/90 backdrop-blur-md border-b border-white/[0.08]">
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <div className="shell-container flex items-center justify-between gap-4 h-20">
        <a
          href="#inicio"
          className="inline-flex items-center gap-3 no-underline text-white focus-ring rounded-xl py-1 transition-opacity hover:opacity-90"
        >
          <CompactLogo size="md" />
        </a>

        <nav
          id="mainNav"
          aria-label="Principal"
          className="hidden md:flex items-center gap-7 lg:gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link py-1.5 focus-ring"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#pedir"
            className="btn-accent !py-2.5 !px-5 !text-[0.92rem] focus-ring"
          >
            Pedir entrega
          </a>

          <button
            type="button"
            className="inline-flex md:hidden items-center justify-center rounded-xl border border-white/[0.12] p-2.5 text-brand-muted hover:text-white cursor-pointer bg-white/[0.03] focus-ring"
            aria-expanded={menuOpen}
            aria-controls="mobileNav"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobileNav"
          className="md:hidden border-t border-white/[0.08] bg-[#0D1B2A]/95 backdrop-blur-xl px-5 py-3 animate-fade-up"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 px-2 text-white font-semibold text-[0.95rem] border-b border-white/[0.06] last:border-none focus-ring rounded"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
