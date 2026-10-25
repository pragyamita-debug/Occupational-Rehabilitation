/** A brain drawn as two leaves of a sprig, with a small sun — the brand mark. */
export function Logo({ size = 40, light = false }: { size?: number; light?: boolean }) {
  const ink = light ? '#e2f3ee' : 'var(--forest)';
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <circle cx="20" cy="20" r="19" fill={light ? 'rgba(255,255,255,0.08)' : 'var(--mint)'} />
      <circle className="logo__sun" cx="31" cy="9" r="3.4" fill="var(--warm)" />
      <g fill="none" stroke={ink} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        <path d="M20 9c-3 0-5 2-5 4-3 0-5 2-5 5 0 2 1 3 2 4-1 1-1 2-1 3 0 3 2 5 5 5 1 2 2 3 4 3V9Z" />
        <path d="M20 9c3 0 5 2 5 4 3 0 5 2 5 5 0 2-1 3-2 4 1 1 1 2 1 3 0 3-2 5-5 5-1 2-2 3-4 3" />
        <path d="M20 16h-3m3 6h-4m4 6h-3m3-9h3m-3 6h4" stroke={light ? 'var(--accent-soft)' : 'var(--accent)'} />
      </g>
    </svg>
  );
}
