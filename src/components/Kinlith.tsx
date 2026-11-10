import { asset } from '../asset';

type EndorsementVariant = 'splash' | 'pill' | 'micro';

const SRC: Record<EndorsementVariant, string> = {
  splash: 'brand/kinlith/splash-signoff-paper.svg',
  pill: 'brand/kinlith/endorsement-pill-on-oat.svg',
  micro: 'brand/kinlith/micro-endorsement-ink3.svg',
};

/** Tavol.io–led “Powered by Kinlith” endorsement. */
export function PoweredByKinlith({
  variant = 'pill',
  className = '',
}: {
  variant?: EndorsementVariant;
  className?: string;
}) {
  const dims =
    variant === 'splash'
      ? { width: 120, height: 46 }
      : variant === 'micro'
        ? { width: 141, height: 22 }
        : { width: 168, height: 45 };

  return (
    <img
      className={`kinlith-endorse ${variant} ${className}`.trim()}
      src={asset(SRC[variant])}
      alt="Powered by Kinlith"
      width={dims.width}
      height={dims.height}
      decoding="async"
    />
  );
}

/** Compact chip for Sous / AI surfaces. */
export function SousTechChip({ className = '' }: { className?: string }) {
  return (
    <img
      className={`kinlith-chip ${className}`.trim()}
      src={asset('brand/kinlith/sous-tech-chip.svg')}
      alt="Sous technology by Kinlith"
      width={120}
      height={28}
      decoding="async"
    />
  );
}
