import React from 'react';

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

const SLOT_DIMENSIONS: Record<AdSlotType, { width: number; height: number }> = {
  leaderboard_728x90: { width: 728, height: 90 },
  mobile_320x50: { width: 320, height: 50 },
  banner_468x60: { width: 468, height: 60 },
  rectangle_300x250: { width: 300, height: 250 },
  skyscraper_160x600: { width: 160, height: 600 },
  skyscraper_160x300: { width: 160, height: 300 },
};

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '' }) => {
  const dim = SLOT_DIMENSIONS[slot] || SLOT_DIMENSIONS['rectangle_300x250'];

  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <iframe
        src={`/ads/${slot}.html`}
        width={dim.width}
        height={dim.height}
        style={{ border: 'none', overflow: 'hidden', background: 'transparent' }}
        title={`Adsterra ${slot}`}
        className="max-w-full"
      />
    </div>
  );
};
