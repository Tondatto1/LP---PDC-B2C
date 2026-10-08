import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/agroData';

interface FaqSectionProps {
  onOpenCtaModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenCtaModal }) => {
  const [openId, setOpenId] = useState<string>('1');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-emerald-100/50 via-white to-blue-100/50 text-slate-900 relative overflow-hidden border-t border-slate-200/80">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            PERGUNTAS FREQUENTES (FAQ)
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden shadow-sm ${
                  isOpen ? 'bg-white border-2 border-emerald-500 shadow-md' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                >
                  <span className="font-bold text-sm min-[380px]:text-base sm:text-lg text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 sm:p-2 rounded-full transition-transform duration-300 shrink-0 ${
                    isOpen ? 'bg-emerald-100 text-emerald-800 rotate-180' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-0 text-slate-700 text-xs min-[380px]:text-sm sm:text-base leading-relaxed border-t border-slate-100 mt-1">
                    <p className="pt-3 sm:pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
