/** A medical cross with a small morning sun behind it — the brand mark in the nav, footer and upload screen. */
export function Logo({ size = 32, light = false }: { size?: number; light?: boolean }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <circle className="logo__sun" cx="29" cy="11" r="5" fill="var(--warm)" />
      <path d="M16 7h8v9h9v8h-9v9h-8v-9H7v-8h9z" fill={light ? '#ffffff' : 'var(--forest)'} />
      <path d="M20 12v16M12 20h16" stroke={light ? 'var(--accent-soft)' : 'var(--accent)'} strokeWidth="2.5" />
    </svg>
  );
}
