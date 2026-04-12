import React, { useEffect, useMemo, useState } from 'react';
import type { LenisOptions } from 'lenis';
import { ReactLenis } from 'lenis/react';

/** Matches `.scroll-mt-header` (5.5rem) for fixed header clearance */
export const LENIS_ANCHOR_OFFSET = -88;

function buildLenisOptions(isCoarseTouch: boolean): LenisOptions {
  if (isCoarseTouch) {
    return {
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.38,
      syncTouch: true,
      syncTouchLerp: 0.13,
      touchInertiaExponent: 1.55,
      gestureOrientation: 'vertical',
    };
  }
  return {
    lerp: 0.075,
    smoothWheel: true,
    wheelMultiplier: 0.88,
    touchMultiplier: 1.12,
    syncTouch: true,
    syncTouchLerp: 0.075,
  };
}

type SmoothScrollRootProps = {
  children: React.ReactNode;
};

/**
 * Global Lenis smooth scrolling; skipped when the user prefers reduced motion.
 */
export function SmoothScrollRoot({ children }: SmoothScrollRootProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  /** Phones / tablets where touch is primary — stronger Lenis touch smoothing */
  const [coarseTouch, setCoarseTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px), (pointer: coarse)');
    const update = () => setCoarseTouch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const lenisOptions = useMemo(() => buildLenisOptions(coarseTouch), [coarseTouch]);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
