import type { ReactNode, ButtonHTMLAttributes } from 'react';
import {
  BatteryFull,
  ChevronLeft,
  Share,
  Signal,
  Smartphone,
  Sparkles,
  Wifi,
  X,
} from 'lucide-react';

export function StatusBar({ light }: { light?: boolean }) {
  return (
    <div className={`status-bar${light ? ' light' : ''}`}>
      <span>9:41</span>
      <span className="ic">
        <Signal aria-hidden="true" />
        <Wifi aria-hidden="true" />
        <BatteryFull aria-hidden="true" />
      </span>
    </div>
  );
}

export function AppBar({
  title = '',
  onBack,
  onClose,
  right,
  clear,
}: {
  title?: string;
  onBack?: () => void;
  onClose?: () => void;
  right?: ReactNode;
  clear?: boolean;
}) {
  const btnClass = clear ? 'icon-btn clear' : 'icon-btn';
  return (
    <div className={`app-bar${clear ? ' over-photo' : ''}`}>
      {onBack || onClose ? (
        <button className={btnClass} type="button" aria-label={onClose ? 'Close' : 'Back'} onClick={onClose || onBack}>
          {onClose ? <X aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}
        </button>
      ) : (
        <span />
      )}
      <span className="ttl">{title}</span>
      {right ??
        (clear ? (
          <button className={btnClass} type="button" aria-label="Share">
            <Share aria-hidden="true" />
          </button>
        ) : (
          <span />
        ))}
    </div>
  );
}

export function HigNote({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <p className="hignote">
      <Smartphone aria-hidden="true" />
      <span>
        <b>iOS: {title}.</b> {children}
      </span>
    </p>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="prog" aria-hidden="true">
      <i style={{ width: `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%` }} />
    </div>
  );
}

export function SousBubble({ children }: { children: ReactNode }) {
  return (
    <div className="sous">
      <span className="dot">
        <Sparkles />
      </span>
      <div>{children}</div>
    </div>
  );
}

export function Btn({
  children,
  variant = 'primary',
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'sec' | 'soft' | 'gather' | 'money' | 'apple' | 'google';
}) {
  const v = variant === 'primary' ? '' : variant;
  return (
    <button type="button" className={`btn ${v} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}

export function Chip({
  children,
  on,
  strict,
  ai,
  beet,
  dash,
  sm,
  onClick,
}: {
  children: ReactNode;
  on?: boolean;
  strict?: boolean;
  ai?: boolean;
  beet?: boolean;
  dash?: boolean;
  sm?: boolean;
  onClick?: () => void;
}) {
  const cls = [
    'chip',
    on && 'on',
    strict && 'strict',
    ai && 'ai',
    beet && 'beet',
    dash && 'dash',
    sm && 'sm',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={cls} onClick={onClick} aria-pressed={on}>
      {children}
    </button>
  );
}

export function Check({ on, onClick }: { on?: boolean; onClick?: () => void }) {
  return (
    <button type="button" className={`check ${on ? 'on' : ''}`} onClick={onClick} aria-pressed={!!on}>
      {on ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 12l5 5L20 7" />
        </svg>
      ) : null}
    </button>
  );
}

export function Toggle({ on, onClick }: { on?: boolean; onClick?: () => void }) {
  return <button type="button" className={`tog ${on ? 'on' : ''}`} onClick={onClick} aria-pressed={!!on} />;
}

export function Screen({
  children,
  footer,
  className = '',
}: {
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className={`scr-body ${className}`}>{children}</div>
      {footer ? <div className="scr-foot">{footer}</div> : null}
    </>
  );
}

export function FoodThumb({
  tone,
  src,
  alt = '',
  className = 'food-thumb',
}: {
  tone: string;
  src?: string;
  alt?: string;
  className?: string;
}) {
  if (src) {
    return (
      <img
        className={className}
        src={src}
        alt={alt}
        style={{ ['--tone' as string]: tone, objectFit: 'cover' }}
        width={44}
        height={44}
        decoding="async"
      />
    );
  }
  return <div className={className} style={{ ['--tone' as string]: tone }} role="img" aria-label={alt || undefined} />;
}
