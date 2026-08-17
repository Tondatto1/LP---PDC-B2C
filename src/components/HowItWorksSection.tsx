import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Upload, Film, Link as LinkIcon, CheckCircle2, Sparkles, ArrowRight, X } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenCtaModal: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenCtaModal }) => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isYoutubeOrVimeo, setIsYoutubeOrVimeo] = useState<boolean>(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Helper to parse YouTube / Vimeo embeds
  const parseVideoUrl = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return;

    // YouTube regex
    const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      setEmbedUrl(`https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`);
      setIsYoutubeOrVimeo(true);
      setVideoSrc(null);
      setShowConfigModal(false);
      return;
    }

    // Vimeo regex
    const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[3]) {
      setEmbedUrl(`https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`);
      setIsYoutubeOrVimeo(true);
      setVideoSrc(null);
      setShowConfigModal(false);
      return;
    }

    // Direct MP4 / WebM URL
    setVideoSrc(trimmed);
    setEmbedUrl(null);
    setIsYoutubeOrVimeo(false);
    setShowConfigModal(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setVideoSrc(objectUrl);
      setEmbedUrl(null);
      setIsYoutubeOrVimeo(false);
      setIsPlaying(true);
      setShowConfigModal(false);
    }
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    } else if (!videoSrc && !embedUrl) {
      setShowConfigModal(true);
    }
  };

  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/40 to-emerald-50/50 text-slate-900 relative overflow-hidden">
      
      {/* Decorative background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[400px] bg-gradient-to-r from-emerald-200/25 via-blue-200/25 to-teal-200/25 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-950 font-black text-xs sm:text-sm uppercase tracking-wide mb-4 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>METODOLOGIA NA PRÁTICA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            COMO FUNCIONA
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Assista ao vídeo e veja na prática como funciona a estrutura completa do programa para acelerar os resultados comerciais da sua equipe.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3.5 bg-gradient-to-br from-emerald-400/40 via-teal-400/30 to-blue-500/40 shadow-2xl shadow-emerald-950/10 border border-white/80 backdrop-blur-xs">
            
            {/* 16:9 Aspect Ratio Frame */}
            <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 shadow-inner group">
              
              {/* If YouTube/Vimeo embed URL is set */}
              {isYoutubeOrVimeo && embedUrl ? (
                <iframe
                  src={embedUrl}
                  title="Vídeo de Apresentação do Programa"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : videoSrc ? (
                /* Native HTML5 Video Element */
                <video
                  ref={videoRef}
                  src={videoSrc}
                  controls
                  playsInline
                  autoPlay={isPlaying}
                  className="w-full h-full object-contain bg-black"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  Seu navegador não suporta a reprodução deste vídeo.
                </video>
              ) : (
                /* Video Placeholder / Call to upload state */
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-6 text-center select-none">
                  
                  {/* Background poster photo preview */}
                  <img
                    src="/imagens/cerutti_turma.png.jpeg"
                    alt="Vídeo Thumbnail"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[1px] transition-all duration-700 group-hover:scale-105 group-hover:opacity-35"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/imagens/ceruti_,matsuda.png.jpeg';
                    }}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />

                  {/* Content over placeholder */}
                  <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
                    
                    {/* Big Pulsing Play Button */}
                    <button
                      onClick={handlePlayClick}
                      className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-xl shadow-emerald-500/30 transition-transform duration-300 hover:scale-110 active:scale-95 group/btn cursor-pointer mb-4"
                      aria-label="Assistir ao vídeo"
                    >
                      <span className="absolute -inset-2 rounded-full bg-emerald-400/30 animate-ping pointer-events-none opacity-60" />
                      <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
                    </button>

                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                      VÍDEO DE APRESENTAÇÃO
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1 leading-relaxed">
                      Conheça a metodologia, os módulos e a dinâmica do treinamento.
                    </p>

                    {/* Upload / Config Trigger Button */}
                    <button
                      onClick={() => setShowConfigModal(true)}
                      className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold transition duration-200 cursor-pointer backdrop-blur-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Subir ou Inserir Vídeo</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action bar overlay on top corner if video is loaded */}
              {(videoSrc || embedUrl) && (
                <div className="absolute top-3 right-3 z-20">
                  <button
                    onClick={() => setShowConfigModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold border border-slate-700 shadow-md backdrop-blur-md transition duration-200 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Trocar Vídeo</span>
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Quick steps below the video */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Diagnóstico Inicial</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Mapeamento do perfil da equipe comercial e identificação de oportunidades.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Treinamento & Prática</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Imersão com o Método 21 em 7, técnicas de negociação, CRM e Ceruti IA.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Acompanhamento & ROI</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Mentoria contínua, métricas de conversão e aumento expressivo de faturamento.
                </p>
              </div>
            </div>
          </div>

          {/* Central Call to Action Button */}
          <div className="mt-10 text-center">
            <button
              onClick={onOpenCtaModal}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-600/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide cursor-pointer border border-emerald-300/40"
            >
              <span>QUERO CAPACITAR MINHA EQUIPE</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

      {/* Video Setup / Upload Modal */}
      <AnimatePresence>
        {showConfigModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowConfigModal(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Configurar Vídeo da Seção
                  </h3>
                  <p className="text-xs text-slate-500">
                    Escolha como deseja exibir seu vídeo de apresentação
                  </p>
                </div>
              </div>

              {/* Option 1: File Upload */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 transition text-center cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-7 h-7 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-extrabold text-slate-900">
                    Selecionar arquivo de vídeo do seu computador
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Formatos suportados: MP4, WebM, MOV
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs font-bold text-slate-400 uppercase">OU VIA LINK</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Option 2: Link (YouTube / Vimeo / URL) */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase">
                    Link do Vídeo (YouTube, Vimeo ou MP4 direto)
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
                      />
                    </div>
                    <button
                      onClick={() => parseVideoUrl(inputUrl)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-lg shadow-sm transition cursor-pointer"
                    >
                      Salvar
                    </button>
                  </div>
                </div>

                {/* Helpful Note */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dica:</strong> Você também pode colocar o arquivo de vídeo diretamente na pasta <code className="text-emerald-700 font-mono">/public/videos/</code> e referenciá-lo a qualquer momento.
                  </span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
