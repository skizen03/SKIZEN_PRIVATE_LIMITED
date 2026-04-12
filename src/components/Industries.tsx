import React from 'react';
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
import { useSectionMotion, interactiveSoftProps } from '../hooks/useSectionMotion';

const industries = [
  { icon: Store, title: 'Retail' },
  { icon: Shirt, title: 'Textiles' },
  { icon: HeartPulse, title: 'Healthcare' },
  { icon: GraduationCap, title: 'Education' },
  { icon: Hotel, title: 'Hospitality' },
  { icon: UtensilsCrossed, title: 'Restaurants' },
  { icon: Rocket, title: 'Startups' },
  { icon: Landmark, title: 'Institutions' },
  { icon: ShoppingBag, title: 'E-commerce' },
];

const Industries: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <motion.section
      id="industries"
      className="scroll-mt-header bg-white py-20 md:py-24 lg:py-28"
      {...sectionProps}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mb-14 mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-ski-black md:text-4xl lg:text-5xl">
            Industries we serve
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zen-muted md:text-lg">
            From retail and textiles to healthcare and education—SKIZEN builds software and integrations tailored to
            sector-specific workflows across Hyderabad and beyond.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.05, ease: easeOut }}
              {...interactiveSoftProps}
              className="group flex cursor-default items-center gap-4 rounded-xl border border-zen-line bg-ski-gray/40 p-5 shadow-sm transition-shadow duration-300 hover:border-ski-accent/25 hover:shadow-card-hover"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zen-line bg-white transition-colors duration-300 group-hover:border-ski-accent/30">
                <item.icon className="h-5 w-5 text-ski-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold text-ski-black">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Industries;
