import React from 'react';
import { DIRECT_LINK } from '../lib/popupManager';
import { ExternalLink, Sparkles, Flame, Zap, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface SponsoredDirectLinkProps {
  variant?: 'badge' | 'button' | 'card' | 'banner';
  className?: string;
  label?: string;
}

export const SponsoredDirectLink: React.FC<SponsoredDirectLinkProps> = ({ 
  variant = 'badge', 
  className = '',
  label
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Open the smart link safely in a new window/tab
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
  };

  // 1. Sleek Navbar/Header Compact Pulsing Badge
  if (variant === 'badge') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-950/70 via-red-950/60 to-purple-950/70 border border-amber-500/40 text-amber-200 text-xs font-mono transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-[1.03] active:scale-95 cursor-pointer select-none ${className}`}
        title="انقر لفتح عروض الشركاء الحصرية (Smart Link)"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <Flame className="w-3.5 h-3.5 text-amber-400 group-hover:animate-bounce" />
        <span className="font-semibold">{label || 'عروض ذكية حصرية • Smart Link'}</span>
        <ArrowUpRight className="w-3 h-3 text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    );
  }

  // 2. High-Tech Action Button for Result Toolbars
  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-950/90 via-blue-950/80 to-purple-950/90 hover:from-cyan-900/90 hover:to-purple-900/90 border border-cyan-500/50 hover:border-cyan-400 text-cyan-200 text-xs font-mono flex items-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_22px_rgba(6,182,212,0.45)] hover:scale-[1.02] active:scale-95 cursor-pointer ${className}`}
        title="فحص العروض والحلول الموصى بها عبر الرابط الذكي"
      >
        <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:animate-spin" />
        <span className="font-bold">{label || 'استكشاف حلول الشركاء • Recommended Offer'}</span>
        <ExternalLink className="w-3.5 h-3.5 text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    );
  }

  // 3. Cybernetic Feature Card (High-Impact In-Stream Showcase)
  if (variant === 'card') {
    return (
      <div 
        onClick={handleClick}
        className={`group relative w-full max-w-4xl mx-auto my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-zinc-950/90 via-zinc-900/80 to-zinc-950/90 border border-amber-500/30 hover:border-amber-400/80 shadow-[0_4px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl ${className}`}
        dir="rtl"
      >
        {/* Background ambient glow effect */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-400 shadow-inner group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono tracking-wider text-amber-400 uppercase bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  رابط ذكي معتمد • SMART LINK SPONSOR
                </span>
                <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  تحقق تلقائي
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-amber-200 transition-colors">
                فرص وعروض الشركاء الموصى بها لمسار محاكاتك
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-0.5 leading-relaxed">
                اضغط لاستكشاف أحدث الموارد الرقمية والعروض المتطابقة مع اهتماماتك عبر شبكة التوجيه الذكية.
              </p>
            </div>
          </div>

          <div className="flex items-center self-end sm:self-center shrink-0">
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs sm:text-sm font-mono flex items-center gap-2 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all cursor-pointer"
            >
              <span>استعراض العرض الذكي</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Slim Interactive Banner Bar
  return (
    <div 
      onClick={handleClick}
      className={`w-full max-w-4xl mx-auto my-3 px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/40 flex items-center justify-between text-xs font-mono text-zinc-400 hover:text-amber-300 transition-all duration-300 cursor-pointer shadow-md ${className}`}
      dir="rtl"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span className="font-semibold text-zinc-200">{label || 'رابط ذكي: عروض وخصومات تقنية حصرية'}</span>
      </div>
      <div className="flex items-center gap-1 text-amber-400 text-[11px]">
        <span>فتح الرابط</span>
        <ExternalLink className="w-3 h-3" />
      </div>
    </div>
  );
};
