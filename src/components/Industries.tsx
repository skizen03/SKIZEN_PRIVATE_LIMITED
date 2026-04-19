import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Store,
  Shirt,
  HeartPulse,
  GraduationCap,
  Hotel,
  UtensilsCrossed,
  Rocket,
  Landmark,
  ShoppingBag,
} from 'lucide-react';
import { easeOut } from '../lib/motion';
import { useSectionMotion } from '../hooks/useSectionMotion';

const industries = [
  {
    icon: HeartPulse,
    title: 'Healthcare',
    tag: 'Hospital portals & patient management',
    color: '#FF6B6B',
    bg: 'rgba(255,107,107,0.08)',
    num: '01',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    tag: 'Student portals & college systems',
    color: '#4ECDC4',
    bg: 'rgba(78,205,196,0.08)',
    num: '02',
  },
  {
    icon: Store,
    title: 'Retail',
    tag: 'Inventory, POS & e-commerce',
    color: '#FFE66D',
    bg: 'rgba(255,230,109,0.08)',
    num: '03',
  },
  {
    icon: Rocket,
    title: 'Startups',
    tag: 'MVPs, SaaS & product engineering',
    color: '#E8650A',
    bg: 'rgba(232,101,10,0.10)',
    num: '04',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    tag: 'Ordering, billing & kitchen systems',
    color: '#A8E6CF',
    bg: 'rgba(168,230,207,0.08)',
    num: '05',
  },
  {
    icon: Hotel,
    title: 'Hospitality',
    tag: 'Booking, CRM & guest management',
    color: '#C3A6FF',
    bg: 'rgba(195,166,255,0.08)',
    num: '06',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce',
    tag: 'Custom storefronts & automation',
    color: '#FFB347',
    bg: 'rgba(255,179,71,0.08)',
    num: '07',
  },
  {
    icon: Shirt,
    title: 'Textiles',
    tag: 'ERP, inventory & supply chain',
    color: '#87CEEB',
    bg: 'rgba(135,206,235,0.08)',
    num: '08',
  },
  {
    icon: Landmark,
    title: 'Institutions',
    tag: 'Admin portals & compliance tools',
    color: '#DDA0DD',
    bg: 'rgba(221,160,221,0.08)',
    num: '09',
  },
];

/** Card that glows on hover using CSS custom property for cursor position */
function IndustryCard({
  item,
  index,
  inView,
}: {
  item: (typeof industries)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.055, ease: easeOut }}
    >
      <div
        ref={cardRef}
        className="industry-card group relative overflow-hidden rounded-2xl border border-white/8 p-6 transition-all duration-500"
        style={
          {
            background: 'rgba(255,255,255,0.04)',
            '--glow-color': item.color,
          } as React.CSSProperties
        }
      >
        {/* Cursor-follow glow */}
        <div
          className="industry-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), ${item.bg.replace('0.08', '0.18')}, transparent 70%)`,
          }}
          aria-hidden
        />

        {/* Animated border on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${item.color}30`,
          }}
          aria-hidden
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Number + icon row */}
          <div className="mb-5 flex items-start justify-between">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110"
              style={{
                background: item.bg,
                boxShadow: `0 0 0 1px ${item.color}20`,
              }}
            >
              <item.icon
                className="h-5 w-5 transition-all duration-300"
                style={{ color: item.color }}
                strokeWidth={1.75}
              />
            </div>
            <span
              className="text-[0.6rem] font-bold tracking-[0.2em] opacity-20 transition-opacity duration-300 group-hover:opacity-60"
              style={{ color: item.color }}
            >
              {item.num}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-base font-semibold text-white transition-colors duration-300 group-hover:text-white">
            {item.title}
          </h3>

          {/* Tagline — slides up on hover */}
          <p className="text-[0.78rem] leading-[1.6] text-white/30 transition-all duration-400 group-hover:text-white/60">
            {item.tag}
          </p>

          {/* Bottom accent line */}
          <div
            className="mt-5 h-px w-0 rounded-full transition-all duration-500 group-hover:w-full"
            style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
            aria-hidden
          />
        </div>
      </div>
    </motion.div>
  );
}

const Industries: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <motion.section
      id="industries"
      className="scroll-mt-header relative overflow-hidden bg-ink py-28 md:py-32 lg:py-36"
      {...sectionProps}
    >
      {/* ── Background: animated mesh + grid ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Subtle dot-grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Gradient blobs */}
        <div
          className="blob blob-1 absolute -top-20 left-1/4 opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(232,101,10,0.4) 0%, transparent 70%)' }}
        />
        <div
          className="blob blob-2 absolute bottom-0 right-0 opacity-8"
          style={{ background: 'radial-gradient(circle, rgba(195,166,255,0.3) 0%, transparent 70%)' }}
        />
        {/* Decorative rings */}
        <div className="animate-spin-slow absolute left-[8%] top-[20%] h-40 w-40 rounded-full border border-dashed border-white/5" />
        <div className="animate-spin-reverse absolute bottom-[15%] right-[6%] h-28 w-28 rounded-full border border-white/5" />
        {/* Diagonal accent lines */}
        <svg className="absolute inset-0 h-full w-full opacity-5" aria-hidden>
          <line x1="0" y1="100%" x2="100%" y2="0%" stroke="white" strokeWidth="1" strokeDasharray="6 18" />
          <line x1="0" y1="80%" x2="80%" y2="0%" stroke="white" strokeWidth="1" strokeDasharray="4 24" />
        </svg>
      </div>

      {/* ── Wave top ── */}
      <div className="pointer-events-none absolute top-0 left-0 w-full" aria-hidden>
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none" style={{ display: 'block', height: 60 }}>
          <path d="M0,40 C480,0 960,60 1440,20 L1440,0 L0,0 Z" fill="#FAFAF8" />
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Industries
          </span>
          <h2 className="text-display text-white">
            Built for{' '}
            <span className="gradient-text">every sector</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-[1.7] text-white/40">
            From retail and textiles to healthcare and education — SKIZEN builds software
            tailored to sector-specific workflows across Hyderabad and beyond.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {industries.map((item, index) => (
            <IndustryCard key={item.title} item={item} index={index} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55, ease: easeOut }}
        >
          <p className="text-sm text-white/30">
            Don't see your industry?{' '}
            <a
              href="#contact"
              className="font-semibold text-brand underline-offset-4 transition-colors hover:text-brand/80 hover:underline"
            >
              Let's talk anyway →
            </a>
          </p>
        </motion.div>
      </div>

      {/* ── Wave bottom ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full" aria-hidden>
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none" style={{ display: 'block', height: 60 }}>
          <path d="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" fill="#FAFAF8" />
        </svg>
      </div>
    </motion.section>
  );
};

export default Industries;
