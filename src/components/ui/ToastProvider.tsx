import React, { createContext, useCallback, useContext, useState } from 'react';

export type ToastVariant = 'default' | 'success' | 'error';

export interface ToastItem {
  id: number;
  title?: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, options?: { title?: string; variant?: ToastVariant }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (message: string, options?: { title?: string; variant?: ToastVariant }) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const nextToast: ToastItem = {
        id,
        message,
        title: options?.title,
        variant: options?.variant ?? 'default',
      };
      setToasts((prev) => [...prev, nextToast]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 4200);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed right-4 bottom-24 z-[70] flex flex-col-reverse gap-2 w-[min(360px,calc(100vw-32px))] pointer-events-none"
        role="region"
        aria-label="Notificações do sistema"
        aria-live="polite"
      >
        {toasts.map((toast) => {
          const borderClass =
            toast.variant === 'success'
              ? 'border-l-4 border-l-emerald-400'
              : toast.variant === 'error'
                ? 'border-l-4 border-l-red-400'
                : 'border-l-4 border-l-brand-orange';

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto rounded-xl border border-white/10 bg-[#181C23] px-4 py-3 text-white shadow-soft transition-all ${borderClass}`}
            >
              {toast.title && (
                <p className="text-sm font-bold text-white mb-0.5">{toast.title}</p>
              )}
              <p className="text-[13px] text-brand-muted leading-snug">{toast.message}</p>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser utilizado dentro de um ToastProvider');
  }
  return context;
}
