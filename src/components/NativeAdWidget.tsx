import React, { useEffect, useRef } from 'react';

interface NativeAdWidgetProps {
  className?: string;
}

// Active ad format flag - now ACTIVATED as requested by the user
const ENABLE_NATIVE_AD = true;

export const NativeAdWidget: React.FC<NativeAdWidgetProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!ENABLE_NATIVE_AD) return;

    const el = containerRef.current;
    if (!el || initializedRef.current) return;

    // Ensure the container exists and has the required Adsterra ID
    const containerId = 'container-19b87bfeeae538453bcb10d826a885a3';
    
    // Check if script is already present in this container
    const existingScript = el.querySelector(`script[src*="19b87bfeeae538453bcb10d826a885a3"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://dependedunmoved.com/19b87bfeeae538453bcb10d826a885a3/invoke.js';
      
      script.onload = () => {
        initializedRef.current = true;
      };

      script.onerror = (e) => {
        console.warn('Adsterra Native Ad script load notice:', e);
      };

      el.appendChild(script);
    }
  }, []);

  if (!ENABLE_NATIVE_AD) {
    return null;
  }

  return (
    <div className={`w-full max-w-4xl mx-auto my-6 px-2 animate-in fade-in duration-300 ${className}`}>
      {/* Sleek contextual sponsor label */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
          <span>إعلانات موصى بها • Sponsored Recommendations</span>
        </span>
      </div>

      {/* The Official Adsterra Native Container */}
      <div
        id="container-19b87bfeeae538453bcb10d826a885a3"
        ref={containerRef}
        className="w-full min-h-[110px] rounded-2xl bg-zinc-950/60 border border-zinc-800/70 p-3 overflow-hidden shadow-lg shadow-black/40 transition-all duration-300"
      />
    </div>
  );
};
