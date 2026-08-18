import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenCtaModal: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenCtaModal }) => {
  return (
    <section id="como-funciona" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-blue-50/30 to-emerald-50/40 text-slate-900 relative overflow-hidden">
      
      {/* Decorative background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] lg:w-[700px] h-[500px] bg-gradient-to-r from-emerald-200/20 via-blue-200/20 to-teal-200/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            COMO FUNCIONA
          </h2>
          
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Assista ao vídeo e veja na prática como funciona a estrutura completa do programa para acelerar os resultados comerciais da sua equipe.
          </p>
        </div>

        {/* Vertical Video Player Frame (Formato Vertical 9:16) */}
        <div className="max-w-[340px] sm:max-w-[380px] md:max-w-[400px] mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-br from-emerald-400/40 via-teal-400/30 to-blue-500/40 shadow-2xl shadow-emerald-950/15 border border-white/90 backdrop-blur-xs">
            
            {/* 9:16 Vertical Video Frame with Vimeo Embed */}
            <div className="relative w-full aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
              <iframe
                src="https://player.vimeo.com/video/1219097552?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0"
                className="w-full h-full border-0 rounded-xl sm:rounded-2xl"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                title="Apresentação do Método 21 em 7"
              />
            </div>
          </div>

          {/* Central Call to Action Button */}
          <div className="mt-8 sm:mt-10 text-center">
            <button
              onClick={onOpenCtaModal}
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-600/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide cursor-pointer border border-emerald-300/40"
            >
              <span>QUERO CAPACITAR MINHA EQUIPE</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
