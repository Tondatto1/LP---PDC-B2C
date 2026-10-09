import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  alt?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-9 sm:h-10 lg:h-11 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-sm',
  variant = 'dark',
  alt = 'AGRO MÉTODO PCP'
}) => {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const sources = variant === 'dark' 
    ? [
        '/imagens/logo_letra_preta_trans_hor.png',
        '/imagens/logo-letra-preta-trans-hor.png',
        '/imagens/LOGO - LETRA PRETA - TRANS - HOR.png'
      ]
    : [
        '/imagens/logo_letra_branca_transp.png',
        '/imagens/logo-letra-branca-transp.png',
        '/imagens/logo - letra branca - transp.png'
      ];

  const currentSrc = sources[Math.min(retryCount, sources.length - 1)];

  if (imageError) {
    return (
      <div className="flex items-center gap-2 py-1 select-none">
        <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-black text-xs shadow-xs">
          PCP
        </div>
        <div className="flex flex-col">
          <span className={`font-black text-sm tracking-tight leading-none ${variant === 'dark' ? 'text-slate-900' : 'text-white'}`}>
            <span className="text-emerald-600">AGRO</span> MÉTODO PCP
          </span>
          <span className={`text-[9px] font-bold tracking-widest uppercase ${variant === 'dark' ? 'text-slate-500' : 'text-emerald-200'}`}>
            Capacitação Comercial
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
      onError={() => {
        if (retryCount < sources.length - 1) {
          setRetryCount((prev) => prev + 1);
        } else {
          setImageError(true);
        }
      }}
    />
  );
};
