import React, { useState, useEffect } from 'react';

export type AdSlotType = 
  | 'leaderboard_728x90' 
  | 'mobile_320x50' 
  | 'rectangle_300x250' 
  | 'banner_468x60'
  | 'skyscraper_160x600'
  | 'skyscraper_160x300';

interface AdBannerProps {
  slot: AdSlotType;
  className?: string;
}

const SLOT_CONFIGS: Record<AdSlotType, { width: number; height: number; label: string }> = {
  rectangle_300x250: { 
    width: 300, 
    height: 250, 
    label: 'إعلان الشريك المعتمد • 300x250 Medium Rectangle' 
  },
  banner_468x60: { 
    width: 468, 
    height: 60, 
    label: 'إعلان الشريك المعتمد • 468x60 Full Banner' 
  },
  leaderboard_728x90: { 
    width: 728, 
    height: 90, 
    label: 'إعلان الشريك المعتمد • 728x90 Leaderboard' 
  },
  mobile_320x50: { 
    width: 320, 
    height: 50, 
    label: 'إعلان الشريك المعتمد • 320x50 Mobile Banner' 
  },
  skyscraper_160x600: { 
    width: 160, 
    height: 600, 
    label: 'إعلان الشريك المعتمد • 160x600 Skyscraper' 
  },
  skyscraper_160x300: { 
    width: 160, 
    height: 300, 
    label: 'إعلان الشريك المعتمد • 160x300 Skyscraper' 
  },
};

// Allowed active banner slots - now enabling 468x60 and 300x250 as requested!
const ACTIVE_SLOTS = new Set<AdSlotType>(['banner_468x60', 'rectangle_300x250']);

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '' }) => {
  // Only render slots that are explicitly active
  if (!ACTIVE_SLOTS.has(slot)) {
    return null;
  }

  const config = SLOT_CONFIGS[slot] || SLOT_CONFIGS['rectangle_300x250'];
  const [scale, setScale] = useState<number>(1);

  // Responsive scale down for screens narrower than the banner width
  useEffect(() => {
    const updateScale = () => {
      if (typeof window === 'undefined') return;
      const screenWidth = window.innerWidth - 32; // 16px padding on each side
      if (screenWidth < config.width) {
        const calculatedScale = Math.max(0.65, screenWidth / config.width);
        setScale(calculatedScale);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [config.width]);

  return (
    <div 
      className={`relative w-full flex flex-col items-center justify-center my-4 select-none ${className}`}
      dir="rtl"
    >
      {/* Sleek Cybernetic Tag */}
      <div className="flex items-center justify-center gap-1.5 mb-2 opacity-75 hover:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
        <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
          {config.label}
        </span>
      </div>

      {/* Cyber Frame with zero layout shift */}
      <div 
        className="relative flex items-center justify-center rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-2 shadow-[0_4px_25px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 hover:border-cyan-500/40"
        style={{
          width: scale < 1 ? '100%' : `${config.width + 16}px`,
          height: `${Math.round(config.height * scale) + 16}px`,
          minHeight: `${Math.round(config.height * scale) + 16}px`,
        }}
      >
        <div 
          className="flex items-center justify-center origin-center transition-transform duration-200"
          style={{
            width: `${config.width}px`,
            height: `${config.height}px`,
            transform: scale < 1 ? `scale(${scale})` : 'none',
          }}
        >
          <iframe
            src={`/ads/${slot}.html`}
            width={config.width}
            height={config.height}
            style={{
              border: 'none',
              overflow: 'hidden',
              background: 'transparent',
              display: 'block',
              width: `${config.width}px`,
              height: `${config.height}px`,
            }}
            title={`Adsterra Ad ${slot}`}
            scrolling="no"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};
