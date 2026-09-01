import React, { useState, useEffect } from 'react';
import { Zap, ExternalLink, X, Sparkles, ArrowRight, ShieldCheck, BellRing, Megaphone } from 'lucide-react';
import { DIRECT_SPONSORED_LINK, requestPopupFlow } from '../lib/popupManager';

interface FloatingAdNotificationProps {
  locale?: string;
}

const ADSTERRA_PROMOS_AR = [
  {
    title: 'إشعار إعلاني من Adsterra',
    description: 'عرض خاص وحصري: استكشف أفضل الأدوات والخدمات الرقمية المدعومة من شبكة Adsterra.',
    badge: 'ADSTERRA SOCIAL BAR',
    icon: 'bell',
  },
  {
    title: 'لافتة إعلانية مميزة • Adsterra Ads',
    description: 'احصل على مكافآت وباقات اشتراك رقمية مجانية برعاية معلني اديسترا المعتمدين.',
    badge: 'ADSTERRA PROMO',
    icon: 'zap',
  },
  {
    title: 'إعلان موصى به من شبكة اديسترا',
    description: 'انقر لمشاهدة أقوى الحلول السحابية وتقنيات الاستضافة الفائقة لزوار المحرك.',
    badge: 'ADSTERRA VERIFIED',
    icon: 'sparkles',
  },
];

const ADSTERRA_PROMOS_EN = [
  {
    title: 'Adsterra In-Page Push Alert',
    description: 'Exclusive sponsored partner promotion powered by Adsterra Ads Network.',
    badge: 'ADSTERRA SOCIAL BAR',
    icon: 'bell',
  },
  {
    title: 'Featured Adsterra Banner Deal',
    description: 'Unlock special developer vouchers and cloud computing perks from verified sponsors.',
    badge: 'ADSTERRA PROMO',
    icon: 'zap',
  },
  {
    title: 'Recommended by Adsterra Network',
    description: 'Click to explore leading high-speed servers and artificial intelligence tools.',
    badge: 'ADSTERRA VERIFIED',
    icon: 'sparkles',
  },
];

export const FloatingAdNotification: React.FC<FloatingAdNotificationProps> = ({ locale = 'ar' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const isAr = locale === 'ar';
  const promos = isAr ? ADSTERRA_PROMOS_AR : ADSTERRA_PROMOS_EN;

  useEffect(() => {
    // Initial entrance after 3.5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    // Periodic rotate every 25 seconds
    const periodicTimer = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promos.length);
      setIsVisible(true);
    }, 25000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(periodicTimer);
    };
  }, [promos.length]);

  const handleOpenPromo = () => {
    requestPopupFlow({
      url: DIRECT_SPONSORED_LINK,
      mandatory: true,
    });
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentPromo = promos[promoIndex];

  return (
    <div 
      className={`fixed ${isAr ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} bottom-20 sm:bottom-6 z-40 max-w-sm w-full animate-in slide-in-from-bottom-5 fade-in duration-300`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div 
        onClick={handleOpenPromo}
        className="group relative rounded-2xl bg-zinc-950/95 border-2 border-amber-500/60 p-4 shadow-[0_0_35px_rgba(245,158,11,0.3)] hover:border-amber-400 hover:shadow-[0_0_45px_rgba(245,158,11,0.5)] backdrop-blur-xl transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Adsterra Top Glow Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-cyan-400 to-amber-500 animate-pulse" />

        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-12 transition-transform">
              <BellRing className="w-4 h-4 animate-bounce" />
            </span>
            <div>
              <span className="inline-block text-[9px] font-mono font-black uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/60 shadow-sm">
                {currentPromo.badge}
              </span>
              <h4 className="text-xs font-bold text-zinc-100 group-hover:text-amber-300 transition-colors mt-0.5">
                {currentPromo.title}
              </h4>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
            title="إخفاء الإشعار"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-[11px] text-zinc-300 mb-3 leading-relaxed">
          {currentPromo.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
          <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isAr ? 'إشعار إعلاني معتمد' : 'Verified Adsterra Ad'}</span>
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
            <span>{isAr ? 'فتح إعلان اديسترا' : 'Open Adsterra Ad'}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </div>
    </div>
  );
};
