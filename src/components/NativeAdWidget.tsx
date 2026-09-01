import React, { useEffect, useRef } from 'react';

interface NativeAdWidgetProps {
  className?: string;
}

export const NativeAdWidget: React.FC<NativeAdWidgetProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject the native ad invoke script safely
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
    <div className={`w-full max-w-4xl mx-auto my-4 flex justify-center items-center ${className}`}>
      <div 
        id="container-702888855c4ce6353a2065307af566fc" 
        ref={containerRef}
        className="w-full min-h-[60px] flex justify-center items-center overflow-hidden"
      />
    </div>
  );
};

