import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { easeOut } from '../lib/motion';
import { useSectionMotion } from '../hooks/useSectionMotion';

/** Single testimonial card */
function TestimonialCard({ t, className = '' }: { t: (typeof testimonials)[0]; className?: string }) {
  return (
    <div
      className={`group hover-lift shrink-0 w-80 rounded-2xl border border-[#E5E2DE] bg-white p-6 shadow-card transition-shadow duration-500 ${className}`}
    >
      {/* Stars */}
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-brand text-brand" />
        ))}
      </div>
      {/* Quote icon */}
      <Quote className="mb-3 h-5 w-5 text-brand/30" />
      {/* Body */}
      <p className="text-sm leading-[1.75] text-muted line-clamp-4">
        "{t.text}"
      </p>
      {/* Author */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[#FF8C42] text-[0.75rem] font-bold text-white shadow-sm">
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs font-semibold text-ink">{t.name}</p>
          {t.role && <p className="text-[0.65rem] text-muted">{t.role}</p>}
        </div>
      </div>
    </div>
  );
}

/** Infinite marquee row */
function MarqueeRow({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" aria-hidden />

      <div
        className="flex w-max"
        style={{
          animation: `marquee ${reverse ? '55s' : '45s'} linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      >
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} className="mx-3" />
        ))}
      </div>
    </div>
  );
}

const Testimonials: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  // Split testimonials into two rows
  const mid = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, mid);
  const row2 = testimonials.slice(mid);

  // If only one row worth, duplicate
  const row2Final = row2.length > 1 ? row2 : row1;

  return (
    <motion.section
      id="testimonials"
      className="scroll-mt-header relative overflow-hidden bg-surface py-28 md:py-32"
      {...sectionProps}
    >
      {/* Blob */}
      <div className="blob blob-2 pointer-events-none absolute left-0 top-0 opacity-20" aria-hidden />

      <div className="relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          className="mx-auto mb-16 max-w-7xl px-5 text-center sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <span className="badge mb-6 inline-flex">Client stories</span>
          <h2 className="text-display text-ink">
            Trusted by builders{' '}
            <span className="heading-serif gradient-text">across India</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-muted">
            Real feedback from real clients who've shipped real products with SKIZEN.
          </p>
        </motion.div>

        {/* Marquee rows */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
        >
          <MarqueeRow items={row1} />
          {row2Final.length > 0 && <MarqueeRow items={row2Final} reverse />}
        </motion.div>

        {/* Trust logos strip */}
        <motion.div
          className="mx-auto mt-14 max-w-7xl px-5 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
        >
          <p className="mb-5 text-center text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted/50">
            Businesses we've worked with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {['Kasam', 'St Anns Hospital', 'St Anns Jr College', 'Marluce Bakers', 'Pista House'].map((name) => (
              <span key={name} className="text-sm font-semibold text-muted/60">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
