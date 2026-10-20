// Fire the Google Ads lead conversion event (account AW-18087660374).
// Call only after a lead has been successfully submitted.
export function fireAdsConversion() {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-18087660374/7NLeCPXZtpscENaW77BD',
        value: 1.0,
        currency: 'CAD',
      });
    }
  } catch {
    // Analytics must never break lead submission.
  }
}
