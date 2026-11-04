import React from 'react';
import { WHATSAPP_EXIBICAO, buildWhatsAppUrl } from '@/config/business';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'Erro inesperado na interface.',
    };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-navy text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-navy-card border border-white/10 rounded-3xl p-8 text-center shadow-soft">
            <h1 className="text-2xl font-extrabold mb-3">Ops, algo deu errado</h1>
            <p className="text-brand-muted text-sm mb-6">
              Ocorreu um problema ao carregar esta seção ({this.state.errorMessage}). Você pode
              recarregar a página ou pedir sua entrega diretamente pelo WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-accent"
              >
                Recarregar página
              </button>
              <a
                href={buildWhatsAppUrl('Olá! Quero pedir uma entrega pela Flacar.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                WhatsApp {WHATSAPP_EXIBICAO}
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
