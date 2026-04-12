import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CorporateTechVisual from './tech-visuals/CorporateTechVisual';
import { easeOut } from '../lib/motion';
import { useSectionMotion, interactiveSoftProps } from '../hooks/useSectionMotion';

const steps = [
  'Discovery',
  'Strategy',
  'Design',
  'Development',
  'Testing',
  'Launch',
  'Support & growth',
];

const Process: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <motion.section
      id="process"
      className="scroll-mt-header bg-white py-20 md:py-24 lg:py-28"
      {...sectionProps}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mb-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start"
        >
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-ski-black md:text-4xl lg:text-5xl">
              How we work
            </h2>
            <p className="mt-4 text-base text-zen-muted md:text-lg">
              A transparent process from discovery to post-launch hardening—ideal for{' '}
              <strong className="font-semibold text-ski-black">product engineering</strong> and long-running platform
              work.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-[280px] justify-center sm:max-w-xs lg:max-w-none lg:justify-end">
            <CorporateTechVisual variant="process" compact className="max-w-[320px]" />
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-zen-line md:left-1/2 md:block md:-translate-x-1/2" aria-hidden />
          <ol className="space-y-6 md:grid md:grid-cols-7 md:gap-4 md:space-y-0">
            {steps.map((label, index) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.06, ease: easeOut }}
                {...interactiveSoftProps}
                className="relative flex cursor-default gap-4 md:flex-col md:items-center md:text-center"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zen-line bg-white text-xs font-semibold text-ski-accent md:mx-auto">
                  {index + 1}
                </span>
                <span className="pt-0.5 text-sm font-medium text-ski-black md:pt-2">{label}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </motion.section>
  );
};

export default Process;
