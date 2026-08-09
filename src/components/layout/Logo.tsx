import { cn } from '@/lib/cn';

/** Wordmark glyph — a monospaced "H" with a cobalt crossbar. */
export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  const stroke = inverted ? '#FBFBF9' : '#0B0B0C';
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('shrink-0', className)}
      fill="none"
      role="img"
      aria-hidden
    >
      <rect width="64" height="64" rx="12" fill={inverted ? 'transparent' : '#0B0B0C'} />
      <path
        d="M18 16V48"
        stroke={inverted ? stroke : '#FBFBF9'}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M46 16V48"
        stroke={inverted ? stroke : '#FBFBF9'}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M18 32H46" stroke="#1F3AE0" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
