import React from 'react';
import { AdBanner } from './AdBanner';
import { DIRECT_LINK } from '../lib/popupManager';

interface TopAnnouncementBarProps {
  locale?: string;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({ locale = 'ar' }) => {
  return (
    <div className="w-full bg-zinc-950/95 border-b border-zinc-800/80 py-1.5 px-2 sm:px-4 relative z-30 flex justify-center items-center shadow-lg">
      <div className="hidden sm:block">
        <AdBanner slot="leaderboard_728x90" />
      </div>
      <div className="block sm:hidden">
        <AdBanner slot="mobile_320x50" />
      </div>
    </div>
  );
};

