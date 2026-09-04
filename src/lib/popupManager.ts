export const DIRECT_SPONSORED_LINK = 'https://dependedunmoved.com/taguzhpv?key=deb899aefad12dc321272866ed9660cb';
export const DIRECT_LINK = DIRECT_SPONSORED_LINK;

interface PopupFlowOptions {
  url?: string;
  mandatory?: boolean;
  onProceed?: () => void;
  onCancel?: () => void;
}

/**
 * Triggers the mandatory popup notification modal before opening any external or sponsored window.
 */
export function requestPopupFlow(options: PopupFlowOptions = {}) {
  const event = new CustomEvent('whatif_request_popup_modal', {
    detail: {
      url: options.url || DIRECT_SPONSORED_LINK,
      mandatory: true,
      onProceed: options.onProceed,
      onCancel: options.onCancel,
    },
  });
  window.dispatchEvent(event);
}

let actionCounter = 0;

/**
 * Enforces the mandatory popup notification flow across user touchpoints
 * (e.g. search simulations, preset clicks, history restoration, explorer items).
 */
export function recordActionAndGate(onComplete: () => void, forced: boolean = false) {
  actionCounter += 1;
  const lastPopupTime = Number(sessionStorage.getItem('whatif_last_popup_time') || '0');
  const now = Date.now();
  
  // Trigger popup gate periodically (minimum 15s between popups, or on forced triggers)
  const isTimeEligible = now - lastPopupTime > 15000;
  const isActionEligible = actionCounter % 2 === 1;

  if (forced || (isTimeEligible && isActionEligible)) {
    sessionStorage.setItem('whatif_last_popup_time', String(now));
    requestPopupFlow({
      url: DIRECT_SPONSORED_LINK,
      mandatory: true,
      onProceed: () => {
        onComplete();
      },
    });
  } else {
    onComplete();
  }
}
