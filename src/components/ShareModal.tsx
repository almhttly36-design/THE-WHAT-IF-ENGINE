import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  Twitter, 
  Linkedin, 
  Globe, 
  ExternalLink,
  QrCode,
  Sparkles
} from 'lucide-react';
import { Locale } from '../config/i18n.config';
import { SimulationResult } from '../types';
import { AdBanner } from './AdBanner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
  result: SimulationResult;
  locale: Locale;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  prompt,
  result,
  locale,
}) => {
  const [copied, setCopied] = useState(false);
  const isRTL = locale === 'ar';

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `${prompt.trim()} | The What If Engine`;
  const shareText = result.scenario_summary
    ? `${result.scenario_summary.substring(0, 140)}...`
    : prompt;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `🔮 محاكاة سناريو: "${prompt}"\n\n${shareText}\n\n`
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `🔮 ماذا لو: ${prompt}\n${shareText}\n\nشاهد التحليل والتشعب الزمني بالكامل هنا:\n${currentUrl}`
    )}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="relative z-10 w-full max-w-lg bg-[#07090E] border border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-7 backdrop-blur-2xl flex flex-col gap-5 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-100">
                {locale === 'ar' ? 'مشاركة رابط السيناريو المفهرس' : 'Share Indexed Scenario URL'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                {locale === 'ar' ? 'رابط دائم ومفهرس لمحركات البحث ومواقع التواصل' : 'Permanent deep link for Google & Social Media'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Question Preview Box */}
        <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs">
          <div className="font-mono text-[10px] text-cyan-400 mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{locale === 'ar' ? 'السؤال المفهرس' : 'INDEXED QUERY'}</span>
          </div>
          <p className="text-zinc-200 font-medium line-clamp-2 leading-relaxed">
            {prompt}
          </p>
        </div>

        {/* Copy Link Input Bar */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-zinc-400">
            {locale === 'ar' ? 'الرابط المباشر للسيناريو' : 'Direct Deep Link'}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-zinc-900/90 text-zinc-300 text-xs font-mono rounded-xl px-3.5 py-2.5 border border-zinc-800 select-all focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (locale === 'ar' ? 'تم النسخ!' : 'Copied!') : (locale === 'ar' ? 'نسخ' : 'Copy')}</span>
            </button>
          </div>
        </div>

        {/* Social Platforms Row */}
        <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-zinc-800/80">
          <button
            onClick={handleShareWhatsApp}
            className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="text-lg">💬</span>
            <span>واتساب</span>
          </button>

          <button
            onClick={handleShareTwitter}
            className="p-3 rounded-xl bg-sky-950/40 hover:bg-sky-900/60 border border-sky-500/30 text-sky-300 text-xs font-medium flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Twitter className="w-4 h-4 text-sky-400" />
            <span>X / تويتر</span>
          </button>

          <button
            onClick={handleShareLinkedIn}
            className="p-3 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-medium flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>لينكد إن</span>
          </button>
        </div>

        {/* In-Modal Sponsored Ad */}
        <div className="flex justify-center my-1">
          <AdBanner slot="mobile_320x50" />
        </div>

        {/* Google SEO Badge Footer */}
        <div className="pt-2 text-[11px] font-mono text-zinc-500 flex items-center justify-between border-t border-zinc-900">
          <span className="flex items-center gap-1 text-emerald-400">
            <Globe className="w-3.5 h-3.5" />
            <span>Googlebot & JSON-LD Ready</span>
          </span>
          <span className="text-zinc-600">OpenGraph Meta Injected</span>
        </div>
      </div>
    </div>
  );
};
