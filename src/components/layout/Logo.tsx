export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="14" className="fill-accent" />
      <rect x="12" y="12" width="18" height="18" rx="4" className="fill-accent-contrast" />
      <rect
        x="34"
        y="12"
        width="18"
        height="18"
        rx="4"
        className="fill-accent-contrast"
        opacity=".6"
      />
      <rect
        x="12"
        y="34"
        width="18"
        height="18"
        rx="4"
        className="fill-accent-contrast"
        opacity=".6"
      />
      <path
        d="M43 34l2.6 5.4L51 42l-5.4 2.6L43 50l-2.6-5.4L35 42l5.4-2.6z"
        className="fill-accent-contrast"
      />
    </svg>
  );
}
