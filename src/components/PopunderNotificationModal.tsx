import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, Sparkles, AlertTriangle, ArrowRight, Clock, Zap, X, ShieldCheck } from 'lucide-react';
import { DIRECT_SPONSORED_LINK } from '../lib/popupManager';

interface PopupEventDetail {
  url?: string;
  mandatory?: boolean;
  onProceed?: () => void;
  onCancel?: () => void;
}

export const PopunderNotificationModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(2);
  const [pendingUrl, setPendingUrl] = useState<string>(DIRECT_SPONSORED_LINK);
  const [isOpening, setIsOpening] = useState(false);
  const callbacksRef = useRef<{ onProceed?: () => void; onCancel?: () => void }>({});
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const handleCustomRequest = (e: Event) => {
      const customEvent = e as CustomEvent<PopupEventDetail>;
      const detail = customEvent.detail || {};
      
      setPendingUrl(detail.url || DIRECT_SPONSORED_LINK);
      callbacksRef.current = {
        onProceed: detail.onProceed,
        onCancel: detail.onCancel,
      };

      setCountdown(2);
      setIsOpening(false);
      setIsOpen(true);
    };

    window.addEventListener('whatif_request_popup_modal', handleCustomRequest);

    return () => {
      window.removeEventListener('whatif_request_popup_modal', handleCustomRequest);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen && countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, countdown]);

  const handleClose = () => {
    setIsOpen(false);
    setIsOpening(false);
    if (callbacksRef.current.onCancel) {
      callbacksRef.current.onCancel();
    }
  };

  const handleProceed = () => {
    if (isOpening) return;
    setIsOpening(true);
    
    const targetUrl = pendingUrl || DIRECT_SPONSORED_LINK;
    
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup window open notice:', e);
    }

    setTimeout(() => {
      setIsOpen(false);
      setIsOpening(false);
      if (callbacksRef.current.onProceed) {
        callbacksRef.current.onProceed();
      }
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-3xl bg-gradient-to-b from-zinc-900/98 to-zinc-950/98 border border-cyan-500/40 p-6 sm:p-7 shadow-[0_0_50px_rgba(6,182,212,0.2)] relative overflow-hidden"
        dir="rtl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="إغلاق"
          className="absolute top-4 left-4 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors z-20 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Animated Glow Border */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-cyan-400 to-amber-500 animate-pulse" />

        {/* Top Notification Badge */}
        <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>نافذة شريك معتمد</span>
          </span>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700 text-[11px] font-mono text-cyan-300 ml-8">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{countdown > 0 ? `جاهز (${countdown}s)` : 'متاح'}</span>
          </div>
        </div>

        {/* Main Title & Notice */}
        <div className="flex items-start gap-3.5 mb-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
            <ExternalLink className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100 leading-snug">
              عرض خاص من الشريك الإعلاني
            </h2>
            <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
              SPONSORED PARTNER WINDOW
            </p>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300 text-xs leading-relaxed space-y-1.5 mb-5 relative z-10">
          <p className="font-semibold text-cyan-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>دعم المحرك ومواصلة المحاكاة المجانية</span>
          </p>
          <p className="text-zinc-400 text-[11px]">
            يسهم زيارة الشريك الإعلاني في تغطية تكاليف معالجات الكوانتوم والحفاظ على سرعة المحرك مجاناً للجميع.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 relative z-10">
          <button
            type="button"
            onClick={handleProceed}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 hover:from-amber-400 hover:to-cyan-300 text-zinc-950 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.3)] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-zinc-950" />
            <span>متابعة إلى عرض الشريك</span>
            <ArrowRight className="w-4 h-4 text-zinc-950" />
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-colors"
          >
            متابعة المحاكاة في التطبيق مباشرة
          </button>
        </div>

        <div className="mt-3.5 text-center relative z-10">
          <p className="text-[10px] font-mono text-zinc-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>بوابة آمنة ومعتمدة 100%</span>
          </p>
        </div>
      </div>
    </div>
  );
};
