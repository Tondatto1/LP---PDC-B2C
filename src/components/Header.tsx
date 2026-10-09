import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame, Clock, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenCtaModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCtaModal }) => {
  const [scrolled, setScrolled] = useState(false);

  // Cronômetro para o dia 30/10 às 23:59:59
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      // Mês é 0-indexado: 9 = Outubro (30 de Outubro às 23:59:59)
      let target = new Date(currentYear, 9, 30, 23, 59, 59);

      if (now.getTime() > target.getTime()) {
        target = new Date(currentYear + 1, 9, 30, 23, 59, 59);
      }

      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/98 backdrop-blur-md border-b border-amber-500/20 shadow-xl shadow-black/50 py-2 sm:py-2.5' 
          : 'bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-900/80 border-b border-slate-800/60 py-2.5 sm:py-3.5 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Cronômetro Destacado no Header */}
          <div className="flex items-center gap-2 sm:gap-3.5 flex-1 min-w-0">
            {/* Badge de Alerta com Pulso / Chama */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-xl blur-[2px] opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              <div className="relative inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-400/50 text-amber-300 shadow-md">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 animate-bounce" />
                <span className="font-black text-[11px] sm:text-xs tracking-wider uppercase whitespace-nowrap text-amber-300 drop-shadow-[0_1px_4px_rgba(245,158,11,0.5)]">
                  OFERTA ATÉ 30/10:
                </span>
              </div>
            </div>

            {/* Contador em Blocos de Alto Destaque e Contraste */}
            <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border-2 border-amber-400/60 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.25)] shrink-0">
              {/* Dias */}
              <div className="flex flex-col items-center">
                <span className="font-black text-sm sm:text-base tabular-nums text-white px-1 sm:px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700/80 shadow-inner">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-amber-400 font-extrabold mt-0.5">dias</span>
              </div>

              <span className="text-amber-400 font-black text-sm sm:text-base pb-3 animate-pulse">:</span>

              {/* Horas */}
              <div className="flex flex-col items-center">
                <span className="font-black text-sm sm:text-base tabular-nums text-white px-1 sm:px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700/80 shadow-inner">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-amber-400 font-extrabold mt-0.5">horas</span>
              </div>

              <span className="text-amber-400 font-black text-sm sm:text-base pb-3 animate-pulse">:</span>

              {/* Minutos */}
              <div className="flex flex-col items-center">
                <span className="font-black text-sm sm:text-base tabular-nums text-white px-1 sm:px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700/80 shadow-inner">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-amber-400 font-extrabold mt-0.5">min</span>
              </div>

              <span className="text-amber-400 font-black text-sm sm:text-base pb-3 animate-pulse">:</span>

              {/* Segundos */}
              <div className="flex flex-col items-center">
                <span className="font-black text-sm sm:text-base tabular-nums text-emerald-400 px-1 sm:px-1.5 py-0.5 rounded bg-slate-800/90 border border-emerald-500/40 shadow-inner">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-extrabold mt-0.5">seg</span>
              </div>
            </div>

            {/* Aviso de ÚLTIMAS VAGAS para telas maiores */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-bold animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
              <span>ÚLTIMAS VAGAS DISPONÍVEIS</span>
            </div>
          </div>

          {/* Botão de Ação CTA Direto para o Checkout */}
          <div className="flex items-center shrink-0">
            <button
              onClick={onOpenCtaModal}
              className="relative group px-4 sm:px-6 py-2.5 sm:py-2.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-emerald-300/60 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">GARANTIR VAGA!</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
