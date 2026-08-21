import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Terminal as TerminalIcon, 
  Loader2, 
  Activity, 
  AlertCircle, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ShieldCheck, 
  Cpu, 
  GitFork, 
  History,
  Zap,
  Bookmark,
  Radar,
  CheckCircle2,
  Database,
  Key,
  Save,
  Trash2
} from 'lucide-react';
import { SupportedLocale, SimulationResult, HistoryItem } from './types';
import { localeDirection, localeLabels, Locale } from './config/i18n.config';
import { getDictionary, Dictionary } from './lib/dictionary';
import { HistoryJournal } from './components/HistoryJournal';
import { ToastContainer, ToastMessage } from './components/ToastContainer';

const LOCAL_STORAGE_HISTORY_KEY = 'WHAT_IF_SIMULATION_HISTORY';
const LOCAL_STORAGE_API_KEY = 'WHAT_IF_GEMINI_API_KEY';

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem('WHAT_IF_LOCALE');
      if (saved && (saved === 'ar' || saved === 'en' || saved === 'es' || saved === 'fr')) {
        return saved as Locale;
      }
    } catch (e) {
      console.warn('Failed to read locale from localStorage:', e);
    }
    return 'ar';
  });
  const [dict, setDict] = useState<Dictionary | null>(null);
  const [query, setQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Smart API Key Management: Only shows if missing or failing
  const [userApiKey, setUserApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_API_KEY) || '';
    } catch {
      return '';
    }
  });
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [keyErrorMsg, setKeyErrorMsg] = useState<string | null>(null);
  const [hasServerKey, setHasServerKey] = useState<boolean | null>(null);

  // Check on load if the server has an active Gemini key
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHasServerKey(!!data.hasServerApiKey);
      })
      .catch(() => {
        setHasServerKey(false);
      });
  }, []);

  // Helper to trigger toast notifications
  const addToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev.slice(-3), newToast]); // Keep maximum 4 active toasts

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const dir = localeDirection[locale] || 'rtl';
  const isRTL = dir === 'rtl';

  useEffect(() => {
    getDictionary(locale).then(setDict);
    try {
      localStorage.setItem('WHAT_IF_LOCALE', locale);
    } catch (e) {
      console.warn('Failed to save locale to localStorage:', e);
    }
  }, [locale]);

  // Load history logs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load local simulation history:', e);
    }
  }, []);

  const saveHistoryItem = (promptText: string, simResult: SimulationResult) => {
    try {
      const newItem: HistoryItem = {
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        user_prompt: promptText.trim(),
        scenario_summary: simResult.scenario_summary,
        result: simResult,
        risk_score: simResult.risk_index?.score || 50,
        risk_category: simResult.risk_index?.category || 'MODERATE',
      };

      setHistory((prev) => {
        // Remove duplicate prompt if exists to keep list clean and bump to top
        const filtered = prev.filter((item) => item.user_prompt.trim().toLowerCase() !== promptText.trim().toLowerCase());
        const updated = [newItem, ...filtered].slice(0, 50); // Cap at 50 logs
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.warn('Failed to persist history item:', e);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_HISTORY_KEY);
    } catch (e) {
      console.warn('Failed to clear local history:', e);
    }
  };

  const handleDeleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to delete item from local storage:', err);
      }
      return updated;
    });
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setQuery(item.user_prompt);
    setResult({
      ...item.result,
      source: 'local_cache',
    });
    setErrorMessage(null);
    setIsHistoryOpen(false);
    addToast(
      locale === 'ar' ? 'تم استرجاع السيناريو فورياً من الذاكرة المحلية' : 'Scenario restored instantly from local cache',
      'info',
      locale === 'ar' ? 'سجل محلي' : 'Local Telemetry'
    );
  };

  const handleAnalyze = async (overridePrompt?: string) => {
    const promptToUse = overridePrompt || query;
    if (!promptToUse.trim() || isSimulating) return;

    // If server has no key and user has no key, prompt immediately
    if (hasServerKey === false && !userApiKey) {
      setKeyErrorMsg(
        locale === 'ar'
          ? 'يرجى إدخال مفتاح Gemini API للمتابعة (لا يوجد مفتاح مفعل على الخادم).'
          : 'Please enter your Gemini API Key to proceed.'
      );
      setKeyInput('');
      setIsKeyModalOpen(true);
      return;
    }

    setIsSimulating(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse.trim(),
          language: locale,
          customApiKey: userApiKey ? userApiKey.trim() : undefined,
        }),
      });

      const data = await response.json();

      // If backend reports that an API key is required or the provided key is invalid
      if (!response.ok && data.needsApiKey) {
        setKeyErrorMsg(
          locale === 'ar'
            ? 'مفتاح Gemini API غير موجود أو غير صالح. يرجى إدخال مفتاح صحيح.'
            : 'Gemini API Key is missing or invalid. Please provide a valid key.'
        );
        setKeyInput(userApiKey);
        setIsKeyModalOpen(true);
        throw new Error(data.error || 'API Key Required');
      }

      if (response.ok && data.success && data.data) {
        setResult(data.data);
        saveHistoryItem(promptToUse, data.data);

        // Feedback toast based on knowledge source
        if (data.data.source === 'shared_cache') {
          addToast(
            locale === 'ar' 
              ? 'تم استرجاع السيناريو فورياً من قاعدة المعرفة المشتركة (Supabase Cache)'
              : 'Loaded instantly from Supabase Shared Knowledge Base (0ms API cost)',
            'info',
            locale === 'ar' ? 'ذاكرة سحابية مشتركة' : 'Shared Cache Hit'
          );
        } else {
          addToast(
            locale === 'ar'
              ? 'تم توليد التحليل بواسطة الذكاء الاصطناعي وأرشفته في المعرفة المشتركة'
              : 'Synthesized by Gemini AI & indexed into Shared Knowledge Base',
            'success',
            locale === 'ar' ? 'ذكاء اصطناعي فائق' : 'Gemini Synthesized'
          );
        }
        return;
      }

      throw new Error(data.error || (locale === 'ar' ? 'فشلت عملية المحاكاة. يرجى المحاولة مرة أخرى.' : 'Simulation failed. Please try again.'));
    } catch (err: any) {
      console.error('Simulation execution error:', err);
      let userFriendlyMsg = err.message || '';
      if (userFriendlyMsg.includes('503') || userFriendlyMsg.includes('UNAVAILABLE') || userFriendlyMsg.includes('high demand')) {
        userFriendlyMsg = locale === 'ar'
          ? 'النموذج يواجه ضغطاً مؤقتاً في الطلبات. جاري إعادة التوجيه، يرجى المحاولة بعد لحظات.'
          : 'The AI model is experiencing temporary high demand. Please try again in a few moments.';
      }
      setErrorMessage(userFriendlyMsg);
    } finally {
      setIsSimulating(false);
    }
  };

  const handlePresetSelect = (preset: string) => {
    setQuery(preset);
    handleAnalyze(preset);
  };

  if (!dict) {
    return (
      <div className="min-h-screen bg-[#04060A] text-zinc-400 flex items-center justify-center font-mono">
        LOADING_ORACLE_ENGINE...
      </div>
    );
  }

  const presets = [dict.home.preset_1, dict.home.preset_2, dict.home.preset_3];

  return (
    <div 
      dir={dir} 
      className="min-h-screen bg-[#04060A] text-zinc-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-zinc-950 font-sans relative overflow-x-hidden"
    >
      {/* Background Matrix Grid Pattern & Cyan Ambient Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
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
          background: 'radial-gradient(circle at 50% 15%, rgba(6, 182, 212, 0.12) 0%, rgba(4, 6, 10, 0.98) 75%)'
        }}
      />

      {/* Top Header Navigation Bar */}
      <header className="relative z-20 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-white">THE WHAT IF ENGINE</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                ORACLE v2.4
              </span>
            </div>
            <p className="text-[11px] font-mono text-zinc-500">QUANTUM CAUSAL SIMULATOR</p>
          </div>
        </div>

        {/* Right Controls: History Button & Language Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* History Drawer Toggle Button */}
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-800 hover:border-cyan-500/40 text-zinc-300 hover:text-white text-xs font-mono transition-all cursor-pointer shadow-sm group"
            title={locale === 'ar' ? 'سجل السيناريوهات السابقة' : 'Chrono History Logs'}
          >
            <History className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-[-45deg] transition-transform duration-300" />
            <span className="font-medium">
              {locale === 'ar' ? 'السجل' : 'Logs'}
            </span>
            {history.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold">
                {history.length}
              </span>
            )}
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-lg p-0.5 text-xs font-mono">
            {(['ar', 'en', 'es', 'fr'] as Locale[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLocale(lang)}
                className={`px-2.5 py-1 rounded-md transition-all uppercase cursor-pointer ${
                  locale === lang 
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title={localeLabels[lang]}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Slide-Over Local History Journal Drawer */}
      <HistoryJournal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistory={handleSelectHistory}
        onClearHistory={handleClearHistory}
        onDeleteItem={handleDeleteHistoryItem}
        currentPrompt={query}
        locale={locale}
      />

      {/* Futuristic Corner Toast Notifications System */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
        locale={locale}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        
        {/* Top Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{dict.home.badge}</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 pb-2 leading-tight">
            {dict.home.hero_title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {dict.home.hero_subtitle}
          </p>
        </div>

        {/* Search Terminal Component */}
        <div className="w-full max-w-4xl mx-auto my-3 px-2">
          <div className="relative group">
            {/* Ambient Back Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/20 via-sky-500/30 to-emerald-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />

            {/* Terminal Container */}
            <div className="relative rounded-2xl bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/90 p-3 sm:p-5 shadow-2xl transition-all duration-300 group-focus-within:border-cyan-500/50 group-focus-within:shadow-[0_0_35px_-5px_rgba(6,182,212,0.3)]">
              
              {/* Terminal Title Bar */}
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
                  GEMINI 3.7 FLASH
                </span>
              </div>

              {/* Form Input */}
              <form onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }} className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-1 flex items-center">
                  <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} text-zinc-500 pointer-events-none`}>
                    <Sparkles className="w-5 h-5 text-cyan-400/80" />
                  </div>

                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isSimulating}
                    placeholder={dict.home.search_placeholder}
                    className={`w-full bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 text-sm sm:text-base font-normal rounded-xl py-4 ${
                      isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'
                    } border border-zinc-800 focus:outline-none focus:bg-zinc-900/90 focus:border-cyan-500/60 transition-all font-sans`}
                  />

                  {/* Laser Pulse / Scanline Effect */}
                  {isSimulating && (
                    <div 
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse pointer-events-none"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSimulating || !query.trim()}
                  className="relative overflow-hidden px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none text-zinc-950 font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  {isSimulating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                      <span>{dict.home.simulating_button}</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-zinc-950 fill-zinc-950" />
                      <span>{dict.home.analyze_button}</span>
                      {isRTL ? (
                        <ArrowLeft className="w-4 h-4 text-zinc-950" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-zinc-950" />
                      )}
                    </>
                  )}
                </button>
              </form>

              {/* Error Notice */}
              {errorMessage && (
                <div className="mt-3.5 px-4 py-3 rounded-xl bg-red-950/50 border border-red-500/50 flex items-center gap-2.5 text-red-300 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Trending Presets & Quick Recent History */}
              <div className="mt-3.5 pt-3 border-t border-zinc-900/90 flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-zinc-500 font-mono text-[11px] flex items-center gap-1">
                    <Activity className="w-3 h-3 text-cyan-400" />
                    {dict.home.trending_label}
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

                {history.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsHistoryOpen(true)}
                    className="text-[11px] font-mono text-cyan-400/90 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <History className="w-3 h-3" />
                    <span>{locale === 'ar' ? `السجل (${history.length})` : `History (${history.length})`}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Specs Badges */}
        <div className="mt-4 mb-6 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{dict.home.badges.ai_models}</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-xs font-mono">
            <GitFork className="w-3.5 h-3.5 text-sky-400" />
            <span>{dict.home.badges.realtime}</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-xs font-mono">
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span>{dict.home.badges.historical}</span>
          </div>
        </div>

        {/* Futuristic Loading State Animation */}
        {isSimulating && (
          <div className="w-full max-w-4xl my-6 p-8 rounded-2xl bg-zinc-950/90 border border-cyan-500/40 shadow-[0_0_45px_-5px_rgba(6,182,212,0.35)] text-center flex flex-col items-center justify-center animate-pulse backdrop-blur-xl">
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
              <Activity className="w-7 h-7 text-cyan-400 animate-bounce" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">{dict.home.simulating_button}</h3>
            <p className="text-xs font-mono text-zinc-400 max-w-md mx-auto">
              CONNECTING TO GEMINI 3.7 FLASH • COMPUTING CAUSAL MATRIX & BRANCH VECTORS
            </p>
          </div>
        )}

        {/* Analytical Dashboard Results (Dynamically Injected with Entrance Animation) */}
        {result && !isSimulating && (
          <div className="w-full max-w-4xl my-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            
            {/* Top Grid: Scenario Overview & Dynamic Risk Meter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Executive Summary Card (Glassmorphism) */}
              <div className="md:col-span-2 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-2xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <FileText className="w-4 h-4" />
                      <span>{dict.dashboard.summary_label}</span>
                    </div>
                    {result.search_intent_title && (
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 truncate max-w-[200px]">
                        {result.search_intent_title}
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-100 text-sm sm:text-base leading-relaxed font-sans font-medium">
                    {result.scenario_summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
                  <div className="flex items-center gap-2">
                    {result.source === 'shared_cache' ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        <Database className="w-3 h-3 text-emerald-400" />
                        <span>SHARED KNOWLEDGE (CACHED)</span>
                      </span>
                    ) : result.source === 'local_cache' ? (
                      <span className="flex items-center gap-1.5 text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/30">
                        <History className="w-3 h-3 text-sky-400" />
                        <span>LOCAL JOURNAL CACHE</span>
                      </span>
                    ) : result.source === 'resilient_engine' ? (
                      <span className="flex items-center gap-1.5 text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                        <Cpu className="w-3 h-3 text-amber-400" />
                        <span>RESILIENT PROJECTION ENGINE</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>{result.model_used ? `${result.model_used.toUpperCase()} (SYNTHESIZED)` : 'GEMINI (SYNTHESIZED)'}</span>
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    SIMULATION CONVERGED
                  </span>
                </div>
              </div>

              {/* Requirement 1: Visual Risk Meter (Circular Gauge + Linear Threshold Bar) */}
              {(() => {
                const score = Math.max(1, Math.min(100, result.risk_index.score || 50));
                // 1-33: Green, 34-66: Yellow, 67-100: Red
                const isGreen = score <= 33;
                const isYellow = score > 33 && score <= 66;
                const isRed = score > 66;

                const colorTheme = isGreen
                  ? {
                      stroke: '#10b981',
                      text: 'text-emerald-400',
                      badge: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300',
                      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.2)]',
                      barBg: 'bg-emerald-500',
                      status: 'LOW RISK / STABLE',
                    }
                  : isYellow
                  ? {
                      stroke: '#f59e0b',
                      text: 'text-amber-400',
                      badge: 'bg-amber-950/70 border-amber-500/40 text-amber-300',
                      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.2)]',
                      barBg: 'bg-amber-500',
                      status: 'MODERATE DIVERGENCE',
                    }
                  : {
                      stroke: '#ef4444',
                      text: 'text-rose-400',
                      badge: 'bg-rose-950/70 border-rose-500/40 text-rose-300',
                      glow: 'shadow-[0_0_25px_rgba(239,68,68,0.2)]',
                      barBg: 'bg-rose-500',
                      status: 'HIGH VOLATILITY',
                    };

                // Circumference for r=36 is 2 * PI * 36 ≈ 226.2
                const radius = 36;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference - (score / 100) * circumference;

                return (
                  <div className={`p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-2xl flex flex-col items-center justify-between text-center relative overflow-hidden ${colorTheme.glow}`}>
                    <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                      <AlertCircle className={`w-3.5 h-3.5 ${colorTheme.text}`} />
                      <span>{dict.dashboard.risk_label}</span>
                    </div>

                    {/* Circular SVG Gauge */}
                    <div className="relative my-2 w-28 h-28 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                        {/* Background track circle */}
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke="#27272a"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        {/* Animated progress circle */}
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke={colorTheme.stroke}
                          strokeWidth="8"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      {/* Central Value Display */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className={`text-2xl font-black font-mono tracking-tighter ${colorTheme.text}`}>
                          {score}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">/100</span>
                      </div>
                    </div>

                    {/* Category Pill Badge */}
                    <div className="w-full flex flex-col items-center gap-1.5">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${colorTheme.badge}`}>
                        {result.risk_index.category || colorTheme.status}
                      </span>

                      {/* Threshold Scale Indicator (1-33 | 34-66 | 67-100) */}
                      <div className="w-full mt-2 grid grid-cols-3 gap-1 px-1">
                        <div className={`h-1.5 rounded-full transition-all ${score >= 1 ? (isGreen ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]' : 'bg-emerald-950') : 'bg-zinc-800'}`} title="1-33: Green" />
                        <div className={`h-1.5 rounded-full transition-all ${score >= 34 ? (isYellow ? 'bg-amber-500 shadow-[0_0_6px_#f59e0b]' : 'bg-amber-950') : 'bg-zinc-800'}`} title="34-66: Yellow" />
                        <div className={`h-1.5 rounded-full transition-all ${score >= 67 ? (isRed ? 'bg-rose-500 shadow-[0_0_6px_#ef4444]' : 'bg-rose-950') : 'bg-zinc-800'}`} title="67-100: Red" />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Requirement 2: Glassmorphism Dashboard Cards (Optimistic vs Pessimistic) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Optimistic Outcome Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/20 via-zinc-950/80 to-emerald-950/10 border border-emerald-500/30 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(16,185,129,0.08)] flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-bold tracking-wide">{dict.dashboard.optimistic_label}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 uppercase">
                      BRANCH ALPHA (+)
                    </span>
                  </div>
                  <p className="text-zinc-200 text-sm leading-relaxed font-sans">
                    {result.outcomes.optimistic}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-950/80 flex items-center gap-2 text-[11px] font-mono text-emerald-500/80">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>UPWARD CAUSAL CASCADE</span>
                </div>
              </div>

              {/* Pessimistic Outcome Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/20 via-zinc-950/80 to-rose-950/10 border border-rose-500/30 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(244,63,94,0.08)] flex flex-col justify-between group hover:border-rose-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                      <TrendingDown className="w-4 h-4" />
                      <span className="font-bold tracking-wide">{dict.dashboard.pessimistic_label}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 uppercase">
                      BRANCH OMEGA (-)
                    </span>
                  </div>
                  <p className="text-zinc-200 text-sm leading-relaxed font-sans">
                    {result.outcomes.pessimistic}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-rose-950/80 flex items-center gap-2 text-[11px] font-mono text-rose-500/80">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>CRITICAL FRICTION VECTOR</span>
                </div>
              </div>
            </div>

            {/* Requirement 3: Temporal Impact Grid (3 Sleek Cards) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-2xl shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Clock className="w-4 h-4" />
                  <span className="font-bold tracking-wide">{dict.dashboard.temporal_label}</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">CHRONO DIVERGENCE METRICS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1 Month Card */}
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-cyan-500/30 hover:border-cyan-500/60 transition-all flex flex-col justify-between relative group">
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {dict.dashboard.one_month}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                        +30 DAYS
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                      {result.temporal_impact.one_month}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-zinc-800/80 text-[10px] font-mono text-cyan-500/70">
                    IMMEDIATE SHIFT
                  </div>
                </div>

                {/* 1 Year Card */}
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-sky-500/30 hover:border-sky-500/60 transition-all flex flex-col justify-between relative group">
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                        <History className="w-3.5 h-3.5 text-sky-400" />
                        {dict.dashboard.one_year}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 border border-sky-500/30 text-sky-300">
                        +365 DAYS
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                      {result.temporal_impact.one_year}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-zinc-800/80 text-[10px] font-mono text-sky-500/70">
                    STRUCTURAL ADAPTATION
                  </div>
                </div>

                {/* 5 Years Card */}
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-indigo-500/30 hover:border-indigo-500/60 transition-all flex flex-col justify-between relative group">
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-xs font-mono font-bold text-indigo-400 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-indigo-400" />
                        {dict.dashboard.five_years}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30 text-indigo-300">
                        +1825 DAYS
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                      {result.temporal_impact.five_years}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-zinc-800/80 text-[10px] font-mono text-indigo-500/70">
                    LONG-TERM PARADIGM
                  </div>
                </div>
              </div>
            </div>

            {/* Requirement 4: Futuristic Numbered Contingency Plan List */}
            <div className="p-6 sm:p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-2xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-bold tracking-wide">{dict.dashboard.contingency_label}</span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300">
                  {result.contingency_plan?.length || 0} DIRECTIVES
                </span>
              </div>

              <div className="space-y-3">
                {result.contingency_plan?.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/90 hover:border-amber-500/40 transition-all flex items-start gap-3.5 group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-zinc-950 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 shadow-inner group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Futuristic Footer */}
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

      {/* Smart API Key Dialog (Appears automatically when key is missing or failing) */}
      {isKeyModalOpen && (
        <div 
          id="api-key-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-fadeIn"
          dir={dir}
        >
          <div 
            id="api-key-modal-container"
            className="w-full max-w-lg rounded-2xl bg-zinc-900/95 border border-cyan-500/40 p-6 sm:p-7 shadow-2xl shadow-cyan-950/50 relative overflow-hidden"
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 shadow-inner">
                <Key className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white tracking-tight">
                  {locale === 'ar' ? 'تفعيل مفتاح الذكاء الاصطناعي (Gemini API)' : 'Gemini AI Engine Activation'}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  {locale === 'ar' 
                    ? 'المفتاح مطلوب لتوليد المحاكاة والتنبؤ السببي بدقة فائقة'
                    : 'Required to power autonomous causality simulations'}
                </p>
              </div>
            </div>

            {keyErrorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{keyErrorMsg}</span>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <label className="block text-xs font-mono text-zinc-300">
                {locale === 'ar' ? 'أدخل مفتاح Google Gemini API:' : 'Enter your Google Gemini API Key:'}
              </label>
              <div className="relative">
                <input
                  id="gemini-api-key-input"
                  type="password"
                  value={keyInput}
                  onChange={(e) => {
                    setKeyInput(e.target.value);
                    setKeyErrorMsg(null);
                  }}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-zinc-100 placeholder:text-zinc-600 font-mono text-xs outline-none transition-all"
                />
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                {locale === 'ar'
                  ? '🔒 يتم حفظ المفتاح بأمان داخل متصفحك محلياً (Local Storage) ولن تحتاج لإدخاله مرة أخرى إلا إذا قمت بتغييره أو انتهت صلاحيته.'
                  : '🔒 Your key is securely stored in your local browser storage and used for subsequent requests automatically.'}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-zinc-800/80">
              {userApiKey ? (
                <button
                  type="button"
                  onClick={() => {
                    try {
                      localStorage.removeItem(LOCAL_STORAGE_API_KEY);
                    } catch {}
                    setUserApiKey('');
                    setKeyInput('');
                    setKeyErrorMsg(null);
                    addToast(
                      locale === 'ar' ? 'تم حذف المفتاح المحلي' : 'API Key Removed',
                      'info'
                    );
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-mono text-rose-400 hover:bg-rose-950/40 border border-rose-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'حذف المفتاح' : 'Delete'}</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsKeyModalOpen(false);
                    setKeyErrorMsg(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 text-xs font-mono transition-all cursor-pointer"
                >
                  {locale === 'ar' ? 'إلغاء' : 'Dismiss'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const trimmed = keyInput.trim();
                    if (!trimmed) {
                      setKeyErrorMsg(
                        locale === 'ar' ? 'يرجى إدخال مفتاح صالح' : 'Please enter a valid API key'
                      );
                      return;
                    }
                    try {
                      localStorage.setItem(LOCAL_STORAGE_API_KEY, trimmed);
                    } catch {}
                    setUserApiKey(trimmed);
                    setIsKeyModalOpen(false);
                    setKeyErrorMsg(null);
                    addToast(
                      locale === 'ar' ? 'تم حفظ وتفعيل مفتاح Gemini بنجاح' : 'Gemini API Key activated & saved locally',
                      'success',
                      locale === 'ar' ? 'تفعيل المحرك' : 'Engine Ready'
                    );
                    // If user had an active query, auto-trigger analysis
                    if (query.trim()) {
                      handleAnalyze(query.trim());
                    }
                  }}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs font-mono transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'حفظ وتفعيل' : 'Save & Activate'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
