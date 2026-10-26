/**
 * Analytics events. The tags themselves (GA4 gtag + Google Tag Manager) are injected into the static HTML at
 * build time by scripts/prerender.mjs, only when ENABLE_ANALYTICS=true (the GitHub Actions production build).
 * Local builds and QA runs therefore send nothing.
 *
 * Each event goes to GA4 via gtag('event') and to GTM via a dataLayer {event} push. The GTM container holds the
 * Google Ads tags and no GA4 tag, so nothing is counted twice in GA4.
 */
import { locationList } from '../config/locations';

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, params);
  window.dataLayer?.push({ event, ...params });
}

/** One delegated listener for call links and estimate buttons anywhere on the site. */
export function installClickTracking() {
  if (typeof document === 'undefined') return;
  document.addEventListener(
    'click',
    e => {
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) {
        track('click_to_call', { phone_number: href.slice(4), location: a.getAttribute('data-location') ?? locationList.find(l => l.phoneHref === href)?.id, page_path: location.pathname });
      } else if (/^\/contact\/?(\?|$)/.test(href)) {
        track('estimate_cta_click', { link_text: a.textContent?.trim().slice(0, 60), page_path: location.pathname });
      }
    },
    { capture: true },
  );
}
