/**
 * Brief branded intro shown on the first full page load.
 * Pure CSS: it fades itself out after ~1s even if JavaScript is slow or disabled,
 * never blocks interaction (pointer-events: none) and is skipped for reduced-motion users.
 */
export default function PageLoader() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] grid animate-loader-out place-items-center bg-ink-900 motion-reduce:hidden"
    >
      <div className="flex flex-col items-center">
        <img src="/images/logo-mark-160.webp" alt="" width={160} height={86} className="h-auto w-24 animate-loader-mark" />
        <span className="mt-6 block h-px w-40 origin-left animate-loader-draw bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
      </div>
    </div>
  );
}
