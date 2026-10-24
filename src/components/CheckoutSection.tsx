import React from 'react';
import { 
  MessageCircle, 
  ArrowRight, 
  UserCheck
} from 'lucide-react';
import { usePartner } from '../context/PartnerContext';

export const CheckoutSection: React.FC = () => {
  const { activePartner } = usePartner();
  const WHATSAPP_URL = activePartner.whatsappUrl;

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // No mobile, redireciona diretamente no mesmo contexto para acionar o aplicativo
    // nativo do WhatsApp via Universal Link sem abrir aba em branco com erro
    const isMobile = typeof navigator !== 'undefined' && 
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768);
    if (isMobile) {
      e.preventDefault();
      window.location.href = WHATSAPP_URL;
    }
  };

  return (
    <section 
      id="checkout-section" 
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-emerald-50/40 via-teal-50/20 to-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200/80"
    >
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] lg:w-[900px] h-[550px] bg-gradient-to-r from-emerald-200/25 via-teal-200/25 to-blue-200/20 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Título Oficial da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            GARANTA SUA VAGA
          </h2>
        </div>

        {/* Card Único e Elegante */}
        <div className="bg-white rounded-3xl border-2 border-emerald-500/90 shadow-2xl shadow-emerald-900/10 p-6 sm:p-10 relative overflow-hidden ring-4 ring-emerald-500/10">
          
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
          
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Consultant Avatar / Icon cluster */}
            <div className="relative mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-100">
                <UserCheck className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              </div>
            </div>

            {/* Title & Consultant Notice */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase mb-6 sm:mb-8">
              Clique no botão abaixo.
            </h3>

            {/* High-Converting CTA Button */}
            <div className="w-full max-w-md">
              <a
                href={WHATSAPP_URL}
                onClick={handleWhatsAppClick}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full py-4 sm:py-5 px-6 sm:px-8 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white font-black text-base sm:text-lg uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-600/35 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-3 cursor-pointer text-center border border-emerald-300/60 overflow-hidden touch-manipulation"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 pointer-events-none" />
                <MessageCircle className="w-6 h-6 shrink-0 fill-current" />
                <span>QUERO VENDER MAIS!</span>
                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
