import React from 'react';
import { motion } from 'framer-motion';
import { useSectionMotion } from '../hooks/useSectionMotion';

/** Thin Swiss-style section separator */
const SectionDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { sectionProps } = useSectionMotion();

  return (
    <motion.div
      className={`relative flex items-center justify-center py-8 md:py-12 ${className}`}
      aria-hidden
      {...sectionProps}
    >
      <div className="h-px w-full max-w-lg bg-gradient-to-r from-transparent via-zen-line to-transparent" />
      <span className="absolute h-0.5 w-10 rounded-full bg-ski-accent/90" />
    </motion.div>
  );
};

export default SectionDivider;
