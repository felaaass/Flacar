import React, { useEffect, useState } from 'react';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { StatusBanner } from '@/components/layout/StatusBanner';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { PrivacyModal } from '@/components/ui/PrivacyModal';
import { ToastProvider, useToast } from '@/components/ui/ToastProvider';
import { CalculatorSection } from '@/features/calculator/components/CalculatorSection';
import { CoverageSection } from '@/features/landing/components/CoverageSection';
import { FaqSection } from '@/features/landing/components/FaqSection';
import { ForYourStoreSection } from '@/features/landing/components/ForYourStoreSection';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { HowItWorksSection } from '@/features/landing/components/HowItWorksSection';
import { OrderSection } from '@/features/orders/components/OrderSection';
import { PromoPage } from '@/features/promo/components/PromoPage';
import { checkIsOpenNow } from '@/utils/businessHours';

const MainAppContent: React.FC = () => {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(() => checkIsOpenNow());
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'main' | 'promo'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#divulgacao' || hash === '#propaganda') {
        return 'promo';
      }
    }
    return 'main';
  });

  useEffect(() => {
    const updateStatus = () => {
      setIsOpen(checkIsOpenNow());
    };
    const intervalId = window.setInterval(updateStatus, 60000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#divulgacao' || hash === '#propaganda') {
        setViewMode('promo');
      } else if (hash === '#privacidade') {
        setIsPrivacyModalOpen(true);
      } else if (viewMode === 'promo' && hash === '#inicio') {
        setViewMode('main');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [viewMode]);

  useEffect(() => {
    const handleStorageError = () => {
      showToast('Não foi possível salvar no navegador. O pedido ainda pode ser enviado.', {
        variant: 'error',
      });
    };
    window.addEventListener('flacar:storage-error', handleStorageError);
    return () => window.removeEventListener('flacar:storage-error', handleStorageError);
  }, [showToast]);

  if (viewMode === 'promo') {
    return (
      <>
        <PromoPage
          isOpen={isOpen}
          onGoToMainSite={() => {
            window.history.pushState(null, '', '#inicio');
            setViewMode('main');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <PrivacyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />
      <main id="conteudo-principal" tabIndex={-1} className="focus:outline-none">
        <StatusBanner isOpen={isOpen} />
        <HeroSection />
        <HowItWorksSection />
        <ForYourStoreSection />
        <CalculatorSection />
        <OrderSection
          isOpen={isOpen}
          onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        />
        <CoverageSection />
        <FaqSection />
      </main>
      <Footer
        isOpen={isOpen}
        onOpenPromo={() => {
          window.history.pushState(null, '', '#divulgacao');
          setViewMode('promo');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
      />
      <FloatingWhatsApp />
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <MainAppContent />
      </ToastProvider>
    </ErrorBoundary>
  );
};
