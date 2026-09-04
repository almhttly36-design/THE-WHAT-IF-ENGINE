import React, { useEffect, useRef, useState } from 'react';
import { DIRECT_LINK } from '../lib/popupManager';
import { ExternalLink, Sparkles } from 'lucide-react';

export type AdSlotType = 
  | 'leaderboard_728x90' 
  | 'mobile_320x50' 
  | 'rectangle_300x250' 
  | 'banner_468x60'
  | 'skyscraper_160x600'
  | 'skyscraper_160x300';

interface AdBannerProps {
  slot: AdSlotType;
  className?: string;
}

const SLOT_CONFIGS: Record<AdSlotType, { key: string; width: number; height: number }> = {
  leaderboard_728x90: { key: '1a3b227a010318dbb7d14d98429feb19', width: 728, height: 90 },
  mobile_320x50: { key: '2c8c62d0a93aa8b9c0e679da8233110e', width: 320, height: 50 },
  banner_468x60: { key: '3277cebc283bc249d801a5f60b657736', width: 468, height: 60 },
  rectangle_300x250: { key: '6c97f9f681c8897b60d177725efce083', width: 300, height: 250 },
  skyscraper_160x600: { key: '000d815dba9b930fdb4a4fcd4581e4ca', width: 160, height: 600 },
  skyscraper_160x300: { key: '000d815dba9b930fdb4a4fcd4581e4ca', width: 160, height: 300 },
};

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const config = SLOT_CONFIGS[slot] || SLOT_CONFIGS['rectangle_300x250'];

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let isMounted = true;

    // Listen for ad block / script failure notification from inside the frame
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'AD_BLOCKED' && event.data.slot === slot) {
        if (isMounted) setIsBlocked(true);
      }
    };
    window.addEventListener('message', handleMessage);

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body {
              width: 100%;
              height: 100%;
              background: transparent;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            window.atOptions = {
              'key' : '${config.key}',
              'format' : 'iframe',
              'height' : ${config.height},
              'width' : ${config.width},
              'params' : {}
            };

            function tryLoadScript(src, fallback) {
              var s = document.createElement('script');
              s.type = 'text/javascript';
              s.src = src;
              s.async = true;
              s.onerror = function() {
                if (fallback) {
                  tryLoadScript(fallback, null);
                } else {
                  window.parent.postMessage({ type: 'AD_BLOCKED', slot: '${slot}' }, '*');
                }
              };
              document.body.appendChild(s);
            }

            tryLoadScript(
              'https://www.highperformanceformat.com/${config.key}/invoke.js',
              'https://dependedunmoved.com/${config.key}/invoke.js'
            );
          </script>
        </body>
        </html>
      `);
      doc.close();
    } catch (e) {
      if (isMounted) setIsBlocked(true);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('message', handleMessage);
    };
  }, [config.key, config.width, config.height, slot]);

  // If network or DNS blocks the third-party script, show an elegant direct partner banner instead of a broken grey box
  if (isBlocked) {
    return (
      <div className={`flex items-center justify-center overflow-hidden my-2 ${className}`}>
        <a
          href={DIRECT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{ width: `${config.width}px`, height: `${Math.min(config.height, 90)}px` }}
          className="max-w-full px-3 py-2 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800/80 hover:border-cyan-500/50 flex items-center justify-between gap-3 text-zinc-300 transition-all shadow-lg group select-none"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="text-[11px] font-mono text-zinc-400 truncate">
              {slot.includes('mobile') ? '🔥 عروض برعاية الشريك' : '⚡ شريك رسمي معتمد • SPECIAL PROMOTIONS'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 group-hover:text-cyan-300 shrink-0 font-mono">
            <span>زيارة</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <iframe
        ref={iframeRef}
        width={config.width}
        height={config.height}
        style={{ border: 'none', overflow: 'hidden', background: 'transparent' }}
        title={`Adsterra ${slot}`}
        className="max-w-full"
      />
    </div>
  );
};
