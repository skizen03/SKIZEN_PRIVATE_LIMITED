import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CorporateTechVisual from './tech-visuals/CorporateTechVisual';
import { easeOut } from '../lib/motion';
import { useSectionMotion, interactiveCardProps } from '../hooks/useSectionMotion';

const clients = [
  {
    code: 'CLT_001',
    name: 'Pista House',
    industry: 'Hospitality',
    description:
      'Advised on growth and marketing strategies to strengthen brand presence and reach across channels.',
  },
  {
      code: 'CLT_003',
    name: 'St Anns Hospital',
    industry: 'Healthcare',
    description:
      'Implemented an integrated patient record and hospital administration system to optimize healthcare delivery.',
  },
  {

    code: 'CLT_002',
    name: 'Kasam Pullaiah',
    industry: 'Retail',
    description:
      'Delivered performance marketing focused on measurable reach, traffic, and conversions for the retail brand.',
  },
  
  {
    code: 'CLT_004',
    name: 'St Anns Jr College',
    industry: 'Education',
    description:
      'Created a robust student information and academic management portal, simplifying administrative workflows.',
  },
  {
    code: 'CLT_005',
    name: 'Marluce Bakers',
    industry: 'Food & retail',
    description:
      'Advised on growth strategy and marketing so the brand could reach new customers and scale sustainably.',
  },
  
];

const Clients: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <motion.section
      id="clients"
      className="scroll-mt-header bg-ski-gray py-20 md:py-24 lg:py-28"
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
              Client partnerships
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zen-muted md:text-lg">
              Representative engagements across{' '}
              <a href="#portfolio" className="font-medium text-ski-accent underline-offset-4 hover:underline">
                software development
              </a>
              , custom software, and enterprise systems.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-[280px] justify-center sm:max-w-xs lg:max-w-none lg:justify-end">
            <CorporateTechVisual variant="clients" compact className="max-w-[320px]" />
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((c, index) => (
            <motion.article
              key={c.code}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.06, ease: easeOut }}
              {...interactiveCardProps}
              className="flex cursor-default flex-col rounded-xl border border-zen-line bg-white p-6 shadow-card transition-shadow duration-300 hover:border-ski-accent/20 hover:shadow-card-hover"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  
                  <h3 className="mt-1 text-lg font-semibold text-ski-black">{c.name}</h3>
                </div>
                
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ski-accent">
                {c.industry}
              </p>
              <p className="text-sm leading-relaxed text-zen-muted">{c.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Clients;
