import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck, Zap, Globe, ArrowUpRight } from 'lucide-react';
import { DIRECT_SPONSORED_LINK, requestPopupFlow } from '../lib/popupManager';

interface SponsoredDirectLinkProps {
  variant?: 'badge' | 'card' | 'banner' | 'button';
  className?: string;
}

export const SponsoredDirectLink: React.FC<SponsoredDirectLinkProps> = ({ 
  variant = 'badge', 
  className = '' 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    requestPopupFlow({
      url: DIRECT_SPONSORED_LINK,
      mandatory: true,
    });
  };

  if (variant === 'badge') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-cyan-500/10 border border-amber-500/30 hover:border-amber-400/70 text-amber-300 text-xs font-mono transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 cursor-pointer ${className}`}
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
        <span className="font-semibold tracking-wide">عروض وتقنيات الكوانتوم الموصى بها</span>
        <ArrowUpRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    );
  }

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-medium text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${className}`}
      >
        <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform animate-pulse" />
        <span>استكشف عروض وشركاء المحاكاة الفائقة</span>
        <ArrowUpRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`w-full max-w-4xl mx-auto my-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 border border-cyan-500/30 hover:border-cyan-500/60 shadow-lg relative overflow-hidden transition-all duration-300 ${className}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-right">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
              <Globe className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                  شريك معتمد • SPONSORED PARTNER
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors">
                أقوى منصات التقنية والذكاء الاصطناعي العالمية
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                احصل على أدوات بحث متقدمة، خدمات سحابية فائقة، وعروض حصرية لزوار المحرك
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>زيارة الشريك الآن</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Card Variant
  return (
    <div className={`p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-cyan-500/40 transition-all shadow-xl relative overflow-hidden group ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Zap className="w-4 h-4" />
          </span>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">إعلان مميز • SPONSORED</div>
            <h4 className="text-sm font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors">عروض التقنية والابتكار</h4>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
          <ShieldCheck className="w-3 h-3" />
          <span>موثوق</span>
        </span>
      </div>
      <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
        استكشف أفضل الخدمات السحابية وشبكات الذكاء الاصطناعي الرائدة برعاية شركاء المحاكاة الرسميين.
      </p>
      <button
        type="button"
        onClick={handleClick}
        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-zinc-800 hover:border-cyan-500/50 text-xs font-semibold transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-pointer"
      >
        <span>عرض التفاصيل</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
