import React, { useMemo } from 'react';

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
  showLabel?: boolean;
}

const AD_CONFIGS: Record<AdSlotType, { key: string; width: number; height: number; scriptUrl: string }> = {
  leaderboard_728x90: {
    key: 'e23c2a80ff8e551297d1f4a5762287d5',
    width: 728,
    height: 90,
    scriptUrl: 'https://dependedunmoved.com/e23c2a80ff8e551297d1f4a5762287d5/invoke.js',
  },
  mobile_320x50: {
    key: 'df496dfc08aa204fb76ad80761fd6560',
    width: 320,
    height: 50,
    scriptUrl: 'https://dependedunmoved.com/df496dfc08aa204fb76ad80761fd6560/invoke.js',
  },
  rectangle_300x250: {
    key: 'd1c9deb2d9a3041feca5e4c257d52dc0',
    width: 300,
    height: 250,
    scriptUrl: 'https://dependedunmoved.com/d1c9deb2d9a3041feca5e4c257d52dc0/invoke.js',
  },
  banner_468x60: {
    key: '052a31ec6630bf924a2d4f12044da94b',
    width: 468,
    height: 60,
    scriptUrl: 'https://dependedunmoved.com/052a31ec6630bf924a2d4f12044da94b/invoke.js',
  },
  skyscraper_160x600: {
    key: '43f0fbc3138f265c8264efe8a82643cd',
    width: 160,
    height: 600,
    scriptUrl: 'https://dependedunmoved.com/43f0fbc3138f265c8264efe8a82643cd/invoke.js',
  },
  skyscraper_160x300: {
    key: 'bc9210dc33aff03c55fe7cf3474ca050',
    width: 160,
    height: 300,
    scriptUrl: 'https://dependedunmoved.com/bc9210dc33aff03c55fe7cf3474ca050/invoke.js',
  },
};

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '', showLabel = true }) => {
  const config = AD_CONFIGS[slot];

  const htmlContent = useMemo(() => {
    if (!config) return '';
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '${config.key}',
      'format' : 'iframe',
      'height' : ${config.height},
      'width' : ${config.width},
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="${config.scriptUrl}"></script>
</body>
</html>`;
  }, [config]);

  if (!config) return null;

  return (
    <div className={`flex flex-col items-center justify-center my-3 ${className}`}>
      {showLabel && (
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1 select-none">
          إعلان • SPONSORED
        </span>
      )}
      <div 
        className="rounded-xl overflow-hidden bg-zinc-950/60 border border-zinc-800/80 shadow-md flex items-center justify-center transition-all"
        style={{ width: `${config.width}px`, height: `${config.height}px`, maxWidth: '100%' }}
      >
        <iframe
          title={`ad-banner-${slot}`}
          srcDoc={htmlContent}
          width={config.width}
          height={config.height}
          scrolling="no"
          frameBorder="0"
          className="border-0 overflow-hidden"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
};
