import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { easeOut } from '../lib/motion';
import type { MotionProps } from 'framer-motion';

type SectionMotion = Pick<MotionProps, 'initial' | 'whileInView' | 'viewport' | 'transition'>;

/**
 * Scroll-driven section animations (re-animates when leaving and re-entering viewport).
 * Smaller motion on mobile; disabled when user prefers reduced motion.
 */
export function useSectionMotion(): { sectionProps: SectionMotion | Record<string, never> } {
  const prefersReduced = useReducedMotion();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (prefersReduced) {
    return { sectionProps: {} };
  }

  return {
    sectionProps: {
      initial: { opacity: 0, y: compact ? 18 : 32 },
      whileInView: { opacity: 1, y: 0 },
      viewport: {
        once: false,
        amount: compact ? 0.07 : 0.12,
        margin: compact ? '-32px 0px -18% 0px' : '-64px 0px -8% 0px',
      },
      transition: { duration: compact ? 0.42 : 0.55, ease: easeOut },
    },
  };
}

/** Subtle lift + tap for cards and clickable tiles */
export const interactiveCardProps = {
  whileHover: { y: -4, transition: { duration: 0.22, ease: easeOut } },
  whileTap: { scale: 0.992, transition: { duration: 0.15 } },
};

export const interactiveSoftProps = {
  whileHover: { y: -2, transition: { duration: 0.2, ease: easeOut } },
  whileTap: { scale: 0.996, transition: { duration: 0.12 } },
};
