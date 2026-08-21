import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X, ShieldAlert } from 'lucide-react';
import { Locale } from '../config/i18n.config';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  locale: Locale;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  locale,
}) => {
  if (toasts.length === 0) return null;

  const isRTL = locale === 'ar';

  return (
    <div
      className={`fixed bottom-5 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 pointer-events-none transition-all duration-300 ${
        isRTL ? 'left-0 sm:left-6 items-start' : 'right-0 sm:right-6 items-end'
      }`}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto w-full p-3.5 rounded-xl border backdrop-blur-2xl shadow-2xl flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                : isError
                ? 'bg-rose-950/90 border-rose-500/40 text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.2)]'
                : isWarning
                ? 'bg-amber-950/90 border-amber-500/40 text-amber-100 shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                : 'bg-zinc-950/90 border-cyan-500/40 text-cyan-100 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
            }`}
          >
            {/* Icon */}
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isError && <ShieldAlert className="w-4 h-4 text-rose-400" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-4 h-4 text-cyan-400" />}
            </div>

            {/* Message Body */}
            <div className="flex-1 text-xs">
              {toast.title && (
                <div className="font-mono font-bold uppercase tracking-wider mb-0.5 text-[11px] opacity-90">
                  {toast.title}
                </div>
              )}
              <div className="font-sans leading-relaxed text-zinc-200">
                {toast.message}
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 p-1 text-zinc-400 hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
