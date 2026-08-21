import React from 'react';
import { 
  History, 
  Trash2, 
  X, 
  ChevronRight, 
  Clock, 
  AlertCircle, 
  Terminal, 
  Database,
  Cloud,
  CloudCheck
} from 'lucide-react';
import { HistoryItem } from '../types';
import { Locale } from '../config/i18n.config';

interface HistoryJournalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
  onDeleteItem: (id: string, e: React.MouseEvent) => void;
  currentPrompt?: string;
  locale: Locale;
  isCloudSynced?: boolean;
}

export const HistoryJournal: React.FC<HistoryJournalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistory,
  onClearHistory,
  onDeleteItem,
  currentPrompt,
  locale,
  isCloudSynced = true,
}) => {
  if (!isOpen) return null;

  const isRTL = locale === 'ar';

  const formatTimestamp = (ts: number) => {
    const d = new Date(ts);
    return `${d.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
      month: 'short',
      day: 'numeric'
    })} • ${d.toLocaleTimeString(locale === 'ar' ? 'ar-EG' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })}`;
  };

  const getRiskColor = (score: number) => {
    if (score <= 33) return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/60';
    if (score <= 66) return 'text-amber-400 border-amber-500/30 bg-amber-950/60';
    return 'text-rose-400 border-rose-500/30 bg-rose-950/60';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/70 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <aside 
        className={`relative z-10 w-full max-w-md h-full bg-[#07090E]/95 border-l border-zinc-800/90 shadow-2xl backdrop-blur-2xl flex flex-col justify-between ${
          isRTL ? 'border-r border-l-0' : 'border-l'
        } animate-in slide-in-from-right duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/90">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <Database className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-mono font-bold text-zinc-100 tracking-wider uppercase">
                  {locale === 'ar' ? 'سجل المحاكاة وقاعدة البيانات' : 'QUANTUM CHRONO LOGS'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                  {history.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-medium">
                  {locale === 'ar' ? 'سحابي متصل (Cloud Firestore)' : 'FIRESTORE REAL-TIME SYNC'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="px-2.5 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                title={locale === 'ar' ? 'مسح السجل' : 'Purge Logs'}
              >
                <Trash2 className="w-3 h-3" />
                <span className="hidden sm:inline">{locale === 'ar' ? 'مسح' : 'Purge'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
              title="Close Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Logs List Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-3">
                <History className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                {locale === 'ar' ? 'لا يوجد سجلات محفوظة بعد' : 'NO TELEMETRY LOGS RECORDED'}
              </p>
              <p className="text-[11px] font-sans text-zinc-600 max-w-xs leading-relaxed">
                {locale === 'ar' 
                  ? 'كل سيناريو "ماذا لو" تقوم بمحاكاته سيتم حفظه ومزامنته سحابياً في Firestore للرجوع إليه في أي وقت.'
                  : 'Every counterfactual simulation you execute will be logged and synced in Firestore database for instant review.'}
              </p>
            </div>
          ) : (
            history.map((item, index) => {
              const isSelected = currentPrompt === item.user_prompt;
              return (
                <div
                  key={item.id || index}
                  onClick={() => onSelectHistory(item)}
                  className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                    isRTL ? 'text-right' : 'text-left'
                  } ${
                    isSelected
                      ? 'bg-cyan-950/30 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-900/80 hover:border-zinc-700'
                  }`}
                >
                  {/* Top Metadata Line: ID + Timestamp + Risk Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2 text-[10px]">
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <Terminal className="w-3 h-3 text-cyan-400" />
                      <span>LOG #{String(history.length - index).padStart(3, '0')}</span>
                      <span>•</span>
                      <span>{formatTimestamp(item.timestamp)}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${getRiskColor(item.risk_score)}`}>
                        RISK {item.risk_score}
                      </span>
                      <button
                        onClick={(e) => onDeleteItem(item.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-rose-950/70 text-zinc-500 hover:text-rose-300 transition-all ml-1"
                        title={locale === 'ar' ? 'حذف هذا السجل' : 'Delete log'}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Scenario Prompt Query */}
                  <p className="text-xs font-sans font-medium text-zinc-200 group-hover:text-cyan-300 transition-colors line-clamp-2 mb-1.5 leading-snug">
                    "{item.user_prompt}"
                  </p>

                  {/* Scenario Summary Snippet */}
                  <p className="text-[11px] font-sans text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.scenario_summary}
                  </p>

                  {/* Bottom Indicators */}
                  <div className="mt-2.5 pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-600">
                    <span className="flex items-center gap-1 text-cyan-500/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{item.risk_category}</span>
                    </span>
                    <span className="text-zinc-500 group-hover:text-zinc-300 flex items-center gap-0.5 transition-colors">
                      <span>{locale === 'ar' ? 'استعراض المحاكاة' : 'Recall State'}</span>
                      <ChevronRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer Status */}
        <div className="p-3.5 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400">FIRESTORE CLOUD ACTIVE</span>
          </span>
          <span className="text-zinc-600">ENCRYPTED</span>
        </div>
      </aside>
    </div>
  );
};
