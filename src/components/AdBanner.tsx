import React from 'react';

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
  const config = SLOT_CONFIGS[slot] || SLOT_CONFIGS['rectangle_300x250'];

  const srcDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    html, body { margin: 0; padding: 0; overflow: hidden; background: transparent; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; }
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
  <script type="text/javascript" src="https://dependedunmoved.com/${config.key}/invoke.js"></script>
</body>
</html>`;

  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <iframe
        srcDoc={srcDoc}
        width={config.width}
        height={config.height}
        style={{ border: 'none', overflow: 'hidden', background: 'transparent' }}
        title={`Adsterra ${slot}`}
        className="max-w-full"
      />
    </div>
  );
};
