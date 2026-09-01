import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const StickyMobileAdBar: React.FC = () => {
  const [closed, setClosed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (closed) return null;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center bg-zinc-950/95 border-t border-zinc-800 shadow-2xl transition-all duration-300">
      {/* Mini Dismiss Bar */}
      <div className="flex items-center justify-end w-full px-2 py-0.5 bg-zinc-900/90">
        <button
          onClick={() => setClosed(true)}
          className="p-1 text-zinc-400 hover:text-zinc-200"
          title="Close"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Ad Content */}
      <div className="flex items-center justify-center min-h-[50px] w-full py-1">
        <AdBanner slot="mobile_320x50" className="!my-0" />
      </div>
    </div>
  );
};
