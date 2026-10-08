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

          {/* Right Column: Framed Image (Circular / Moldura Redonda with Gradient Border) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end mt-2 lg:mt-0">
            <div className="relative mx-auto lg:ml-auto w-[250px] min-[360px]:w-[280px] min-[400px]:w-[320px] sm:w-[360px] lg:w-[390px] aspect-square group">
              {/* Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-emerald-500/30 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
              
              {/* Circular Thin Frame with Blue-Green Gradient */}
              <div className="relative w-full h-full p-[2px] bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 rounded-full shadow-2xl shadow-emerald-950/15 overflow-hidden">
                <div className="relative w-full h-full overflow-hidden rounded-full bg-slate-100">
                  <img
                    src="/imagens/ceruti_,matsuda.png.jpeg"
                    alt="Treinamento Comercial - Método DNA Cerutti"
                    className="w-full h-full object-cover object-[center_32%] rounded-full transform group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes('ceruti_,matsuda')) {
                        target.src = '/imagens/cerutti_matsuda.png';
                      } else {
                        target.src = '/imagens/cerutti_turma.png.jpeg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

