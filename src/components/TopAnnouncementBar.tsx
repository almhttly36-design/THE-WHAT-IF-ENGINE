import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap, ExternalLink, Flame, ShieldCheck, Megaphone } from 'lucide-react';
import { DIRECT_SPONSORED_LINK, requestPopupFlow } from '../lib/popupManager';

interface TopAnnouncementBarProps {
  locale?: string;
}

const ANNOUNCEMENTS_AR = [
  { tag: 'إعلانات ADSTERRA', text: 'عروض وبانرات إعلانية حصرية برعاية شبكة Adsterra العالمية', cta: 'فتح الإعلان' },
  { tag: 'إشعار ADSTERRA', text: 'شاهد أحدث العروض والخدمات التقنية الموصى بها من Adsterra', cta: 'عرض الإعلان' },
  { tag: 'ADSTERRA SPONSORED', text: 'تخفيضات ومنصات سحابية مميزة من شبكة إعلانات اديسترا', cta: 'انقر للمتابعة' },
];

const ANNOUNCEMENTS_EN = [
  { tag: 'ADSTERRA ADS', text: 'Exclusive sponsored banners and offers powered by Adsterra Ads Network', cta: 'Open Ad' },
  { tag: 'ADSTERRA ALERT', text: 'Discover verified tech tools & partner promotions via Adsterra', cta: 'View Ad' },
  { tag: 'SPONSORED', text: 'Premium cloud & developer deals from Adsterra verified network', cta: 'Click to Open' },
];

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({ locale = 'ar' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAr = locale === 'ar';
  const announcements = isAr ? ANNOUNCEMENTS_AR : ANNOUNCEMENTS_EN;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const handleBannerClick = () => {
    requestPopupFlow({
      url: DIRECT_SPONSORED_LINK,
      mandatory: true,
    });
  };

  const current = announcements[currentIndex];

  return (
    <div className="w-full bg-gradient-to-r from-zinc-950 via-amber-950/40 to-zinc-950 border-b border-amber-500/30 text-zinc-200 py-2 px-3 sm:px-6 relative z-30 overflow-hidden shadow-md">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(245,158,11,0.1)_50%,transparent_100%)] animate-pulse pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-xs font-mono">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black tracking-wider shrink-0 uppercase shadow-sm">
            <Megaphone className="w-3 h-3 text-amber-400 animate-bounce" />
            <span>{current.tag}</span>
          </span>

          <p className="text-zinc-300 font-sans text-xs truncate">
            {current.text}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
            <ShieldCheck className="w-3 h-3" />
            <span>{isAr ? 'إعلان Adsterra معتمد' : 'Verified Adsterra Ad'}</span>
          </span>

          <button
            type="button"
            onClick={handleBannerClick}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 hover:from-amber-400 hover:to-cyan-300 text-zinc-950 font-black text-[11px] transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
          >
            <span>{current.cta}</span>
            <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
