import React, { useState, useEffect } from 'react';
import { Sprout, PhoneCall, Menu, X, ArrowRight } from 'lucide-react';
import GooeyNav from './GooeyNav';

interface HeaderProps {
  onOpenCtaModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCtaModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let tick = false;
    const handleScroll = () => {
      if (!tick) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled(prev => (prev !== isScrolled ? isScrolled : prev));
          tick = false;
        });
        tick = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Para Quem É', href: '#para-quem-e' },
    { label: 'Depoimentos', href: '#o-que-dizem' },
    { label: 'Empresas', href: '#empresas' },
    { label: 'Quem Somos', href: '#quem-somos' },
    { label: 'Entregáveis', href: '#planos' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md py-2.5' 
          : 'bg-gradient-to-b from-white/95 via-white/80 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center group py-1 shrink-0">
            <img 
              src="/imagens/logo_letra_preta_trans_hor.png" 
              alt="AGRO MÉTODO PCP Logo" 
              className="h-8 sm:h-10 lg:h-11 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-sm"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.dataset.fallbackTried) {
                  target.dataset.fallbackTried = 'true';
                  target.src = '/imagens/logo-letra-preta-trans-hor.png';
                }
              }}
            />
          </a>

          {/* Center Announcement Bar */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-4">
            <div className="inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full bg-slate-900/95 text-white border border-slate-800 shadow-md text-sm xl:text-base font-extrabold tracking-tight w-full">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-black tracking-wide uppercase">65% DAS INSCRIÇÕES REALIZADAS</span>
              <span className="text-slate-600 font-light">|</span>
              <span className="text-amber-300 font-black uppercase">ÚLTIMOS DIAS COM 45% OFF</span>
            </div>
          </div>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3 xl:gap-4 shrink-0">
            <button
              onClick={onOpenCtaModal}
              className="px-5 xl:px-6 py-2.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs xl:text-sm uppercase tracking-wider rounded-xl border border-emerald-300/60 ring-2 ring-emerald-500/20 shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
            >
              <span>REALIZAR INSCRIÇÃO!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCtaModal}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-[11px] uppercase rounded-lg border border-emerald-300/60 ring-1 ring-emerald-500/20 shadow-sm"
            >
              REALIZAR INSCRIÇÃO!
            </button>
          </div>
        </div>

        {/* Mobile Banner underneath header on smaller screens */}
        <div className="mt-2 block lg:hidden text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/95 text-white text-[11px] font-extrabold w-full sm:w-auto shadow-sm">
            <span className="text-emerald-400 font-black">65% DAS INSCRIÇÕES REALIZADAS</span>
            <span className="text-slate-500">|</span>
            <span className="text-amber-300 font-black">ÚLTIMOS DIAS COM 45% OFF</span>
          </div>
        </div>
      </div>
    </header>
  );
};
