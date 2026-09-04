import React, { useEffect, useRef } from 'react';

interface NativeAdWidgetProps {
  className?: string;
}

export const NativeAdWidget: React.FC<NativeAdWidgetProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Avoid duplicate initialization
    if (el.querySelector('#container-19b87bfeeae538453bcb10d826a885a3')) return;

    const adDiv = document.createElement('div');
    adDiv.id = 'container-19b87bfeeae538453bcb10d826a885a3';
    adDiv.className = 'w-full min-h-[90px] overflow-hidden';
    el.appendChild(adDiv);

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://www.highperformanceformat.com/19b87bfeeae538453bcb10d826a885a3/invoke.js';
    script.onerror = () => {
      const fallback = document.createElement('script');
      fallback.async = true;
      fallback.setAttribute('data-cfasync', 'false');
      fallback.src = 'https://dependedunmoved.com/19b87bfeeae538453bcb10d826a885a3/invoke.js';
      el.appendChild(fallback);
    };
    el.appendChild(script);
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto my-4 ${className}`}>
      <div ref={containerRef} className="w-full min-h-[90px] overflow-hidden" />
    </div>
  );
};
