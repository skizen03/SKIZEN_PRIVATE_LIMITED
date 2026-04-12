import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, Gem } from 'lucide-react';
import CountUp from './animations/CountUp';
import { SectionWordTitle } from './typography/WordMotion';
import CorporateTechVisual from './tech-visuals/CorporateTechVisual';
import { easeOut } from '../lib/motion';
import { useSectionMotion, interactiveSoftProps } from '../hooks/useSectionMotion';

const pillars = [
  {
    icon: Target,
    title: 'Mission',
    text: 'Deliver reliable software and integrations—clear scope, measurable impact, and systems your team can run for years.',
  },
  {
    icon: Eye,
    title: 'Vision',
    text: 'Be the engineering partner businesses trust for digital products, enterprise workflows, and automation across India and beyond.',
  },
  {
    icon: Gem,
    title: 'Values',
    text: 'Precision, transparency, and craftsmanship—from first API to hospital-grade uptime.',
  },
];

const About: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const stats = [
    { number: 10, suffix: '+', label: 'Active client relationships' },
    { number: 500, suffix: '+', label: 'Projects delivered' },
    { number: 98, suffix: '%', label: 'Delivery satisfaction' },
    { number: 24, suffix: '/7', label: 'Support mindset' },
  ];

  return (
    <motion.section
      id="about"
      className="scroll-mt-header bg-ski-gray py-20 md:py-24 lg:py-28"
      {...sectionProps}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start"
        >
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <SectionWordTitle
              className="text-3xl font-semibold tracking-tight text-ski-black md:text-4xl lg:text-5xl"
              text="A technology partner for serious operators"
            />
            <p className="mt-6 text-base leading-relaxed text-zen-muted md:text-lg">
              SKIZEN ships production-grade software: custom web applications,{' '}
              <strong className="font-semibold text-ski-black">ERP and CRM systems</strong>,{' '}
              <strong className="font-semibold text-ski-black">student portals</strong>,{' '}
              <strong className="font-semibold text-ski-black">hospital platforms</strong>, and automation. We stay
              accountable from architecture through launch—and help you scale distribution when the product is ready.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-[280px] justify-center sm:max-w-xs lg:max-w-none lg:justify-end">
            <CorporateTechVisual variant="about" compact className="max-w-[320px]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zen-line bg-white px-4 py-6 text-center shadow-sm"
            >
              <CountUp
                end={stat.number}
                suffix={stat.suffix}
                className="text-2xl font-semibold tabular-nums text-ski-black md:text-3xl"
                duration={1.8}
              />
              <p className="mt-2 text-xs font-medium leading-snug text-zen-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p, index) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + index * 0.08, ease: easeOut }}
              {...interactiveSoftProps}
              className="cursor-default rounded-xl border border-zen-line bg-white p-6 shadow-sm transition-shadow duration-300 hover:border-ski-accent/15 hover:shadow-card"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-zen-line bg-ski-gray/50">
                <p.icon className="h-5 w-5 text-ski-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-ski-black">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zen-muted">{p.text}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-14 flex flex-col items-center gap-2 border-t border-zen-line pt-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zen-muted">Our trajectory</p>
          <p className="max-w-2xl text-sm text-zen-muted">
            From single-product MVPs to multi-branch ERP and analytics programs—SKIZEN has grown engineering depth while
            keeping senior oversight on architecture, security, and delivery.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
