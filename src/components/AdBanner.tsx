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
  showLabel?: boolean;
}

const AD_DIMENSIONS: Record<AdSlotType, { width: number; height: number; path: string }> = {
  leaderboard_728x90: {
    width: 728,
    height: 90,
    path: '/ads/leaderboard_728x90.html',
  },
  mobile_320x50: {
    width: 320,
    height: 50,
    path: '/ads/mobile_320x50.html',
  },
  rectangle_300x250: {
    width: 300,
    height: 250,
    path: '/ads/rectangle_300x250.html',
  },
  banner_468x60: {
    width: 468,
    height: 60,
    path: '/ads/banner_468x60.html',
  },
  skyscraper_160x600: {
    width: 160,
    height: 600,
    path: '/ads/skyscraper_160x600.html',
  },
  skyscraper_160x300: {
    width: 160,
    height: 300,
    path: '/ads/skyscraper_160x300.html',
  },
};

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '' }) => {
  const config = AD_DIMENSIONS[slot];

  if (!config) return null;

  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <iframe
        title={`adsterra-${slot}`}
        src={config.path}
        width={config.width}
        height={config.height}
        scrolling="no"
        frameBorder="0"
        className="border-0 overflow-hidden bg-transparent"
        style={{
          width: `${config.width}px`,
          height: `${config.height}px`,
          maxWidth: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};


