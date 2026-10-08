import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AboutUsSectionProps {
  onOpenCtaModal: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ onOpenCtaModal }) => {
  return (
    <section id="quem-somos" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-tr from-emerald-100/60 via-blue-50/70 to-white text-slate-900 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            QUEM SOMOS?
          </h2>

          <p className="text-lg min-[380px]:text-xl sm:text-2xl lg:text-3xl font-black text-emerald-700 uppercase tracking-tight max-w-4xl mx-auto leading-tight">
            A MAIOR ESCOLA DE CAPACITAÇÃO COMERCIAL PARA AGRONEGÓCIOS DO BRASIL!
          </p>
        </div>

        {/* Highlights & Metrics Cards */}
        <div className="mt-8 sm:mt-12 max-w-4xl mx-auto">
          <div className="bg-white/95 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-md">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {/* 2 em cima */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-center space-y-1 flex flex-col justify-center shadow-2xs hover:border-emerald-300 transition-all">
                <span className="block text-2xl min-[380px]:text-3xl sm:text-4xl font-black text-emerald-700">+19 Anos</span>
                <span className="text-xs sm:text-sm lg:text-base font-bold text-slate-700">de história</span>
              </div>
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-center space-y-1 flex flex-col justify-center shadow-2xs hover:border-emerald-300 transition-all">
                <span className="block text-2xl min-[380px]:text-3xl sm:text-4xl font-black text-emerald-700">+25 Mil</span>
                <span className="text-xs sm:text-sm lg:text-base font-bold text-slate-700">alunos formados</span>
              </div>

              {/* 2 no meio */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-center space-y-1 flex flex-col justify-center shadow-2xs hover:border-emerald-300 transition-all">
                <span className="block text-2xl min-[380px]:text-3xl sm:text-4xl font-black text-emerald-700">+150</span>
                <span className="text-xs sm:text-sm lg:text-base font-bold text-slate-700">empresas atendidas</span>
              </div>
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-center space-y-1 flex flex-col justify-center shadow-2xs hover:border-emerald-300 transition-all">
                <span className="block text-2xl min-[380px]:text-3xl sm:text-4xl font-black text-emerald-700">+1 BILHÃO</span>
                <span className="text-xs sm:text-sm lg:text-base font-bold text-slate-700 leading-tight">de receita incremental gerada</span>
              </div>

              {/* 1 em baixo */}
              <div className="col-span-2 flex justify-center">
                <div className="w-full max-w-[calc(50%-6px)] sm:max-w-[calc(50%-8px)] bg-emerald-50/80 border border-emerald-200/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-center space-y-1 flex flex-col justify-center shadow-2xs hover:border-emerald-300 transition-all">
                  <span className="block text-2xl min-[380px]:text-3xl sm:text-4xl font-black text-emerald-700">+ de 40</span>
                  <span className="text-xs sm:text-sm lg:text-base font-bold text-slate-700">segmentos diferentes</span>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 text-center">
              <span className="inline-block text-xs min-[380px]:text-sm sm:text-base lg:text-lg font-extrabold text-emerald-800 bg-emerald-100/80 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-emerald-300/80 shadow-xs">
                🌱 Treinadores e mentores que vivem o campo!
              </span>
            </div>
          </div>
        </div>

        {/* Section CTA */}
        <div className="mt-12 sm:mt-16 text-center space-y-4">
          <div>
            <button
              onClick={onOpenCtaModal}
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-10 py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl border border-emerald-300/60 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
            >
              <span>REALIZAR INSCRIÇÃO!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
