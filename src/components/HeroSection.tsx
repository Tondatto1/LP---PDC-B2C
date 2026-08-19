import React, { useMemo } from 'react';
import { motion } from 'motion/react';
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
    <section className="relative min-h-[90vh] lg:min-h-screen pt-20 min-[380px]:pt-22 sm:pt-36 lg:pt-40 pb-0 bg-gradient-to-b from-emerald-50/30 via-blue-50/20 to-white text-slate-900 overflow-hidden flex flex-col justify-between border-b border-slate-200/80">
      
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
      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto pt-1 pb-4 sm:py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* 1° Headline (order-1 on mobile & desktop) */}
            <h1 className="order-1 text-[27px] min-[380px]:text-[30px] min-[420px]:text-3xl sm:text-4xl lg:text-[57px] font-black tracking-tight text-slate-900 leading-[1.18] sm:leading-tight lg:leading-[67.2px] uppercase">
              Seu time comercial vendendo até <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent italic">5x mais</span> com nosso <span className="underline decoration-emerald-600 decoration-3 lg:decoration-4 underline-offset-4">método 21 em 7</span>
            </h1>

            {/* 2° Imagem (Mobile Only: order-2, positioned between Headline & Subheadline, Hidden on desktop lg) */}
            <div className="order-2 lg:hidden w-full max-w-xl mx-auto my-1.5 [perspective:1000px]">
              <motion.div 
                className="relative mx-auto w-full group"
                initial={{ rotateY: -4, rotateX: 6, scale: 0.98 }}
                animate={{ 
                  rotateY: [-4, -1, -4],
                  rotateX: [6, 3, 6],
                  y: [-2, 2, -2]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Deep Ground Shadow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/30 via-teal-500/25 to-blue-600/30 rounded-2xl blur-xl opacity-80 transform translate-y-3 scale-95 pointer-events-none"></div>
                
                {/* 3D Extruded Layer / Bevel */}
                <div className="relative rounded-2xl p-[3px] bg-gradient-to-br from-white via-slate-100 to-slate-300 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.35),0_10px_20px_-5px_rgba(16,185,129,0.2)] border border-white/80">
                  
                  {/* Floating Top Badge (3D depth layer) */}
                  <div className="absolute -top-3 left-4 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/95 text-white text-[10px] font-black tracking-wide uppercase border border-slate-700/80 shadow-lg backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-400">ONLINE AO VIVO</span>
                  </div>

                  {/* Inner Screen Container */}
                  <div className="relative overflow-hidden rounded-xl border border-slate-300/70 bg-slate-950 aspect-[16/10]">
                    <img
                      src="/imagens/cerutti_turma_meet2.png"
                      alt="Capacitação Comercial Cerutti"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/imagens/Cerutti_turma_meet.jpeg';
                      }}
                    />
                    
                    {/* Glass Glare Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 3° Subheadline Badges (order-3 on mobile, lg:order-2 on desktop) */}
            <div className="order-3 lg:order-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 pt-1 w-full">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-100/90 via-teal-50 to-blue-50 border border-emerald-200 text-emerald-950 font-black text-xs min-[360px]:text-sm sm:text-sm shadow-2xs uppercase tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                <span>33° TURMA</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-100/90 via-teal-50 to-blue-50 border border-emerald-200 text-emerald-950 font-black text-xs min-[360px]:text-sm sm:text-sm shadow-2xs uppercase tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600 shrink-0"></span>
                <span>SOMENTE 40 ALUNOS</span>
              </div>
              
              {/* Highlighted 3rd Badge with Pulsing Ring, Ping and Standout Accent */}
              <motion.div
                animate={{
                  scale: [1, 1.035, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 font-black text-xs min-[360px]:text-sm sm:text-sm shadow-lg shadow-amber-500/30 border-2 border-amber-500 ring-2 ring-amber-400/60 uppercase tracking-wide"
              >
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <span className="font-black text-slate-950 tracking-tight">3° LOTE ENCERRA 04/09</span>
              </motion.div>
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

          {/* Right Column: Desktop Framed Image (Hidden on mobile < lg) with 3D Perspective */}
          <div className="hidden lg:flex lg:col-span-7 w-full justify-end [perspective:1400px]">
            <motion.div 
              className="relative mx-auto lg:ml-auto w-full group max-w-2xl lg:max-w-none"
              initial={{ rotateY: -7, rotateX: 5, rotateZ: -1 }}
              animate={{ 
                rotateY: [-7, -3, -7],
                rotateX: [5, 2, 5],
                rotateZ: [-1, 0, -1],
                y: [-4, 4, -4]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{
                rotateY: -2,
                rotateX: 1,
                scale: 1.02,
                transition: { duration: 0.4 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Dynamic Ambient Glow & Deep Drop Shadow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500/25 via-teal-500/20 to-blue-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 transform translate-y-6 scale-95 pointer-events-none"></div>
              
              {/* 3D Extruded Outer Beveled Casing */}
              <div className="relative bg-gradient-to-br from-white via-slate-100 to-slate-300 p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-white shadow-[0_30px_70px_-15px_rgba(15,23,42,0.3),0_15px_30px_-5px_rgba(16,185,129,0.25)]">
                
                {/* Floating Top 3D Badge */}
                <div 
                  className="absolute -top-3.5 left-6 z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-xs font-black tracking-wide uppercase border border-slate-700/80 shadow-xl backdrop-blur-md"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-400">ENCONTRO ONLINE AO VIVO</span>
                </div>

                {/* Floating Bottom-Right 3D Pill */}
                <div 
                  className="absolute -bottom-3 right-6 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/95 text-white text-[11px] font-extrabold tracking-wider uppercase border border-emerald-400/60 shadow-lg backdrop-blur-md"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <span>33ª TURMA CONFIRMADA</span>
                </div>

                {/* Inner Screen Display */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-300/80 bg-slate-950 aspect-[16/10.5]">
                  <img
                    src="/imagens/cerutti_turma_meet2.png"
                    alt="Capacitação Comercial Cerutti"
                    className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl transform group-hover:scale-[1.015] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/imagens/Cerutti_turma_meet.jpeg';
                    }}
                  />
                  {/* Glass Glare Reflection Layer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-60"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none"></div>
                </div>

              </div>
            </motion.div>
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

