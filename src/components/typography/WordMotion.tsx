import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import { easeOut } from '../../lib/motion';

type SplitWordsProps = {
  /** Plain text; use `&` for ampersand (not HTML entities). */
  text: string;
  className?: string;
  /** Base delay before the first word (s). */
  delayStart?: number;
  /** Extra delay per word (s). */
  wordDelay?: number;
  /** Words from this index get accent hover styling (inclusive). */
  accentFromIndex?: number;
};

/**
 * Hero-style staggered word reveal with optional accent tail for hover interaction.
 */
export function SplitWords({
  text,
  className,
  delayStart = 0.06,
  wordDelay = 0.038,
  accentFromIndex,
}: SplitWordsProps) {
  const reduced = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => {
        const isAccent = accentFromIndex !== undefined && i >= accentFromIndex;
        return (
          <motion.span
            key={`${word}-${i}`}
            className={clsx(
              'inline-block align-baseline',
              i < words.length - 1 && 'mr-[0.22em]',
              isAccent &&
                'cursor-default text-ski-black transition-colors duration-300 hover:text-ski-accent'
            )}
            initial={{ opacity: 0, y: '0.32em', filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.52,
              delay: delayStart + i * wordDelay,
              ease: easeOut,
            }}
            whileHover={
              isAccent
                ? { y: -2, transition: { duration: 0.2, ease: easeOut } }
                : { y: -1, transition: { duration: 0.18, ease: easeOut } }
            }
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

type SectionWordTitleProps = {
  text: string;
  className?: string;
};

/**
 * Section H2: words stagger in once when the heading enters the viewport.
 */
export function SectionWordTitle({ text, className }: SectionWordTitleProps) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.35,
    rootMargin: '-8% 0px',
  });
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={clsx('inline-block', i < words.length - 1 && 'mr-[0.18em]')}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={reduced || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{
            duration: 0.48,
            delay: reduced ? 0 : i * 0.055,
            ease: easeOut,
          }}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}
