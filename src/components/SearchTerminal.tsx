'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Terminal as TerminalIcon, 
  Loader2, 
  Activity, 
  AlertCircle,
  Zap
} from 'lucide-react';
import { SimulationResult } from '../types';

export interface SearchTerminalDictionary {
  search_placeholder: string;
  analyze_button: string;
  simulating_button: string;
  trending_label: string;
  preset_1: string;
  preset_2: string;
  preset_3: string;
}

interface SearchTerminalProps {
  dict: SearchTerminalDictionary;
  dir?: 'ltr' | 'rtl';
  locale?: string;
  isSimulating?: boolean;
  onAnalyze?: (prompt: string) => void;
  onSimulationSuccess?: (data: SimulationResult) => void;
  errorMessage?: string | null;
}

export default function SearchTerminal({
  dict,
  dir = 'rtl',
  locale = 'ar',
  isSimulating = false,
  onAnalyze,
  onSimulationSuccess,
  errorMessage: externalErrorMessage,
}: SearchTerminalProps) {
  const [query, setQuery] = useState('');
  const [internalLoading, setInternalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const isRTL = dir === 'rtl';

  const presets = [dict.preset_1, dict.preset_2, dict.preset_3];
  const loading = isSimulating || internalLoading;
  const currentError = externalErrorMessage || localError;

  const executeSimulation = async (promptToRun: string) => {
    const cleanPrompt = promptToRun.trim();
    if (!cleanPrompt || loading) return;

    if (onAnalyze) {
      onAnalyze(cleanPrompt);
      return;
    }

    // Default standalone client fetch implementation
    setInternalLoading(true);
    setLocalError(null);

    try {
      const customKey = localStorage.getItem('GEMINI_CUSTOM_KEY') || undefined;

      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: cleanPrompt,
          language: locale,
          customApiKey: customKey,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to simulate scenario.');
      }

      console.log('[Oracle Engine Simulation Result]:', result.data);

      if (onSimulationSuccess) {
        onSimulationSuccess(result.data);
      }
    } catch (err: any) {
      console.error('Simulation Fetch Error:', err);
      setLocalError(err.message || 'An unexpected error occurred.');
    } finally {
      setInternalLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSimulation(query);
  };

  const handlePresetSelect = (preset: string) => {
    setQuery(preset);
    executeSimulation(preset);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2">
      <div className="relative group">
        {/* Ambient Neon Back-Glow */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/20 via-sky-500/30 to-emerald-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />

        {/* Terminal Glass Container */}
        <div className="relative rounded-2xl bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/90 p-3 sm:p-5 shadow-2xl transition-all duration-300 group-focus-within:border-cyan-500/50 group-focus-within:shadow-[0_0_35px_-5px_rgba(6,182,212,0.3)]">
          
          {/* Top Terminal Status Header */}
          <div className="flex items-center justify-between px-2 py-1.5 border-b border-zinc-800/80 mb-3 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="mx-1 text-zinc-500 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                simulation_prompt.sh [{(locale || 'ar').toUpperCase()}]
              </span>
            </div>
            <span className="text-emerald-400 flex items-center gap-1.5 text-[11px] tracking-wider font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              GEMINI 3.7 FLASH API
            </span>
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1 flex items-center">
              <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} text-zinc-500 pointer-events-none`}>
                <Sparkles className="w-5 h-5 text-cyan-400/80" />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
                placeholder={dict.search_placeholder}
                className={`w-full bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 text-sm sm:text-base font-normal rounded-xl py-4 ${
                  isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'
                } border border-zinc-800 focus:outline-none focus:bg-zinc-900/90 focus:border-cyan-500/60 transition-all font-sans`}
              />

              {/* Laser Scanning Line Animation */}
              {loading && (
                <div 
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse pointer-events-none"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="relative overflow-hidden px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none text-zinc-950 font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                  <span>{dict.simulating_button}</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-zinc-950 fill-zinc-950" />
                  <span>{dict.analyze_button}</span>
                  {isRTL ? (
                    <ArrowLeft className="w-4 h-4 text-zinc-950" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-zinc-950" />
                  )}
                </>
              )}
            </button>
          </form>

          {/* Dynamic Error State */}
          {currentError && (
            <div className="mt-3 px-3.5 py-2.5 rounded-lg bg-red-950/40 border border-red-500/40 flex items-center gap-2 text-red-300 text-xs font-mono">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{currentError}</span>
            </div>
          )}

          {/* Quick Preset Seeds */}
          <div className="mt-3.5 pt-3 border-t border-zinc-900/90 flex flex-wrap items-center gap-2 px-1 text-xs">
            <span className="text-zinc-500 font-mono text-[11px] flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" />
              {dict.trending_label}
            </span>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className="px-2.5 py-1 rounded-md bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-cyan-300 border border-zinc-800 hover:border-cyan-500/40 transition-all text-[11px] font-sans truncate max-w-[260px] cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
