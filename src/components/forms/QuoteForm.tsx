import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, Loader2, Phone, Send } from 'lucide-react';
import { issueTypes, timeSlots } from '../../config/content';
import { getLocation, locationList, type LocationId } from '../../config/locations';
import { submitQuote, isFormEndpointConfigured, type QuotePayload } from '../../lib/submitQuote';
import { cn } from '../../lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured';
type Errors = Partial<Record<keyof FormState, string>>;

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  location: LocationId | '';
  serviceType: 'residential' | 'commercial' | '';
  service: string;
  address: string;
  preferredDate: string;
  timeSlot: string;
  description: string;
  consent: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function validate(s: FormState): Errors {
  const e: Errors = {};
  // Order matches the visual field order so focus moves to the first invalid field.
  if (!s.location) e.location = 'Please choose Chicago or Indianapolis.';
  if (s.fullName.trim().length < 2) e.fullName = 'Please enter your full name.';
  const digits = s.phone.replace(/\D/g, '');
  if (!digits) e.phone = 'Please enter a phone number so we can reach you.';
  else if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))) || /^[01]/.test(digits.length === 11 ? digits.slice(1) : digits))
    e.phone = 'Please enter a valid 10-digit US phone number.';
  if (s.email.trim() && !EMAIL_RE.test(s.email.trim())) e.email = 'Please enter a valid email address.';
  if (!s.serviceType) e.serviceType = 'Please choose residential or commercial.';
  if (!s.service) e.service = 'Please choose the service you need.';
  if (s.address.trim().length < 5) e.address = 'Please enter your service address or ZIP code.';
  if (s.preferredDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(s.preferredDate + 'T00:00:00') < today) e.preferredDate = 'Please choose today or a future date.';
  }
  if (s.description.length > 1500) e.description = 'Please keep the description under 1,500 characters.';
  if (!s.consent) e.consent = 'Please confirm you agree to be contacted about your request.';
  return e;
}

