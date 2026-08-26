import React, { useState } from 'react';
import { X, EyeOff } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const DesktopSkyscraperAds: React.FC = () => {
  const [leftVisible, setLeftVisible] = useState(true);
  const [rightVisible, setRightVisible] = useState(true);

  return (
    <>
      {/* Left Desktop Skyscraper Banner (160x600) */}
      {leftVisible && (
        <aside 
          aria-label="Sponsored Advertisement"
          className="hidden 2xl:flex fixed left-3 top-24 z-40 flex-col items-center animate-fade-in"
        >
          <div className="flex items-center justify-between w-full px-1 mb-1">
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">إعلان</span>
            <button
              onClick={() => setLeftVisible(false)}
              className="p-1 text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900 rounded transition-colors"
              title="إخفاء الإعلان"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <div className="p-1 rounded-xl bg-zinc-950/90 border border-zinc-800/80 shadow-2xl backdrop-blur-md">
            <AdBanner slot="skyscraper_160x600" showLabel={false} className="!my-0" />
          </div>
        </aside>
      )}

      {/* Right Desktop Skyscraper Banner (160x600 or 160x300) */}
      {rightVisible && (
        <aside 
          aria-label="Sponsored Advertisement"
          className="hidden 2xl:flex fixed right-3 top-24 z-40 flex-col items-center animate-fade-in"
        >
          <div className="flex items-center justify-between w-full px-1 mb-1">
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">إعلان</span>
            <button
              onClick={() => setRightVisible(false)}
              className="p-1 text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900 rounded transition-colors"
              title="إخفاء الإعلان"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <div className="p-1 rounded-xl bg-zinc-950/90 border border-zinc-800/80 shadow-2xl backdrop-blur-md">
            <AdBanner slot="skyscraper_160x600" showLabel={false} className="!my-0" />
          </div>
        </aside>
      )}
    </>
  );
};
