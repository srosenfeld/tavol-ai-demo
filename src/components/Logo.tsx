import { asset } from '../asset';

/** Brand Refresh 2.0 mark — host (Saffron) center, guests left/right with overlap */
const MARK_PATHS = (
  <>
    <path
      id="guest-center"
      fill="#F0B033"
      d="M39 21A9 9 0 1 0 57 21A9 9 0 1 0 39 21ZM35 56V46.0A13.0 13.0 0 0 1 61 46.0V56Z"
    />
    <path
      id="guest-left"
      fill="#D24A22"
      fillOpacity="0.92"
      d="M19 25A8 8 0 1 0 35 25A8 8 0 1 0 19 25ZM15 56V48.0A12.0 12.0 0 0 1 39 48.0V56Z"
    />
    <path
      id="guest-right"
      fill="#9A3A62"
      fillOpacity="0.92"
      d="M61 25A8 8 0 1 0 77 25A8 8 0 1 0 61 25ZM57 56V48.0A12.0 12.0 0 0 1 81 48.0V56Z"
    />
    <path
      id="table"
      fill="#2F5E3D"
      d="M12.0 52H84.0A6.0 6.0 0 0 1 84.0 64H12.0A6.0 6.0 0 0 1 12.0 52ZM40 62H56V76H40ZM33.0 74H63.0A5.0 5.0 0 0 1 63.0 84H33.0A5.0 5.0 0 0 1 33.0 74Z"
    />
  </>
);

export function Mark({ className = 'mark-hero', title }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="6 12 84 72" role={title ? 'img' : 'presentation'} aria-hidden={title ? undefined : true} aria-label={title}>
      {title ? <title>{title}</title> : null}
      {MARK_PATHS}
    </svg>
  );
}

export function Lockup({
  className = 'lockup-sm',
  variant = 'fullcolor',
}: {
  className?: string;
  variant?: 'fullcolor' | 'ink';
}) {
  const src = variant === 'ink' ? asset('brand/lockup-ink.svg') : asset('brand/lockup-fullcolor.svg');
  return (
    <img
      className={className}
      src={src}
      alt="Tavol.ai"
      width={180}
      height={46}
      decoding="async"
    />
  );
}

export function MarkSm({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="6 6 84 84" aria-hidden="true" width="20" height="20">
      {MARK_PATHS}
    </svg>
  );
}

export function AppIcon({ className = 'app-icon-img' }: { className?: string }) {
  return (
    <img
      className={className}
      src={asset('brand/icon-default.svg')}
      alt=""
      width={64}
      height={64}
      decoding="async"
      aria-hidden="true"
    />
  );
}
