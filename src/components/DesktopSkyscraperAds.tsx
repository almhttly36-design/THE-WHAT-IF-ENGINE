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
          className="hidden xl:flex fixed left-2 top-24 z-30 flex-col items-center animate-fade-in"
        >
          <div className="flex justify-end w-full mb-0.5">
            <button
              onClick={() => setLeftVisible(false)}
              className="p-0.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded transition-colors"
              title="Close"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <AdBanner slot="skyscraper_160x600" className="!my-0" />
        </aside>
      )}

      {/* Right Desktop Skyscraper Banner (160x600) */}
      {rightVisible && (
        <aside 
          aria-label="Sponsored Advertisement"
          className="hidden xl:flex fixed right-2 top-24 z-30 flex-col items-center animate-fade-in"
        >
          <div className="flex justify-end w-full mb-0.5">
            <button
              onClick={() => setRightVisible(false)}
              className="p-0.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded transition-colors"
              title="Close"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <AdBanner slot="skyscraper_160x600" className="!my-0" />
        </aside>
      )}
    </>
  );
};
