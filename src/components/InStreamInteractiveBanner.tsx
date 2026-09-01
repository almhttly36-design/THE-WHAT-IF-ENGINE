import React from 'react';
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
  if (variant === 'compact') {
    return (
      <div className={`w-full max-w-4xl mx-auto my-3 flex justify-center items-center ${className}`}>
        <div className="hidden sm:block">
          <AdBanner slot="banner_468x60" />
        </div>
        <div className="block sm:hidden">
          <AdBanner slot="mobile_320x50" />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto my-4 flex justify-center items-center ${className}`}>
      <div className="hidden sm:block">
        <AdBanner slot="leaderboard_728x90" />
      </div>
      <div className="block sm:hidden">
        <AdBanner slot="mobile_320x50" />
      </div>
    </div>
  );
};

