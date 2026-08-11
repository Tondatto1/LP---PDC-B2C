import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_STATS } from '../data/agroData';
import LightRays from './LightRays';
import LogoLoop, { LogoItem } from './LogoLoop';

interface HeroSectionProps {
  onOpenCtaModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCtaModal }) => {
  const statItems = useMemo<LogoItem[]>(
    () =>
      HERO_STATS.map((stat, idx) => ({
        node: (
          <div
            key={idx}
            className="flex flex-col items-center justify-center text-center px-6 sm:px-10 py-1"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-600 tracking-tight whitespace-nowrap">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 whitespace-nowrap">
              {stat.label}
            </div>
          </div>
        ),
      })),
    []
  );

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-0 bg-gradient-to-b from-emerald-50/30 via-blue-50/20 to-white text-slate-900 overflow-hidden flex flex-col justify-between border-b border-slate-200/80">
      
      {/* LightRays Animated Background (Fundo da Primeira Sessão) */}
      <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#34d399"
          raysSpeed={0.8}
          lightSpread={0.8}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.12}
          noiseAmount={0.01}
          distortion={0.1}
          pulsating={true}
          fadeDistance={1.2}
          saturation={1.0}
        />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-2 sm:py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* 1° Imagem (Mobile Only: order-1, Hidden on desktop lg) */}
            <div className="order-1 lg:hidden w-full max-w-xl mx-auto my-1">
              <div className="relative mx-auto w-full group">
                {/* Ambient Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-emerald-500/20 rounded-xl blur-lg opacity-70"></div>
                
                {/* Frame */}
                <div className="relative bg-white p-1 rounded-xl border border-slate-200/90 shadow-xl shadow-emerald-950/10 overflow-hidden">
                  <div className="relative overflow-hidden rounded-lg border border-slate-200/60 bg-slate-100 aspect-[16/10]">
                    <img
                      src="/imagens/cerutti_turma.png"
                      alt="Capacitação Comercial Cerutti"
                      className="w-full h-full object-cover object-center rounded-lg"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/imagens/cerutti_turma.png.jpeg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2° Headline (order-2 on mobile, lg:order-1 on desktop) */}
            <h1 className="order-2 lg:order-1 text-2xl sm:text-4xl lg:text-[57px] font-black tracking-tight text-slate-900 leading-tight lg:leading-[67.2px] uppercase">
              Seu time comercial vendendo até <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent italic">5x mais</span> com nosso <span className="underline decoration-emerald-600 decoration-3 lg:decoration-4 underline-offset-4">método 21 em 7</span>
            </h1>

            {/* 3° Subheadline Badges (order-3 on mobile, lg:order-2 on desktop) */}
            <div className="order-3 lg:order-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-100 via-teal-100 to-blue-100 border border-emerald-300/80 text-emerald-950 font-black text-xs sm:text-sm shadow-xs uppercase tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shrink-0"></span>
                <span>19° TURMA</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-100 via-teal-100 to-blue-100 border border-emerald-300/80 text-emerald-950 font-black text-xs sm:text-sm shadow-xs uppercase tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600 shrink-0"></span>
                <span>SOMENTE 40 ALUNOS</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-100 via-teal-100 to-blue-100 border border-emerald-300/80 text-emerald-950 font-black text-xs sm:text-sm shadow-xs uppercase tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                <span>INÍCIO NO DIA 10 DE SETEMBRO</span>
              </div>
            </div>

            {/* 4° Botão (order-4 on mobile, lg:order-3 on desktop) */}
            <div className="order-4 lg:order-3 pt-2 w-full flex flex-col items-center lg:items-start justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenCtaModal}
                className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base sm:text-lg uppercase tracking-tight rounded-xl border border-emerald-300/60 ring-2 ring-emerald-500/20 shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"></div>
                <span>REALIZAR INSCRIÇÃO!</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform text-white" />
              </button>
            </div>
          </div>

          {/* Right Column: Desktop Framed Image (Hidden on mobile < lg) */}
          <div className="hidden lg:flex lg:col-span-7 w-full justify-end">
            <div className="relative mx-auto lg:ml-auto w-full group max-w-2xl lg:max-w-none">
              {/* Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-emerald-500/20 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>
              
              {/* Rectangular Thin Frame */}
              <div className="relative bg-white p-1 sm:p-1.5 rounded-xl border border-slate-200/90 shadow-2xl shadow-emerald-950/10 overflow-hidden">
                <div className="relative overflow-hidden rounded-lg border border-slate-200/60 bg-slate-100 aspect-[16/10.5]">
                  <img
                    src="/imagens/cerutti_turma.png"
                    alt="Capacitação Comercial Cerutti"
                    className="w-full h-full object-cover object-center rounded-lg transform group-hover:scale-[1.015] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/imagens/cerutti_turma.png.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Key Stats Counter Bar - Infinite Loop Marquee */}
      <div className="relative z-10 w-full border-t border-slate-200/80 bg-white/90 backdrop-blur-md py-5 mt-auto shadow-xs overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <LogoLoop
            logos={statItems}
            speed={40}
            direction="left"
            gap={32}
            pauseOnHover={true}
            scaleOnHover={false}
            fadeOut={true}
            fadeOutColor="rgba(255, 255, 255, 0.9)"
            ariaLabel="Estatísticas de impacto do Método PCP"
          />
        </div>
      </div>

    </section>
  );
};

