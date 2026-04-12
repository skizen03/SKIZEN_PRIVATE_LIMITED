import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import CountUp from './animations/CountUp';
import CorporateTechVisual from './tech-visuals/CorporateTechVisual';
import { SplitWords } from './typography/WordMotion';
import { easeOut } from '../lib/motion';
import { useSectionMotion } from '../hooks/useSectionMotion';

const Hero: React.FC = () => {
  const { sectionProps } = useSectionMotion();

  return (
    <motion.section
      id="home"
      className="scroll-mt-header relative min-h-screen overflow-hidden bg-white pt-24 md:pt-28 md:min-h-[min(100dvh,900px)]"
      aria-labelledby="hero-heading"
      {...sectionProps}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-ski-accent/[0.06] blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[380px] w-[380px] rounded-full bg-ski-black/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 sm:pb-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-28">
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zen-muted"
          >
            Enterprise software · Hyderabad, India
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.02, ease: easeOut }}
            className="mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-ski-black sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            <SplitWords
              text="We engineer digital products, platforms & business systems"
              accentFromIndex={2}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: easeOut }}
            className="mt-6 max-w-xl text-base leading-relaxed text-zen-muted md:text-lg"
          >
            SKIZEN is a technology company: we design and ship web applications, ERP and CRM systems, portals, and
            automation—with senior engineers on every build. Add{' '}
            <a href="#services" className="font-medium text-ski-accent underline-offset-4 hover:underline">
              growth and acquisition
            </a>{' '}
            support when your roadmap needs it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: easeOut }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ski-black px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-ski-accent sm:w-auto"
            >
              Book a free consultation
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </motion.a>
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: easeOut }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zen-line bg-white px-6 py-3.5 text-sm font-semibold text-ski-black transition-colors duration-300 hover:border-ski-black sm:w-auto"
            >
              View our work
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: easeOut }}
            className="mt-12 grid grid-cols-2 gap-4 border-t border-zen-line pt-10 sm:grid-cols-4"
          >
            <div className="text-left">
              <CountUp
                end={10}
                suffix="+"
                className="text-2xl font-semibold tabular-nums text-ski-black md:text-3xl"
                duration={1.6}
              />
              <p className="mt-1 text-xs font-medium text-zen-muted">Clients</p>
            </div>
            <div className="text-left">
              <CountUp
                end={15}
                suffix="+"
                className="text-2xl font-semibold tabular-nums text-ski-black md:text-3xl"
                duration={1.6}
              />
              <p className="mt-1 text-xs font-medium text-zen-muted">Projects delivered</p>
            </div>
            <div className="text-left">
              <p className="text-2xl font-semibold tabular-nums text-ski-black md:text-3xl">9+</p>
              <p className="mt-1 text-xs font-medium text-zen-muted">Industries served</p>
            </div>
            <div className="text-left">
              <p className="text-2xl font-semibold tabular-nums text-ski-black md:text-3xl">360°</p>
              <p className="mt-1 text-xs font-medium text-zen-muted">Build &amp; sustain</p>
            </div>
          </motion.div>
        </div>

        <div className="relative min-w-0 lg:pl-4">
          <CorporateTechVisual variant="hero" />
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
