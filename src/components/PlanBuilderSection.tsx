import React from 'react';
import { 
  Video, 
  Clock, 
  Volume2, 
  GraduationCap, 
  Bot, 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  ArrowRight
} from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

interface PlanBuilderSectionProps {
  onOpenCtaModal: (planName?: string) => void;
}

export const PlanBuilderSection: React.FC<PlanBuilderSectionProps> = ({ onOpenCtaModal }) => {
  // 8 Deliverables of the Program
  const deliverables = [
    {
      id: 'quinzenal',
      icon: Video,
      title: 'Treinamento online quinzenal pelo Método 21 em 7',
      description: 'Carga horária total de 12 horas focadas na aplicação prática e evolução contínua da equipe.',
      highlight: '12h de Treinamento',
    },
    {
      id: 'aula-semanal',
      icon: Clock,
      title: 'Aula temática semanal de 30 minutos',
      description: '15 minutos de conteúdo direto ao ponto + 15 minutos para discussão prática e dúvidas.',
      highlight: '30min Semanal',
    },
    {
      id: 'audios',
      icon: Volume2,
      title: 'Áudios semanais de até 2 minutos',
      description: 'Estratégias rápidas e objetivas para contornar as principais objeções de vendas no campo.',
      highlight: 'Contorno de Objeções',
    },
    {
      id: 'treinamentos',
      icon: GraduationCap,
      title: 'Acesso completo a todos os nossos treinamentos',
      description: 'Plataforma ilimitada com conteúdos gravados, materiais de apoio e metodologias exclusivas.',
      highlight: 'Acesso Completo',
    },
    {
      id: 'ia',
      icon: Bot,
      title: 'Acesso ao nosso agente de IA Ceruti - 24/7',
      description: 'Inteligência Artificial especialista que capacita e tira dúvidas técnicas e comerciais direto no WhatsApp.',
      highlight: 'IA Disponível 24/7',
    },
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      title: 'Dashboard de monitoramento e avaliação de desempenho',
      description: 'Acompanhamento em tempo real de engajamento, evolução e resultados da equipe comercial.',
      highlight: 'Gestão & Performance',
    },
    {
      id: 'mentoria-ind',
      icon: UserCheck,
      title: 'Mentoria individual',
      description: '3 encontros de 45 minutos cada para direcionamento estratégico e acompanhamento de liderados.',
      highlight: '3 Encontros de 45min',
    },
    {
      id: 'mentoria-grupo',
      icon: Users,
      title: 'Mentoria em grupo com temas exclusivos',
      description: 'Sessões coletivas para alinhamento estratégico, inteligência de mercado e simulações do agro.',
      highlight: 'Bônus Exclusivo',
    },
  ];

  return (
    <section id="planos" className="py-20 lg:py-28 bg-gradient-to-b from-blue-100/60 via-emerald-50/60 to-white text-slate-900 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            ENTREGÁVEIS DO PROGRAMA
          </h2>
          
          {/* Highlighted Duration (Clean Typographic Highlight) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-slate-700 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              <span className="text-slate-600 font-bold uppercase tracking-wider text-xs sm:text-sm">Duração:</span>
              <span className="text-emerald-900 font-black text-base sm:text-lg">90 dias (3 meses)</span>
            </div>
          </div>
        </div>

        {/* Scroll Stack for Deliverables */}
        <div className="mt-8 max-w-3xl mx-auto">
          <ScrollStack 
            useWindowScroll={true} 
            itemDistance={24} 
            itemStackDistance={20}
            baseScale={0.92}
            itemScale={0.02}
            stackPosition="22%"
          >
            {deliverables.map((item) => {
              const IconComponent = item.icon;
              return (
                <ScrollStackItem key={item.id}>
                  <div className="p-6 sm:p-8 bg-white border border-slate-200/90 rounded-3xl shadow-xl hover:border-emerald-500/80 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h3>
                      </div>
                      <span className="self-start sm:self-center text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-200/90 px-3 py-1.5 rounded-full shrink-0">
                        {item.highlight}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed pl-0 sm:pl-15">
                      {item.description}
                    </p>
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => onOpenCtaModal('Estrutura do Programa')}
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl border border-emerald-300/60 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>REALIZAR INSCRIÇÃO!</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};



