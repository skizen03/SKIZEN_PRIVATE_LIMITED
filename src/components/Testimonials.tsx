import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';
import CorporateTechVisual from './tech-visuals/CorporateTechVisual';
import { easeOut } from '../lib/motion';
import { useSectionMotion, interactiveSoftProps } from '../hooks/useSectionMotion';

const testimonials = [
  {
    name: 'Priya Raman',
    role: 'Operations Director',
    company: 'Retail chain, Hyderabad',
    quote:
      'SKIZEN unified our inventory and sales data across branches. Delivery was disciplined, documentation clear, and the team understood retail constraints.',
    rating: 5,
  },
  {
    name: 'Dr. Arun Mehta',
    role: 'Administrator',
    company: 'Healthcare institution',
    quote:
      'The hospital website and patient-facing flows improved accessibility and reduced front-desk load. Professional communication throughout the project.',
    rating: 5,
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Founder',
    company: 'Growth-stage brand',
    quote:
      'They owned the product build end to end—clean engineering, thoughtful UX, and pragmatic trade-offs. When we needed go-to-market help, the same team understood the codebase.',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <motion.section
      id="testimonials"
      className="scroll-mt-header bg-zen-beige py-20 md:py-24 lg:py-28"
      {...sectionProps}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start"
        >
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-ski-black md:text-4xl lg:text-5xl">
              Client testimonials
            </h2>
            <p className="mt-4 text-base text-zen-muted md:text-lg">
              Trusted by teams shipping{' '}
              <a href="#services" className="font-medium text-ski-accent underline-offset-4 hover:underline">
                software and automation
              </a>{' '}
              in the real world—not just on pitch decks.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-[280px] justify-center sm:max-w-xs lg:max-w-none lg:justify-end">
            <CorporateTechVisual variant="testimonials" compact className="max-w-[320px]" />
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.08, ease: easeOut }}
              {...interactiveSoftProps}
              className="flex cursor-default flex-col rounded-xl border border-zen-line bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-ski-accent text-ski-accent" strokeWidth={0} />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-ski-black">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6 border-t border-zen-line pt-4">
                <cite className="not-italic">
                  <span className="block text-sm font-semibold text-ski-black">{t.name}</span>
                  <span className="text-xs text-zen-muted">
                    {t.role}, {t.company}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
