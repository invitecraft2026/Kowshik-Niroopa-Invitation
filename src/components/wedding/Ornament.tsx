export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 40" className={className} aria-hidden fill="none">
      <defs>
        <linearGradient id="orn" x1="0" x2="1">
          <stop offset="0" stopColor="var(--temple-gold)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--rose-gold)" />
          <stop offset="1" stopColor="var(--temple-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 20 H90" stroke="url(#orn)" strokeWidth="1" />
      <path d="M150 20 H240" stroke="url(#orn)" strokeWidth="1" />
      <g transform="translate(120 20)" stroke="var(--rose-gold)" strokeWidth="1">
        <circle r="10" fill="none" />
        <circle r="4" fill="var(--temple-gold)" opacity="0.6" />
        <path d="M-22 0 Q -12 -8 -2 0 Q -12 8 -22 0 Z" fill="var(--rose-gold)" opacity="0.5" stroke="none" />
        <path d="M22 0 Q 12 -8 2 0 Q 12 8 22 0 Z" fill="var(--rose-gold)" opacity="0.5" stroke="none" />
      </g>
    </svg>
  );
}

export function LotusIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M32 52 C 18 46 12 34 14 22 C 22 26 28 32 32 42" />
        <path d="M32 52 C 46 46 52 34 50 22 C 42 26 36 32 32 42" />
        <path d="M32 52 C 24 44 22 30 26 16 C 30 22 32 30 32 42" />
        <path d="M32 52 C 40 44 42 30 38 16 C 34 22 32 30 32 42" />
        <path d="M32 52 C 32 40 32 26 32 12" />
      </g>
    </svg>
  );
}
