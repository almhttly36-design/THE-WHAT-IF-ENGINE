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

  // Professional srcDoc encapsulation:
  // 1. Isolates atOptions in its own window to prevent conflicts between multiple slots.
  // 2. Uses parser-synchronous script tags so Adsterra document.write works natively.
  // 3. Has dark transparent styling matching the app theme.
  // 4. Immune to browser frame crash screens (ERR_NAME_NOT_RESOLVED never renders on the frame itself).
  const srcDocHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
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
    atOptions = {
      'key' : '${config.key}',
      'format' : 'iframe',
      'height' : ${config.height},
      'width' : ${config.width},
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://www.highperformanceformat.com/${config.key}/invoke.js" onerror="this.onerror=null;this.src='https://dependedunmoved.com/${config.key}/invoke.js';"></script>
</body>
</html>`;

  return (
    <div 
      className={`relative flex items-center justify-center overflow-hidden max-w-full my-2 transition-all ${className}`}
      style={{ minHeight: `${config.height}px` }}
    >
      <iframe
        srcDoc={srcDocHtml}
        width={config.width}
        height={config.height}
        style={{
          border: 'none',
          overflow: 'hidden',
          background: 'transparent',
          maxWidth: '100%',
          display: 'block'
        }}
        title={`Adsterra Ad ${slot}`}
        scrolling="no"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
      />
    </div>
  );
};
