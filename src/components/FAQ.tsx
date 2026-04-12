import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/faqs';
import { SITE_ORIGIN } from '../lib/site';
import CorporateTechVisual from './tech-visuals/CorporateTechVisual';
import { easeOut } from '../lib/motion';
import { useSectionMotion, interactiveSoftProps } from '../hooks/useSectionMotion';

const FAQ: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const faqJsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
        url: `${SITE_ORIGIN}/#faq`,
      }),
    []
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
    <motion.section
      id="faq"
      className="scroll-mt-header bg-ski-gray py-20 md:py-24 lg:py-28"
      {...sectionProps}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mb-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start"
        >
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-ski-black md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-zen-muted">
              Quick answers about our{' '}
              <a href="#services" className="text-ski-accent underline-offset-4 hover:underline">
                software development company
              </a>{' '}
              capabilities and engagement model.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-[280px] justify-center sm:max-w-xs lg:max-w-none lg:justify-end">
            <CorporateTechVisual variant="faq" compact className="max-w-[320px]" />
          </div>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((item, index) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05, ease: easeOut }}
              {...interactiveSoftProps}
            >
              <details className="group rounded-xl border border-zen-line bg-white shadow-sm open:shadow-card open:ring-1 open:ring-ski-accent/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-ski-black md:text-base [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-zen-muted transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="border-t border-zen-line px-5 py-4 text-sm leading-relaxed text-zen-muted">
                  {item.a}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
    </>
  );
};

export default FAQ;
