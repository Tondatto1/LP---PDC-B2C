import React from 'react';
import { 
  CreditCard, 
  QrCode, 
  FileText, 
  Percent,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const CheckoutSection: React.FC = () => {
  // URLs de redirecionamento para os checkouts reais
  const CHECKOUT_LINKS = {
    pix: 'https://www.asaas.com/000/c/ye5dnn67lxc68fji',
    cartao: 'https://www.asaas.com/000/c/hqudzsxxedxxbslo',
    boleto: 'https://pay.tmb.com.br/AGROVENDEDOR/SPT300767ME'
  };

  return (
    <section 
      id="checkout-section" 
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white via-emerald-50/40 via-blue-50/30 to-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200/80"
    >
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] lg:w-[850px] h-[500px] bg-gradient-to-r from-emerald-200/25 via-teal-200/20 to-blue-200/25 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Título Oficial da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            FORMAS DE PAGAMENTO
          </h2>

          {/* Ancoragem de Valor Principal Destacada */}
          <div className="mt-6 sm:mt-8 max-w-xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-700/80 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-2">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-400/90 line-through decoration-rose-500/90 decoration-3 sm:decoration-4">
                  R$ 6.377,00
                </span>
                
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md">
                  <Percent className="w-4 h-4" />
                  ATÉ 47% DE ECONOMIA NA TURMA 33
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The 3 Payment Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          
          {/* Card 1: À VISTA NO PIX */}
          <div className="bg-white border border-slate-200/90 hover:border-emerald-500/80 rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group shadow-lg hover:shadow-2xl">
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300/80 px-3 py-1 rounded-full">
                  47% DE DIFERENÇA
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200 shadow-xs">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight uppercase">
                    À VISTA NO PIX
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">Liberação imediata</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 my-4">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1 tracking-tight">
                  R$ 3.393,00
                </div>
                <div className="text-xs font-bold text-emerald-700 mt-2 flex items-center gap-1.5 bg-emerald-50 p-2 rounded-lg border border-emerald-200/60">
                  <Percent className="w-4 h-4 shrink-0" />
                  <span>Economia de R$ 2.984,00 (47% de diferença)</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href={CHECKOUT_LINKS.pix}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-emerald-300/60 shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>À VISTA NO PIX</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: CARTÃO DE CRÉDITO EM ATÉ 10X (Destaque Principal) */}
          <div className="bg-white border-2 border-emerald-500 rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group shadow-2xl shadow-emerald-600/15 md:-translate-y-3 ring-2 ring-emerald-500/20">
            
            {/* Top Pill Highlight */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Opção Mais Escolhida</span>
            </div>

            <div>
              {/* Badges */}
              <div className="flex items-center justify-between gap-2 mb-4 mt-1">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300/80 px-3 py-1 rounded-full">
                  41% DE DIFERENÇA
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300 shadow-xs">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight uppercase">
                    CARTÃO DE CRÉDITO EM ATÉ 10X
                  </h3>
                  <span className="text-xs text-emerald-800 font-bold">10x de R$ 377,00</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="bg-emerald-50/90 border border-emerald-300/90 rounded-2xl p-4 my-4 ring-1 ring-emerald-500/20">
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-sm font-bold text-slate-600">10x de</span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-800 tracking-tight">
                    R$ 377,00
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1 font-semibold">
                  Valor total: R$ 3.770,00
                </div>
                <div className="text-xs font-bold text-emerald-800 mt-2 flex items-center gap-1.5 bg-white/80 p-2 rounded-lg border border-emerald-200">
                  <Percent className="w-4 h-4 shrink-0" />
                  <span>Economia de R$ 2.607,00 (41% de diferença)</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href={CHECKOUT_LINKS.cartao}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-emerald-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>CARTÃO DE CRÉDITO EM ATÉ 10X</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: BOLETO EM ATÉ 10X */}
          <div className="bg-white border border-slate-200/90 hover:border-emerald-500/80 rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group shadow-lg hover:shadow-2xl">
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-100 border border-teal-300/80 px-3 py-1 rounded-full">
                  29% DE DIFERENÇA
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 border border-teal-200 shadow-xs">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight uppercase">
                    BOLETO EM ATÉ 10X
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">10x de R$ 453,08</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 my-4">
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-sm font-bold text-slate-600">10x de</span>
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    R$ 453,08
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1 font-semibold">
                  Valor total: R$ 4.530,80
                </div>
                <div className="text-xs font-bold text-teal-800 mt-2 flex items-center gap-1.5 bg-teal-50 p-2 rounded-lg border border-teal-200/60">
                  <Percent className="w-4 h-4 shrink-0" />
                  <span>Economia de R$ 1.846,20 (29% de diferença)</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href={CHECKOUT_LINKS.boleto}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 bg-slate-800 hover:bg-slate-900 active:scale-[0.98] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-slate-700 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:border-emerald-500 text-center"
              >
                <span>BOLETO EM ATÉ 10X</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
