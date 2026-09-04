import React, { useEffect, useRef } from 'react';

interface NativeAdWidgetProps {
  className?: string;
}

const ENABLE_NATIVE_AD = true;

export const NativeAdWidget: React.FC<NativeAdWidgetProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!ENABLE_NATIVE_AD) return;

    const el = containerRef.current;
    if (!el || initializedRef.current) return;

    const existingScript = el.querySelector(`script[src*="19b87bfeeae538453bcb10d826a885a3"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//dependedunmoved.com/19b87bfeeae538453bcb10d826a885a3/invoke.js';
      
      script.onload = () => {
        initializedRef.current = true;
      };

      el.appendChild(script);
    }
  }, []);

  if (!ENABLE_NATIVE_AD) {
    return null;
  }

  return (
    <div className={`w-full max-w-4xl mx-auto my-6 px-2 animate-in fade-in duration-300 ${className}`} dir="rtl">
      {/* Official Adsterra Native Container */}
      <div
        id="container-19b87bfeeae538453bcb10d826a885a3"
        ref={containerRef}
        className="w-full min-h-[110px] rounded-2xl bg-zinc-950/60 border border-zinc-800/70 p-2 overflow-hidden shadow-lg shadow-black/40 transition-all duration-300"
      />
    </div>
  );
};
