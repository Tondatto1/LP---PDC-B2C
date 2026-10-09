import React from 'react';

interface TargetSectionProps {
  onOpenCtaModal: () => void;
}

export const TargetSection: React.FC<TargetSectionProps> = () => {
  return (
    <section id="para-quem-e" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-emerald-100/60 via-blue-50/70 to-white text-slate-900 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Top Area - Grid with Text on Left, Image on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
              PARA QUEM É O PROGRAMA?
            </h2>

            <div className="space-y-4 text-slate-700 text-sm min-[380px]:text-base sm:text-lg leading-relaxed pt-1">
              <p className="text-slate-700 font-medium">
                Para <span className="font-extrabold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-md border border-emerald-300/80 shadow-2xs">EMPRESAS DO AGRONEGÓCIO</span> que pensam grande. Não importa se você atua em grãos, pecuária, insumos ou máquinas: se o seu objetivo é vender <span className="font-extrabold text-emerald-700">MAIS</span>, faturar <span className="font-extrabold text-emerald-700">MAIS</span> e <span className="font-extrabold text-emerald-700">DOMINAR</span> o mercado, este método foi desenhado para você.
              </p>
            </div>
          </div>

          {/* Right Column: Framed Image (Moldura Circular de Cerutti & Matsuda com borda bem fina) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="relative w-full max-w-[320px] sm:max-w-[370px] lg:max-w-[410px] aspect-square group">
              {/* Subtle Ambient Glow */}
              <div className="absolute -inset-1 sm:-inset-1.5 bg-gradient-to-tr from-emerald-500/30 via-teal-400/20 to-blue-500/25 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
              
              {/* Moldura Circular com Borda Bem Fina (1.5px a 2px) */}
              <div className="relative w-full h-full p-[1.5px] sm:p-[2px] bg-gradient-to-tr from-emerald-500 via-teal-400 to-blue-500 rounded-full shadow-xl shadow-emerald-950/15">
                {/* Circular Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950 aspect-square">
                  <img
                    src="/imagens/ceruti_,matsuda.png"
                    alt="Cerutti e Matsuda - Agro Método PCP"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ objectPosition: 'center 28%' }}
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const currentSrc = target.getAttribute('src');
                      if (currentSrc === '/imagens/ceruti_,matsuda.png') {
                        target.src = '/imagens/ceruti_matsuda.png';
                      } else if (currentSrc === '/imagens/ceruti_matsuda.png') {
                        target.src = '/imagens/ceruti_,matsuda.png.jpeg';
                      }
                    }}
                  />
                  {/* Delicada linha interna de acabamento */}
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

