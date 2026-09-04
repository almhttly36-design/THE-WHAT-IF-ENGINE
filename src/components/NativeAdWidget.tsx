import React, { useEffect } from 'react';

interface NativeAdWidgetProps {
  className?: string;
}

export const NativeAdWidget: React.FC<NativeAdWidgetProps> = ({ className = '' }) => {
  useEffect(() => {
    const scriptId = 'adsterra-native-script-19b87bfeeae538453bcb10d826a885a3';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://www.highperformanceformat.com/19b87bfeeae538453bcb10d826a885a3/invoke.js';
      script.onerror = () => {
        // Fallback to secondary domain if primary is blocked
        const fallback = document.createElement('script');
        fallback.async = true;
        fallback.setAttribute('data-cfasync', 'false');
        fallback.src = 'https://dependedunmoved.com/19b87bfeeae538453bcb10d826a885a3/invoke.js';
        document.body.appendChild(fallback);
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto my-5 ${className}`}>
      <div id="container-19b87bfeeae538453bcb10d826a885a3" className="w-full min-h-[80px] overflow-hidden" />
    </div>
  );
};
