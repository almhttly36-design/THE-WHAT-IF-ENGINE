import React from 'react';

interface TopAnnouncementBarProps {
  locale?: string;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({ locale = 'ar' }) => {
  return (
    <div className="w-full bg-zinc-950/90 border-b border-zinc-800/60 py-1.5 px-4 relative z-30 flex justify-between items-center text-[11px] font-mono shadow-sm">
      <div className="flex items-center gap-2 text-zinc-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>{locale === 'ar' ? 'محرك محاكاة الكوانتوم متصل ويعمل بكامل طاقته' : 'Quantum Causality Engine Online • v2.5.0'}</span>
      </div>

      <div className="hidden sm:flex items-center gap-3 text-zinc-500 text-[10px]">
        <span>GEMINI 2.5 FLASH</span>
        <span>•</span>
        <span>NEURAL SIMULATION MATRIX</span>
      </div>
    </div>
  );
};