function Field({ id, label, required, error, hint, children }: { id: string; label: string; required?: boolean; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required ? <span className="text-gold-600" aria-hidden="true">*</span> : <span className="font-normal text-stone-500">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-stone-500">{hint}</p>}
      <AnimatePresence>
        {error && (
          <m.p id={`${id}-error`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="field-error">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

interface QuoteFormProps {
  defaultLocation?: LocationId;
  defaultServiceType?: 'residential' | 'commercial';
  defaultService?: string;
  /** Lock the location choice (used on location-specific pages). */
  lockLocation?: boolean;
  title?: string;
}

export default function QuoteForm({ defaultLocation, defaultServiceType, defaultService, lockLocation, title = 'Request a free estimate' }: QuoteFormProps) {
  const uid = useId();
  const fid = (n: string) => `${uid}-${n}`;
  const [params] = useSearchParams();
  const mountedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [honeypot, setHoneypot] = useState('');
  const [minDate, setMinDate] = useState('');
  const [state, setState] = useState<FormState>({
    fullName: '', phone: '', email: '',
    location: defaultLocation ?? '',
    serviceType: defaultServiceType ?? '',
    service: defaultService ?? '',
    address: '', preferredDate: '', timeSlot: '', description: '', consent: false,
  });

  // Query-string preselection (?location=chicago&type=commercial&service=Broken%20Spring), applied after hydration.
  useEffect(() => {
    const q = getLocation(params.get('location') ?? undefined);
    const type = params.get('type');
    const svc = params.get('service');
    setState(s => ({
      ...s,
      location: lockLocation ? s.location : q?.id ?? s.location,
      serviceType: type === 'residential' || type === 'commercial' ? type : s.serviceType,
      service: svc && issueTypes.includes(svc) ? svc : s.service,
    }));
    setMinDate(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10));
  }, [params, lockLocation]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setState(s => ({ ...s, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }));
  };

  const selectedLocation = getLocation(state.location || undefined);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(state);
    setErrors(errs);
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }
    // Spam protection: hidden honeypot field + minimum time on page.
    if (honeypot || Date.now() - mountedAt.current < 2500) {
      setStatus('error');
      return;
    }
    if (!isFormEndpointConfigured()) {
      setStatus('unconfigured');
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }
    setStatus('submitting');
    const payload: QuotePayload = {
      ...state,
      location: state.location as LocationId,
      locationLabel: selectedLocation?.label ?? '',
      locationPhone: selectedLocation?.phoneDisplay ?? '',
      phone: formatPhone(state.phone),
      submittedAt: new Date().toISOString(),
      page: typeof window !== 'undefined' ? window.location.pathname : '',
    };
    const ok = await submitQuote(payload);
    setStatus(ok ? 'success' : 'error');
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const describedBy = (k: keyof FormState, hint?: boolean) => (errors[k] ? `${fid(k)}-error` : hint ? `${fid(k)}-hint` : undefined);

  if (status === 'success' && selectedLocation) {
    return (
      <m.div ref={statusRef} tabIndex={-1} role="status" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-lg border border-emerald-200 bg-white p-8 text-center shadow-card outline-none md:p-12">
        <m.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </m.span>
        <h3 className="mt-6 text-2xl font-semibold text-ink-900">Request received — thank you, {state.fullName.split(' ')[0]}.</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-stone-600">
          Our {selectedLocation.city} team will contact you at <strong className="text-ink-900">{formatPhone(state.phone)}</strong> to confirm your appointment.
        </p>
        <p className="mt-6 text-sm text-stone-600">Need help right now?</p>
        <a href={selectedLocation.phoneHref} data-location={selectedLocation.id} className="mt-2 inline-flex items-center gap-2 rounded-md bg-ink-900 px-5 py-3 font-semibold text-white">
          <Phone className="h-4 w-4" aria-hidden="true" /> Call {selectedLocation.city}: {selectedLocation.phoneDisplay}
        </a>
      </m.div>
    );
  }

  const radioCard = (selected: boolean, invalid?: boolean) =>
    cn(
      'relative flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3.5 transition focus-within:ring-2 focus-within:ring-gold-300',
      selected ? 'border-gold-500 bg-gold-50 shadow-sm' : invalid ? 'border-red-400' : 'border-stone-300 bg-white hover:border-stone-400',
    );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-lg border border-stone-200 bg-white p-6 shadow-lift md:p-9" aria-describedby={`${uid}-required-note`}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-2xl font-semibold text-ink-900">{title}</h3>
        <p id={`${uid}-required-note`} className="text-[13px] text-stone-500"><span className="text-gold-600">*</span> Required</p>
      </div>
      <p className="mt-2 text-stone-600">Tell us what’s going on and when suits you. Free onsite estimates.</p>

      <div className="mt-8 grid gap-5">
        {/* Location */}
        <fieldset>
          <legend className="field-label">Service location <span className="text-gold-600" aria-hidden="true">*</span></legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {(lockLocation && defaultLocation ? locationList.filter(l => l.id === defaultLocation) : locationList).map((l, i) => (
              <label key={l.id} className={cn(radioCard(state.location === l.id, !!errors.location), lockLocation && 'sm:col-span-2')}>
                <input
                  type="radio"
                  name={fid('location')}
                  value={l.id}
                  checked={state.location === l.id}
                  onChange={() => set('location', l.id)}
                  className="h-4 w-4 accent-[#B08A45]"
                  data-field={i === 0 ? 'location' : undefined}
                  aria-describedby={describedBy('location')}
                />
                <span className="flex flex-col">
                  <span className="font-semibold text-ink-900">{l.label}</span>
                  <span className="text-[13px] text-stone-500 tabular-nums">{l.phoneDisplay}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.location && <p id={`${fid('location')}-error`} className="field-error"><AlertCircle className="h-3.5 w-3.5" aria-hidden="true" /> {errors.location}</p>}
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={fid('fullName')} label="Full name" required error={errors.fullName}>
            <input id={fid('fullName')} data-field="fullName" className="field" autoComplete="name" value={state.fullName} onChange={e => set('fullName', e.target.value)} aria-invalid={!!errors.fullName} aria-describedby={describedBy('fullName')} aria-required="true" />
          </Field>
          <Field id={fid('phone')} label="Phone number" required error={errors.phone}>
            <input id={fid('phone')} data-field="phone" type="tel" inputMode="tel" className="field tabular-nums" autoComplete="tel-national" placeholder="(555) 555-5555" value={state.phone} onChange={e => set('phone', formatPhone(e.target.value))} aria-invalid={!!errors.phone} aria-describedby={describedBy('phone')} aria-required="true" />
          </Field>
        </div>

        <Field id={fid('email')} label="Email" error={errors.email}>
          <input id={fid('email')} data-field="email" type="email" inputMode="email" className="field" autoComplete="email" value={state.email} onChange={e => set('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={describedBy('email')} />
        </Field>

        <fieldset>
          <legend className="field-label">Property type <span className="text-gold-600" aria-hidden="true">*</span></legend>
          <div className="grid grid-cols-2 gap-2">
            {(['residential', 'commercial'] as const).map((t, i) => (
              <label key={t} className={radioCard(state.serviceType === t, !!errors.serviceType)}>
                <input type="radio" name={fid('serviceType')} value={t} checked={state.serviceType === t} onChange={() => set('serviceType', t)} className="h-4 w-4 accent-[#B08A45]" data-field={i === 0 ? 'serviceType' : undefined} aria-describedby={describedBy('serviceType')} />
                <span className="font-semibold capitalize text-ink-900">{t}</span>
              </label>
            ))}
          </div>
          {errors.serviceType && <p id={`${fid('serviceType')}-error`} className="field-error"><AlertCircle className="h-3.5 w-3.5" aria-hidden="true" /> {errors.serviceType}</p>}
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={fid('service')} label="Service needed" required error={errors.service}>
            <select id={fid('service')} data-field="service" className="field" value={state.service} onChange={e => set('service', e.target.value)} aria-invalid={!!errors.service} aria-describedby={describedBy('service')} aria-required="true">
              <option value="">Select a service…</option>
              {issueTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field id={fid('address')} label="Service address or ZIP" required error={errors.address}>
            <input id={fid('address')} data-field="address" className="field" autoComplete="street-address" value={state.address} onChange={e => set('address', e.target.value)} aria-invalid={!!errors.address} aria-describedby={describedBy('address')} aria-required="true" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={fid('preferredDate')} label="Preferred date" error={errors.preferredDate}>
            <input id={fid('preferredDate')} data-field="preferredDate" type="date" min={minDate || undefined} className="field" value={state.preferredDate} onChange={e => set('preferredDate', e.target.value)} aria-invalid={!!errors.preferredDate} aria-describedby={describedBy('preferredDate')} />
          </Field>
          <Field id={fid('timeSlot')} label="Preferred time window">
            <select id={fid('timeSlot')} className="field" value={state.timeSlot} onChange={e => set('timeSlot', e.target.value)}>
              <option value="">Any time</option>
              {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        <Field id={fid('description')} label="Describe the problem" error={errors.description} hint="E.g. “Loud bang this morning, door won’t open, opener light blinking.”">
          <textarea id={fid('description')} data-field="description" rows={4} maxLength={1500} className="field resize-y" value={state.description} onChange={e => set('description', e.target.value)} aria-invalid={!!errors.description} aria-describedby={describedBy('description', true)} />
        </Field>

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={fid('website')}>Leave this field empty</label>
          <input id={fid('website')} name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-stone-600">
            <input type="checkbox" data-field="consent" checked={state.consent} onChange={e => set('consent', e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#B08A45]" aria-invalid={!!errors.consent} aria-describedby={describedBy('consent')} />
            <span>
              I agree that Premium Garage Door may contact me by phone, text or email about this request. Message and data rates may apply. See our{' '}
              <Link to="/privacy-policy" className="font-semibold text-ink-900 underline decoration-gold-400 underline-offset-2">Privacy Policy</Link>.
            </span>
          </label>
          {errors.consent && <p id={`${fid('consent')}-error`} className="field-error"><AlertCircle className="h-3.5 w-3.5" aria-hidden="true" /> {errors.consent}</p>}
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        <AnimatePresence>
          {status === 'error' && (
            <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="mt-6 flex gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>
                Sorry — we couldn’t send your request. Please try again in a moment, or call{' '}
                {selectedLocation ? <a className="font-semibold underline" href={selectedLocation.phoneHref}>{selectedLocation.phoneDisplay}</a> : 'your local team'} for immediate help.
              </p>
            </m.div>
          )}
          {status === 'unconfigured' && (
            <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="mt-6 flex gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>
                Online requests aren’t connected yet, so <strong>your details have not been sent</strong>. Please call our {selectedLocation?.city} team at{' '}
                {selectedLocation && <a className="font-semibold underline" href={selectedLocation.phoneHref} data-location={selectedLocation.id}>{selectedLocation.phoneDisplay}</a>} — we’re available 24/7.
              </p>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-7 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AnimatePresence mode="wait">
          {selectedLocation ? (
            <m.a key={selectedLocation.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} href={selectedLocation.phoneHref} data-location={selectedLocation.id} className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-ink-900 hover:text-gold-600">
              <Phone className="h-4 w-4 text-gold-500" aria-hidden="true" /> Prefer to talk? {selectedLocation.phoneDisplay}
            </m.a>
          ) : (
            <span className="text-sm text-stone-500">Choose a location to see your local number.</span>
          )}
        </AnimatePresence>
        <button type="submit" disabled={status === 'submitting'} className="group relative inline-flex h-14 items-center justify-center gap-2.5 overflow-hidden rounded-md bg-ink-900 px-8 font-semibold text-white shadow-lift transition hover:bg-ink-700 disabled:opacity-70">
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Submit Request <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
