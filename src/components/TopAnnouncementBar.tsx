import React from 'react';
import { DIRECT_LINK } from '../lib/popupManager';
import { Sparkles, ExternalLink, Zap } from 'lucide-react';

interface TopAnnouncementBarProps {
  locale?: string;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({ locale = 'ar' }) => {
  return (
    <div className="w-full bg-zinc-950/90 border-b border-zinc-800/60 py-1.5 px-3 relative z-30 flex justify-between items-center text-[11px] font-mono shadow-sm">
      <div className="flex items-center gap-2 text-zinc-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="hidden sm:inline">{locale === 'ar' ? 'نظام محاكاة الكوانتوم متصل ويعمل بكامل طاقته' : 'Quantum Causality Engine Online • v2.5.0'}</span>
        <span className="sm:hidden">{locale === 'ar' ? 'المحرك متصل 100%' : 'Engine Online'}</span>
      </div>

      <a
        href={DIRECT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:text-cyan-100 hover:border-cyan-400 transition-colors"
      >
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>{locale === 'ar' ? 'عروض الشريك الرسمي' : 'Partner Deals'}</span>
        <ExternalLink className="w-3 h-3 text-cyan-400" />
      </a>
    </div>
  );
};
