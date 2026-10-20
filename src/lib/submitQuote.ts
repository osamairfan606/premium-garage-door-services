import type { LocationId } from '../config/locations';

/**
 * Quote-request submission.
 *
 * Set VITE_FORM_ENDPOINT at build time to a URL that accepts a JSON POST and returns 2xx on success.
 * On GoDaddy it is the site's own PHP endpoint, `/api/quote.php` (public/api/quote.php), which emails the
 * request through WordPress. A relative path keeps staging and production posting to their own server.
 * Never put secret API keys in this file or in any VITE_ variable: they are shipped to the browser.
 * Keep secrets on the server that VITE_FORM_ENDPOINT points to. See README.md → "Connecting the forms".
 */
export interface QuotePayload {
  fullName: string;
  phone: string;
  email: string;
  location: LocationId;
  locationLabel: string;
  locationPhone: string;
  service: string;
  address: string;
  preferredDate: string;
  timeSlot: string;
  description: string;
  consent: boolean;
  submittedAt: string;
  page: string;
  /** Honeypot (must be empty) and time spent on the page, re-checked by the server. */
  website: string;
  elapsedMs: number;
}

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export const isFormEndpointConfigured = () => typeof ENDPOINT === 'string' && /^(https?:\/\/|\/)/.test(ENDPOINT);

export async function submitQuote(payload: QuotePayload): Promise<boolean> {
  if (!isFormEndpointConfigured()) return false;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(ENDPOINT!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
}
