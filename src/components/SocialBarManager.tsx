import React, { useEffect } from 'react';

/**
 * SocialBarManager
 * Ultra-professional lifecycle manager for Adsterra's Social Bar script.
 * Ensures the script loads cleanly without duplicates and preserves UI accessibility.
 */
export const SocialBarManager: React.FC = () => {
  useEffect(() => {
    const scriptSrc = 'https://dependedunmoved.com/9f/aa/3a/9faa3a17e3e4d6d066a4373b065728da.js';
    
    // Check if script already exists in document
    const existing = document.querySelector(`script[src*="9faa3a17e3e4d6d066a4373b065728da"]`);
    if (!existing) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = scriptSrc;
      script.async = true;
      script.id = 'adsterra-social-bar-script';
      
      script.onerror = (e) => {
        console.warn('Adsterra Social Bar script notice:', e);
      };

      document.body.appendChild(script);
    }
  }, []);

  return null;
};
