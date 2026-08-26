import React, { useEffect, useRef } from 'react';

interface NativeAdWidgetProps {
  className?: string;
}

export const NativeAdWidget: React.FC<NativeAdWidgetProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject the native ad invoke script once
    const containerId = 'container-702888855c4ce6353a2065307af566fc';
    const scriptId = 'adsterra-native-script-702888855';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://dependedunmoved.com/702888855c4ce6353a2065307af566fc/invoke.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto my-6 p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800/80 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-zinc-800/60 pb-2">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
          محتوى مدعوم ومقترح • RECOMMENDED CONTENT
        </span>
      </div>
      <div 
        id="container-702888855c4ce6353a2065307af566fc" 
        ref={containerRef}
        className="w-full min-h-[100px] flex justify-center items-center"
      />
    </div>
  );
};
