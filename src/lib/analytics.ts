// src/lib/analytics.ts
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Initialize GA4
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll track manually
  });
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (!window.gtag) return;
  window.gtag('event', eventName, params);
};

// Track conversions
export const trackConversion = (value: number, currency: string = 'GBP') => {
  if (!window.gtag) return;
  window.gtag('event', 'purchase', {
    value,
    currency,
    transaction_id: `txn_${Date.now()}`,
  });
};

// Track form starts
export const trackFormStart = (formName: string) => {
  trackEvent('form_start', { form_name: formName });
};

// Track form completions
export const trackFormComplete = (formName: string) => {
  trackEvent('form_complete', { form_name: formName });
};

// Track clicks on CTAs
export const trackCTAClick = (location: string, market: string) => {
  trackEvent('cta_click', {
    click_location: location,
    market: market
  });
};

// Track newsletter signups
export const trackNewsletterSignup = (source: string) => {
  trackEvent('newsletter_signup', { source });
};

// Track referral link clicks
export const trackReferralClick = (code: string) => {
  trackEvent('referral_click', { referral_code: code });
};
