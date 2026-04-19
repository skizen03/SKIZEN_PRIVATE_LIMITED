import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/faqs';
import { SITE_ORIGIN } from '../lib/site';
import { easeOut } from '../lib/motion';
import { useSectionMotion } from '../hooks/useSectionMotion';

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
      className="scroll-mt-header bg-surface py-24 md:py-28 lg:py-32"
      {...sectionProps}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-12 text-center"
        >
          <span className="badge mb-5 inline-flex">FAQ</span>
          <h2 className="text-display mx-auto max-w-2xl text-ink">
            Frequently asked{' '}
            <span className="heading-serif gradient-text">questions</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-muted">
            Quick answers about our{' '}
            <a href="#services" className="font-medium text-brand underline-offset-4 hover:underline">
              software development
            </a>{' '}
            capabilities and engagement model.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((item, index) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.045, ease: easeOut }}
            >
              <details className="group rounded-2xl border border-[#E5E2DE] bg-white shadow-card open:shadow-card-hover open:ring-1 open:ring-brand/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold text-ink md:text-base [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180 group-open:text-brand" />
                </summary>
                <div className="border-t border-[#E5E2DE] px-6 py-5 text-sm leading-[1.7] text-muted">
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
