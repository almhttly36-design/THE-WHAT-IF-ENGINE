import React from 'react';
import { Cpu, GitFork, History, Shield, Globe2, Sparkles } from 'lucide-react';
import type { Locale } from '@/config/i18n.config';
import { localeDirection } from '@/config/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import SearchTerminal from '@/components/SearchTerminal';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const dir = localeDirection[locale] || 'rtl';

  return (
    <main className="relative min-h-screen bg-[#04060A] text-zinc-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-zinc-950 font-sans overflow-x-hidden">
      
      {/* Background Matrix Grid Pattern & Cyan Ambient Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 18%, rgba(6, 182, 212, 0.14) 0%, rgba(4, 6, 10, 0.98) 72%)'
        }}
      />

      {/* Main Hero Container */}
      <div className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 py-16 sm:py-24 flex flex-col items-center justify-center">
        
        {/* Top Status Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{dict.home.badge}</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 pb-3 leading-tight font-sans">
            {dict.home.hero_title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {dict.home.hero_subtitle}
          </p>
        </div>

        {/* Center Search Terminal Component */}
        <div className="w-full my-4">
          <SearchTerminal 
            dict={dict.home}
            dir={dir}
            locale={locale}
          />
        </div>

        {/* Feature Trust Chips / Specs Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-xs font-mono backdrop-blur-md hover:border-cyan-500/30 transition-all">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>{dict.home.badges.ai_models}</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-xs font-mono backdrop-blur-md hover:border-sky-500/30 transition-all">
            <GitFork className="w-4 h-4 text-sky-400" />
            <span>{dict.home.badges.realtime}</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-xs font-mono backdrop-blur-md hover:border-emerald-500/30 transition-all">
            <History className="w-4 h-4 text-emerald-400" />
            <span>{dict.home.badges.historical}</span>
          </div>
        </div>

      </div>

      {/* Futuristic Minimal Footer */}
      <footer className="relative z-10 border-t border-zinc-900/80 bg-zinc-950/70 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            SYSTEM STATUS: ONLINE
          </span>
          <span className="text-zinc-700">|</span>
          <span>ORACLE v2.4</span>
        </div>
        <div className="text-zinc-600">
          THE WHAT IF ENGINE © 2026 • QUANTUM CAUSALITY LABS
        </div>
      </footer>

    </main>
  );
}
