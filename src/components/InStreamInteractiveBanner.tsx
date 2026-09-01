import React from 'react';
import { Sparkles, Zap, ArrowRight, ExternalLink, ShieldCheck, Flame, Star, Megaphone } from 'lucide-react';
import { DIRECT_SPONSORED_LINK, requestPopupFlow } from '../lib/popupManager';
import { AdBanner } from './AdBanner';

interface InStreamInteractiveBannerProps {
  variant?: 'wide' | 'compact' | 'cyber' | 'adsterra_leaderboard';
  className?: string;
  locale?: string;
}

export const InStreamInteractiveBanner: React.FC<InStreamInteractiveBannerProps> = ({
  variant = 'wide',
  className = '',
  locale = 'ar',
}) => {
  const isAr = locale === 'ar';

  const handleClick = () => {
    requestPopupFlow({
      url: DIRECT_SPONSORED_LINK,
      mandatory: true,
    });
  };

  if (variant === 'adsterra_leaderboard') {
    return (
      <div className={`w-full max-w-4xl mx-auto my-6 p-4 rounded-2xl bg-zinc-950/90 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)] ${className}`}>
        <div className="flex items-center justify-between mb-3 border-b border-zinc-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              بانر إعلاني • ADSTERRA LEADERBOARD
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>إعلان رسمي</span>
          </span>
        </div>
        <div className="hidden sm:flex justify-center">
          <AdBanner slot="leaderboard_728x90" showLabel={false} />
        </div>
        <div className="sm:hidden flex justify-center">
          <AdBanner slot="mobile_320x50" showLabel={false} />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        onClick={handleClick}
        className={`w-full max-w-4xl mx-auto my-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-zinc-950 to-cyan-950/40 border border-amber-500/40 hover:border-amber-400/80 transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] cursor-pointer group relative overflow-hidden ${className}`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              <Megaphone className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-black bg-amber-500/30 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/40 uppercase">
                  بانر ADSTERRA
                </span>
                <span className="text-[10px] font-mono text-zinc-400">إعلان شريك معتمد</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                {isAr ? 'عروض الذكاء الاصطناعي والاستضافة السحابية من شبكة اديسترا' : 'Adsterra AI & High-Speed Cloud Infrastructure Deals'}
              </h4>
            </div>
          </div>

          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-black text-xs shadow-md group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all shrink-0 cursor-pointer"
          >
            <span>{isAr ? 'فتح إعلان اديسترا' : 'Open Adsterra Ad'}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    );
  }

  // Cyber / Wide Variant
  return (
    <div 
      onClick={handleClick}
      className={`w-full max-w-4xl mx-auto my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-zinc-950 border-2 border-amber-500/50 hover:border-amber-400 transition-all duration-500 shadow-[0_0_35px_rgba(245,158,11,0.2)] hover:shadow-[0_0_45px_rgba(245,158,11,0.4)] cursor-pointer group relative overflow-hidden ${className}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase shadow-inner">
            <Flame className="w-3 h-3 text-amber-400" />
            <span>{isAr ? 'بانر إعلاني من شبكة ADSTERRA' : 'ADSTERRA ADS NETWORK BANNER'}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40">
            <ShieldCheck className="w-3 h-3" />
            <span>{isAr ? 'إعلان معتمد 100%' : '100% VERIFIED'}</span>
          </span>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>{isAr ? 'إعلان نافذة منبثقة' : 'Adsterra Popup Ad'}</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-start gap-4 text-right">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-950/50 group-hover:scale-110 group-hover:rotate-6 transition-transform">
            <Zap className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
              {isAr ? 'لافتة إعلانية مميزة • منصات وحلول تقنية من اديسترا' : 'Exclusive Adsterra Banner: Leading Tech & Cloud Platforms'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed max-w-xl">
              {isAr 
                ? 'استفد من العروض الإعلانية الحصرية والخدمات التقنية الموصى بها من شبكة Adsterra لدعم استمرارية المحرك مجاناً.' 
                : 'Access top partner promotions, developer bonuses, and high-performance server tools from Adsterra.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 hover:from-amber-400 hover:to-cyan-300 text-zinc-950 font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all shrink-0 group-hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-zinc-950 animate-spin-slow" />
          <span>{isAr ? 'فتح إعلان اديسترا الآن' : 'Open Adsterra Ad Now'}</span>
          <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};
