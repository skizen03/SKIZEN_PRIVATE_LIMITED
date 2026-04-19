import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, Clock, Headphones, Rocket, Trophy, Users } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { useSectionMotion } from '../hooks/useSectionMotion';

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Senior-only engineers',
    body: 'Every project is handled by senior engineers with 5–12 years of experience. No junior hand-offs.',
  },
  {
    icon: Clock,
    title: 'On-time delivery',
    body: 'We structure every project with clear milestones and deliver on schedule — every time.',
  },
  {
    icon: Headphones,
    title: 'Post-launch support',
    body: '6 months of dedicated support after launch, included. We don\'t disappear after delivery.',
  },
  {
    icon: Rocket,
    title: 'Built to scale',
    body: 'Our architecture decisions are made for growth. Start lean, scale to enterprise without rewrites.',
  },
  {
    icon: Trophy,
    title: 'Quality-first culture',
    body: 'Rigorous code reviews, automated testing, and design QA are baked into every sprint.',
  },
  {
    icon: Users,
    title: 'True partnership',
    body: 'We work as your extended team — transparent, communicative, and invested in your outcomes.',
  },
];

const WhyChoose: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <motion.section
      id="why"
      className="scroll-mt-header relative overflow-hidden bg-ink grain py-28 md:py-32 lg:py-36"
      {...sectionProps}
    >
      {/* ── Dark blobs ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="blob blob-1 absolute -right-20 top-0 opacity-15" style={{ background: 'radial-gradient(circle, rgba(232,101,10,0.25) 0%, transparent 70%)' }} />
        <div className="blob blob-2 absolute -left-20 bottom-10 opacity-10" style={{ background: 'radial-gradient(circle, rgba(232,101,10,0.18) 0%, transparent 70%)' }} />
        {/* Decorative ring */}
        <div className="animate-spin-slow absolute right-[10%] top-[20%] h-48 w-48 rounded-full border border-dashed border-white/5" />
        <div className="animate-spin-reverse absolute left-[5%] bottom-[15%] h-32 w-32 rounded-full border border-white/5" />
      </div>

      {/* ── BG Grid (dark) ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Why SKIZEN
          </span>
          <h2 className="text-display text-white">
            The SKIZEN{' '}
            <span className="heading-serif gradient-text">difference</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-[1.7] text-white/45">
            We're not an agency that disappears after launch. We're engineers who
            care about the long-term success of what we build.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: easeOut }}
              className="group animated-border rounded-2xl border border-white/8 bg-white/5 p-7 backdrop-blur-sm transition-all duration-500 hover:border-brand/30 hover:bg-white/8"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/8 transition-colors duration-300 group-hover:border-brand/30 group-hover:bg-brand/10">
                <r.icon className="h-5 w-5 text-white/60 transition-colors duration-300 group-hover:text-brand" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2.5 text-base font-semibold text-white">{r.title}</h3>
              <p className="text-sm leading-[1.7] text-white/45">{r.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom promise strip */}
        <motion.div
          className="mt-16 rounded-3xl border border-white/8 bg-white/5 p-10 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
        >
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30">Our promise</p>
          <p className="mx-auto mt-4 max-w-2xl text-xl font-semibold leading-[1.5] text-white">
            "If we can't build it right, we'll tell you before we start — not after we've
            taken your money."
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#contact"
              className="cta-pulse glow-button inline-flex items-center gap-2 rounded-2xl border border-white/20 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(232,101,10,0)] transition-all duration-300 hover:border-brand hover:bg-brand hover:shadow-glow"
            >
              Start a project →
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Wave Divider ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full" aria-hidden>
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none" style={{ display: 'block', height: 60 }}>
          <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#FAFAF8" />
        </svg>
      </div>
    </motion.section>
  );
};

export default WhyChoose;
