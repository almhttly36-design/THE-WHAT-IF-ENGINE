import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, Sparkles, AlertTriangle, ArrowRight, Clock, Zap, Lock, ShieldCheck } from 'lucide-react';
import { DIRECT_SPONSORED_LINK } from '../lib/popupManager';

interface PopupEventDetail {
  url?: string;
  mandatory?: boolean;
  onProceed?: () => void;
  onCancel?: () => void;
}

export const PopunderNotificationModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [pendingUrl, setPendingUrl] = useState<string>(DIRECT_SPONSORED_LINK);
  const [isOpening, setIsOpening] = useState(false);
  const callbacksRef = useRef<{ onProceed?: () => void; onCancel?: () => void }>({});
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // 1. Custom event listener for mandatory popup gating across the application
    const handleCustomRequest = (e: Event) => {
      const customEvent = e as CustomEvent<PopupEventDetail>;
      const detail = customEvent.detail || {};
      
      setPendingUrl(detail.url || DIRECT_SPONSORED_LINK);
      callbacksRef.current = {
        onProceed: detail.onProceed,
        onCancel: detail.onCancel,
      };

      setCountdown(3);
      setIsOpening(false);
      setIsOpen(true);
    };

    window.addEventListener('whatif_request_popup_modal', handleCustomRequest);

    // 2. Global click listener: intercept external links and ensure modal notification first
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.target === '_blank') {
        const href = link.getAttribute('href');
        if (href && (href.includes('dependedunmoved') || href.includes('adsterra') || href.startsWith('http'))) {
          e.preventDefault();
          e.stopPropagation();
          setPendingUrl(href);
          callbacksRef.current = {
            onProceed: () => {
              window.open(href, '_blank', 'noopener,noreferrer');
            },
          };
          setCountdown(3);
          setIsOpening(false);
          setIsOpen(true);
          return false;
        }
      }
    };

    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      window.removeEventListener('whatif_request_popup_modal', handleCustomRequest);
      document.removeEventListener('click', handleDocumentClick, true);
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
    }, 250);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-zinc-900/98 to-zinc-950/98 border-2 border-amber-500/60 p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.25)] relative overflow-hidden"
        dir="rtl"
      >
        {/* Animated Glow Border */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-cyan-400 to-amber-500 animate-pulse" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Notification Badge */}
        <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase shadow-inner">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>تنبيه إجباري مسبق</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700 text-[11px] font-mono text-cyan-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{countdown > 0 ? `جاهز (${countdown}s)` : 'جاهز الآن'}</span>
          </div>
        </div>

        {/* Main Title & Notice */}
        <div className="flex items-start gap-4 mb-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-950/50">
            <ExternalLink className="w-7 h-7 animate-pulse" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100 tracking-tight leading-tight">
              ستذهب إلى إعلان نافذة منبثقة من Adsterra
            </h2>
            <p className="text-xs font-mono text-amber-400/90 mt-1">
              NOTICE: YOU ARE PROCEEDING TO AN ADSTERRA SPONSORED POPUP WINDOW
            </p>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="space-y-3 mb-6 relative z-10">
          <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 text-zinc-200 text-xs sm:text-sm leading-relaxed space-y-2">
            <p className="font-semibold text-cyan-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>دعم تشغيل خوادم ونماذج الذكاء الاصطناعي مجاناً</span>
            </p>
            <p className="text-zinc-300 text-xs leading-relaxed">
              لإتاحة محرك <strong className="text-zinc-100 font-mono">The What If Engine</strong> بأحدث معالجات الكوانتوم مجاناً لجميع المستخدمين، يرجى المتابعة والدخول إلى إعلان النافذة المنبثقة للشريك الرسمي.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/25 text-[11px] text-amber-200 flex items-center gap-2 font-mono">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>الدخول إلى النافذة المنبثقة إجباري لتأكيد الجلسة ومتابعة محاكاتك.</span>
          </div>
        </div>

        {/* Progress Countdown Bar */}
        <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden mb-6 relative z-10 border border-zinc-700/50">
          <div 
            className="bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400 h-full transition-all duration-1000 ease-linear shadow-[0_0_12px_rgba(245,158,11,0.6)]"
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          />
        </div>

        {/* Mandatory Action Button - No Skip / No Bypass */}
        <div className="relative z-10">
          <button
            type="button"
            onClick={handleProceed}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 hover:from-amber-400 hover:to-cyan-300 text-zinc-950 font-black text-sm sm:text-base tracking-wide transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:shadow-[0_0_45px_rgba(245,158,11,0.6)] active:scale-[0.98] border border-amber-300/50"
          >
            <Sparkles className="w-5 h-5 text-zinc-950 animate-spin-slow" />
            <span>المتابعة والدخول إلى إعلان النافذة المنبثقة</span>
            <ArrowRight className="w-5 h-5 text-zinc-950 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Security Footer Note */}
        <div className="mt-4 text-center relative z-10">
          <p className="text-[10px] font-mono text-zinc-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>شبكة إعلانات معتمدة وآمنة بنسبة 100% • SECURE POPUNDER GATEWAY</span>
          </p>
        </div>
      </div>
    </div>
  );
};
