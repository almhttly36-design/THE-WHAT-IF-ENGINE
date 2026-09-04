export const DIRECT_SPONSORED_LINK = 'https://dependedunmoved.com/taguzhpv?key=deb899aefad12dc321272866ed9660cb';
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
 * Gatekeeper that informs the user professionally before sending them
 * to the sponsored popunder/popup window, respecting user consent.
 */
export function recordActionAndGate(onComplete: () => void, forced: boolean = false) {
  actionCounter += 1;
  const lastPopupTime = Number(sessionStorage.getItem('whatif_last_popup_time') || '0');
  const now = Date.now();
  const hasShown = sessionStorage.getItem('whatif_popunder_shown');

  // Trigger professional notification on first interaction, or every 2 actions after 45 seconds
  const shouldPrompt = forced || !hasShown || (actionCounter % 2 === 0 && now - lastPopupTime > 45000);

  if (shouldPrompt) {
    requestPopupFlow({
      url: DIRECT_SPONSORED_LINK,
      mandatory: false,
      onProceed: () => {
        sessionStorage.setItem('whatif_popunder_shown', 'true');
        sessionStorage.setItem('whatif_last_popup_time', String(Date.now()));
        onComplete();
      },
      onCancel: () => {
        sessionStorage.setItem('whatif_popunder_shown', 'true');
        sessionStorage.setItem('whatif_last_popup_time', String(Date.now()));
        onComplete();
      },
    });
  } else {
    // Proceed directly with the simulation
    onComplete();
  }
}
