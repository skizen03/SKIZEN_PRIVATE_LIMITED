import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { useSectionMotion } from '../hooks/useSectionMotion';

const clients = [
  {
    name: 'Pista House',
    industry: 'Hospitality',
    description:
      'Growth and marketing strategy to strengthen brand presence and reach across channels.',
    tag: 'Strategy · Marketing',
    initial: 'PH',
    color: '#FF6B6B',
    colorBg: 'rgba(255,107,107,0.10)',
    year: '2023',
  },
  {
    name: 'St Anns Hospital',
    industry: 'Healthcare',
    description:
      'Integrated patient record and hospital administration system to optimise healthcare delivery.',
    tag: 'Custom Software · ERP',
    initial: 'SA',
    color: '#4ECDC4',
    colorBg: 'rgba(78,205,196,0.10)',
    year: '2023',
  },
  {
    name: 'Kasam Pullaiah',
    industry: 'Retail',
    description:
      'Performance marketing focused on measurable reach, traffic, and conversions for the retail brand.',
    tag: 'Marketing · Analytics',
    initial: 'KP',
    color: '#FFE66D',
    colorBg: 'rgba(255,230,109,0.12)',
    year: '2024',
  },
  {
    name: 'St Anns Jr College',
    industry: 'Education',
    description:
      'Robust student information and academic management portal, simplifying administrative workflows.',
    tag: 'Portal · Automation',
    initial: 'SJ',
    color: '#C3A6FF',
    colorBg: 'rgba(195,166,255,0.10)',
    year: '2024',
  },
  {
    name: 'Marluce Bakers',
    industry: 'Food & Retail',
    description:
      'Growth strategy and marketing so the brand could reach new customers and scale sustainably.',
    tag: 'Strategy · Growth',
    initial: 'MB',
    color: '#E8650A',
    colorBg: 'rgba(232,101,10,0.10)',
    year: '2024',
  },
];

const Clients: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.04 });
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      id="clients"
      className="scroll-mt-header relative overflow-hidden py-28 md:py-32 lg:py-36"
      style={{ background: '#F3F1EE' }}
      {...sectionProps}
    >
      {/* ── Background decorative elements ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Large editorial typographic watermark */}
        <div
          className="absolute -right-8 top-1/2 -translate-y-1/2 select-none text-[clamp(120px,18vw,280px)] font-black leading-none text-ink/[0.025] tracking-tighter"
          aria-hidden
        >
          CLIENTS
        </div>
        {/* Subtle organic blobs */}
        <div
          className="absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(232,101,10,0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(78,205,196,0.05) 0%, transparent 70%)' }}
        />
        {/* Hand-drawn style dots pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(rgba(15,15,14,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8" ref={ref}>
        {/* ── Header: editorial two-column layout ── */}
        <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            <span className="badge mb-5 inline-flex">Client partnerships</span>
            <h2 className="text-display text-ink">
              Brands that{' '}
              <br className="hidden sm:block" />
              <span className="gradient-text">trusted us</span>
            </h2>
          </motion.div>

          <motion.p
            className="max-w-xs text-sm leading-[1.75] text-muted sm:text-right"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: easeOut }}
          >
            Representative engagements across software development, custom systems,
            and enterprise solutions.
          </motion.p>
        </div>

        {/* ── Featured large card (first client) ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
          className="group mb-6 cursor-default overflow-hidden rounded-3xl border border-[#E5E2DE] bg-white transition-all duration-500 hover:border-brand/20 hover:shadow-[0_16px_64px_rgba(15,15,14,0.08)]"
        >
          <div className="grid lg:grid-cols-[1fr_auto]">
            {/* Left: content */}
            <div className="p-8 md:p-12">
              {/* Industry pill */}
              <span
                className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em]"
                style={{
                  background: clients[0].colorBg,
                  color: clients[0].color,
                }}
              >
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ background: clients[0].color }}
                />
                {clients[0].industry}
              </span>

              {/* Big name */}
              <h3 className="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-ink">
                {clients[0].name}
              </h3>
              <p className="max-w-lg text-base leading-[1.75] text-muted">
                {clients[0].description}
              </p>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {clients[0].tag.split(' · ').map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#E5E2DE] bg-surface px-3 py-1 text-[0.7rem] font-semibold text-ink"
                  >
                    {t}
                  </span>
                ))}
                <span className="ml-auto rounded-full border border-[#E5E2DE] bg-surface px-3 py-1 text-[0.7rem] font-semibold text-muted">
                  {clients[0].year}
                </span>
              </div>
            </div>

            {/* Right: large initial monogram */}
            <div
              className="hidden items-center justify-center px-16 lg:flex"
              style={{ background: clients[0].colorBg }}
            >
              <div
                className="flex h-32 w-32 items-center justify-center rounded-full text-4xl font-black tracking-tight transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${clients[0].color}22, ${clients[0].color}44)`,
                  color: clients[0].color,
                  boxShadow: `0 0 0 1px ${clients[0].color}30, 0 8px 32px ${clients[0].color}20`,
                }}
              >
                {clients[0].initial}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Remaining clients: compact horizontal cards ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clients.slice(1).map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: easeOut }}
              className="group relative cursor-default overflow-hidden rounded-2xl border border-[#E5E2DE] bg-white p-6 transition-all duration-500 hover:border-brand/20 hover:shadow-[0_8px_32px_rgba(15,15,14,0.07)]"
            >
              {/* Hover color wash */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: c.colorBg }}
                aria-hidden
              />

              <div className="relative z-10">
                {/* Monogram + year row */}
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black tracking-tight transition-transform duration-400 group-hover:scale-105"
                    style={{
                      background: c.colorBg,
                      color: c.color,
                      boxShadow: `0 0 0 1px ${c.color}25`,
                    }}
                  >
                    {c.initial}
                  </div>
                  <span className="text-[0.6rem] font-bold tracking-[0.15em] text-muted/40">
                    {c.year}
                  </span>
                </div>

                {/* Industry */}
                <p
                  className="mb-1.5 text-[0.6rem] font-bold uppercase tracking-[0.15em]"
                  style={{ color: c.color }}
                >
                  {c.industry}
                </p>

                {/* Name */}
                <h3 className="mb-2.5 text-sm font-bold text-ink leading-snug">
                  {c.name}
                </h3>

                {/* Description */}
                <p className="text-[0.78rem] leading-[1.65] text-muted line-clamp-3">
                  {c.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tag.split(' · ').map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#E5E2DE] bg-surface px-2.5 py-0.5 text-[0.6rem] font-semibold text-muted transition-colors duration-300 group-hover:border-current"
                      style={{ borderColor: 'inherit' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom strip: CTA + stat ── */}
        <motion.div
          className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#E5E2DE] bg-white px-8 py-7 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55, ease: easeOut }}
        >
          <div className="flex items-center gap-6">
            {/* Stacked avatars */}
            <div className="flex -space-x-2.5">
              {['PH', 'SA', 'KP', 'SJ', 'MB'].map((ini, i) => (
                <div
                  key={ini}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[0.65rem] font-bold"
                  style={{
                    background: clients[i % clients.length].colorBg,
                    color: clients[i % clients.length].color,
                    zIndex: 5 - i,
                  }}
                >
                  {ini}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">10+ businesses served</p>
              <p className="text-[0.75rem] text-muted">across Hyderabad and beyond</p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:shadow-glow"
          >
            Become a partner
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Clients;
