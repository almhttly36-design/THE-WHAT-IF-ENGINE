import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const StickyMobileAdBar: React.FC = () => {
  const [closed, setClosed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (closed) return null;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center bg-zinc-950/95 border-t border-zinc-800/90 shadow-[0_-10px_25px_rgba(0,0,0,0.8)] backdrop-blur-lg transition-all duration-300">
      {/* Control Header */}
      <div className="flex items-center justify-between w-full px-3 py-1 bg-zinc-900/90 border-b border-zinc-800/60">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          إعلان مقترح • SPONSORED
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-0.5 text-zinc-400 hover:text-zinc-200 transition-colors"
            title={collapsed ? "توسيع" : "تصغير"}
          >
            {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setClosed(true)}
            className="p-0.5 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="إغلاق الإعلان"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Ad Content */}
      {!collapsed && (
        <div className="p-1 flex items-center justify-center min-h-[50px] w-full">
          <AdBanner slot="mobile_320x50" showLabel={false} className="!my-0" />
        </div>
      )}
    </div>
  );
};
