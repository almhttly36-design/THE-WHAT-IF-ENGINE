import React from 'react';
import { AdBanner } from './AdBanner';
import { DIRECT_LINK } from '../lib/popupManager';
import { ExternalLink, Sparkles } from 'lucide-react';

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
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'badge') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${className}`}
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="font-bold">🔥 HOT DEALS • عروض حصرية</span>
        <ExternalLink className="w-3 h-3 text-red-400" />
      </button>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`w-full max-w-4xl mx-auto my-3 flex justify-center items-center ${className}`}>
        <div className="hidden sm:block">
          <AdBanner slot="leaderboard_728x90" />
        </div>
        <div className="block sm:hidden">
          <AdBanner slot="mobile_320x50" />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <AdBanner slot="rectangle_300x250" />
    </div>
  );
};

