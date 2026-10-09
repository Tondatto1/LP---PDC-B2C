import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TargetSection } from './components/TargetSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TrustCompaniesSection } from './components/TrustCompaniesSection';
import { AboutUsSection } from './components/AboutUsSection';
import { PlanBuilderSection } from './components/PlanBuilderSection';
import { CheckoutSection } from './components/CheckoutSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState<string | undefined>();

  const handleOpenModal = (planName?: string) => {
    setSelectedPlanName(planName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlanName(undefined);
  };

  const handleScrollToCheckout = () => {
    const section = document.getElementById('checkout-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-blue-50/80 via-emerald-50/40 via-white to-slate-50 font-sans text-slate-900 antialiased selection:bg-emerald-600 selection:text-white scroll-smooth">
      {/* Top Fixed Header */}
      <Header onOpenCtaModal={handleScrollToCheckout} />

      <main className="w-full overflow-x-hidden">
        {/* 1ª SEÇÃO: Hero Banner */}
        <HeroSection onOpenCtaModal={handleScrollToCheckout} />

        {/* 2ª SEÇÃO: Para Quem É o Programa? */}
        <TargetSection onOpenCtaModal={handleScrollToCheckout} />

        {/* 3ª SEÇÃO: Como Funciona (Vídeo) */}
        <HowItWorksSection onOpenCtaModal={handleScrollToCheckout} />

        {/* 4ª SEÇÃO: O Que Dizem (Depoimentos) */}
        <TestimonialsSection onOpenCtaModal={handleScrollToCheckout} />

        {/* 5ª SEÇÃO: Empresas que Confiam em Nós */}
        <TrustCompaniesSection />

        {/* 6ª SEÇÃO: Quem Somos? */}
        <AboutUsSection onOpenCtaModal={handleScrollToCheckout} />

        {/* 7ª SEÇÃO: O Que Você Recebe */}
        <PlanBuilderSection onOpenCtaModal={handleScrollToCheckout} />

        {/* NOVA SEÇÃO: Checkout / Formas de Pagamento (posicionada abaixo de 'O que você recebe') */}
        <CheckoutSection />

        {/* 8ª SEÇÃO: FAQ */}
        <FaqSection onOpenCtaModal={handleScrollToCheckout} />
      </main>

      {/* RODAPÉ */}
      <Footer onOpenCtaModal={handleScrollToCheckout} />

      {/* Interactive Lead Proposal Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultPlan={selectedPlanName}
      />
    </div>
  );
}
