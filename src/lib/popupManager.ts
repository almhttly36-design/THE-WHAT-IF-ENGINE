export const DIRECT_SPONSORED_LINK = 'https://www.highperformanceformat.com/taguzhpv?key=deb899aefad12dc321272866ed9660cb';
export const DIRECT_LINK = DIRECT_SPONSORED_LINK;

interface PopupFlowOptions {
  url?: string;
  mandatory?: boolean;
  onProceed?: () => void;
  onCancel?: () => void;
}

/**
 * Dispatches an event to show the sponsored popup modal if requested.
 */
export function requestPopupFlow(options: PopupFlowOptions = {}) {
  const event = new CustomEvent('whatif_request_popup_modal', {
    detail: {
      url: options.url || DIRECT_SPONSORED_LINK,
      mandatory: options.mandatory ?? false,
      onProceed: options.onProceed,
      onCancel: options.onCancel,
    },
  });
  window.dispatchEvent(event);
}

let actionCounter = 0;

/**
 * Smooth action handler that executes the user's action immediately,
 * keeping the simulation and UI completely responsive without blocking.
 */
export function recordActionAndGate(onComplete: () => void, _forced: boolean = false) {
  // Execute the user's intended action immediately so simulations never get stuck
  onComplete();

  actionCounter += 1;
  const lastPopupTime = Number(sessionStorage.getItem('whatif_last_popup_time') || '0');
  const now = Date.now();
  
  // Only suggest a sponsored popunder opportunistically every 4 actions and at least 45 seconds apart
  if (actionCounter % 4 === 0 && now - lastPopupTime > 45000) {
    sessionStorage.setItem('whatif_last_popup_time', String(now));
    requestPopupFlow({
      url: DIRECT_SPONSORED_LINK,
      mandatory: false,
    });
  }
}
