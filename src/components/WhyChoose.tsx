import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Layers,
  Cpu,
  Briefcase,
  Code2,
  Palette,
  Scale,
  Zap,
  Headphones,
} from 'lucide-react';
import CorporateTechVisual from './tech-visuals/CorporateTechVisual';
import { easeOut } from '../lib/motion';
import { useSectionMotion, interactiveSoftProps } from '../hooks/useSectionMotion';

const features = [
  { icon: Layers, title: 'End-to-end delivery', text: 'Discovery through production under one accountable engineering team.' },
  { icon: Cpu, title: 'Engineering + product', text: 'Full stack builds, UX, and integrations without siloed vendors.' },
  { icon: Briefcase, title: 'Industry experience', text: 'Retail, healthcare, education, hospitality, and more.' },
  { icon: Code2, title: 'Custom development', text: 'ERP, CRM, portals, and dashboards built for your ops.' },
  { icon: Palette, title: 'Modern UI / UX', text: 'Interfaces that feel credible, clear, and conversion-ready.' },
  { icon: Scale, title: 'Scalable systems', text: 'Architectures that grow with traffic, data, and users.' },
  { icon: Zap, title: 'Fast delivery', text: 'Structured milestones and transparent communication.' },
  { icon: Headphones, title: 'Long-term support', text: 'Iteration, monitoring, and enhancements after go-live.' },
];

const WhyChoose: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <motion.section
      id="why-skizen"
      className="scroll-mt-header bg-white py-20 md:py-24 lg:py-28"
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
              Why choose SKIZEN
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zen-muted md:text-lg">
              A <strong className="font-semibold text-ski-black">software engineering company</strong> and{' '}
              <strong className="font-semibold text-ski-black">technology partner</strong> focused on working systems—not
              slide decks.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-[280px] justify-center sm:max-w-xs lg:max-w-none lg:justify-end">
            <CorporateTechVisual variant="whyChoose" compact className="max-w-[320px]" />
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, index) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.04, ease: easeOut }}
              {...interactiveSoftProps}
              className="cursor-default rounded-xl border border-zen-line bg-ski-gray/30 p-5 transition-colors duration-300 hover:border-ski-accent/20 hover:bg-white hover:shadow-card"
            >
              <f.icon className="mb-3 h-5 w-5 text-ski-accent" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-ski-black">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zen-muted">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChoose;
