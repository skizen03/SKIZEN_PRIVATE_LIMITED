import React, { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { useSectionMotion } from '../hooks/useSectionMotion';

type Category = 'marketing' | 'technology';

const marketing = [
  { title: 'Digital marketing', desc: 'Integrated campaigns across channels.', hot: false },
  { title: 'Social media management', desc: 'Editorial rhythm, reporting, and community care.', hot: false },
  { title: 'Brand presence', desc: 'Positioning, narratives, and visual consistency.', hot: true },
  { title: 'Instagram growth', desc: 'Content systems tuned for reach and conversion.', hot: false },
  { title: 'Content creation', desc: 'Copy, creative direction, and production coordination.', hot: false },
  { title: 'SEO', desc: 'Technical foundation and content that earns visibility.', hot: false },
  { title: 'Performance marketing', desc: 'Measurement-first acquisition and retention.', hot: true },
  { title: 'Paid advertising', desc: 'Search, social, and programmatic with clear ROAS goals.', hot: false },
  { title: 'Influencer marketing', desc: 'Vetted partnerships and disclosure-safe activations.', hot: false },
  { title: 'Video production', desc: 'Storyboards through delivery for web and social.', hot: false },
  { title: 'Lead generation', desc: 'Funnels, landing pages, and CRM-ready handoffs.', hot: true },
  { title: 'Brand strategy', desc: 'Research-backed roadmaps for portfolio and launch brands.', hot: false },
];

const technology = [
  { title: 'Website development', desc: 'Fast product and marketing sites with clean IA and performance budgets.', hot: false },
  { title: 'Full stack applications', desc: 'React, Node, APIs, and cloud-native deploys.', hot: true },
  { title: 'ERP systems', desc: 'Operations, finance hooks, and role-based workflows.', hot: true },
  { title: 'CRM systems', desc: 'Pipeline, tasks, and integrations your team adopts.', hot: false },
  { title: 'Inventory management', desc: 'Stock, transfers, and outlet-level visibility.', hot: false },
  { title: 'Hospital management', desc: 'Patient, billing, and admin on one backbone.', hot: false },
  { title: 'Student portals', desc: 'Admissions, academics, and communication.', hot: false },
  { title: 'Ordering systems', desc: 'B2B/B2C ordering with fulfillment hooks.', hot: false },
  { title: 'Admin dashboards', desc: 'Role-based control centers and reporting.', hot: false },
  { title: 'Analytics platforms', desc: 'Event models, dashboards, and exports.', hot: true },
  { title: 'Automation tools', desc: 'Workflows that reduce manual ops and errors.', hot: false },
  { title: 'UI / UX design', desc: 'Product-grade interfaces and design systems.', hot: false },
  { title: 'Custom software', desc: 'Bespoke modules when off-the-shelf is not enough.', hot: false },
];

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const SpotlightRow = ({ svc, index }: { svc: typeof marketing[0]; index: number }) => {
  const divRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.a
      href="#contact"
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      variants={rowVariants}
      className="group relative flex flex-col justify-between gap-4 overflow-hidden border-b border-[#E5E2DE] py-10 transition-colors duration-500 hover:border-ink sm:flex-row sm:items-center sm:gap-8 active:bg-black/5 sm:active:bg-transparent"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 hidden sm:block"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(232,101,10,0.04), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-10 w-full">
        <span className="font-mono text-sm tracking-wider text-muted/40 transition-all duration-500 group-hover:text-brand sm:mt-3 group-hover:-translate-y-1">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        
        <div className="flex-1">
          <h3 className="text-3xl font-light tracking-tighter text-ink transition-all duration-500 group-hover:text-brand group-hover:translate-x-3 sm:text-4xl lg:text-[2.75rem]">
            {svc.title}
            {svc.hot && (
              <span className="ml-4 inline-flex translate-y-[-8px] items-center rounded-full bg-orange-tint px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                Popular
              </span>
            )}
          </h3>
          <p className="mt-4 max-w-lg text-sm leading-[1.7] text-muted transition-all duration-500 group-hover:translate-x-3 group-hover:text-ink/80 sm:text-base">
            {svc.desc}
          </p>
        </div>
      </div>
      
      {/* Hover Reveal Arrow */}
      <div className="relative z-10 hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#E5E2DE] text-ink transition-all duration-500 group-hover:scale-110 group-hover:border-brand group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_0_20px_rgba(232,101,10,0.2)] sm:flex">
        <ArrowUpRight size={28} className="transition-transform duration-500 group-hover:rotate-45" />
      </div>
      
      {/* Mobile Arrow */}
      <div className="absolute right-0 top-10 text-brand sm:hidden">
        <ArrowUpRight size={24} />
      </div>
    </motion.a>
  );
};

const Services: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [tab, setTab] = useState<Category>('technology');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const list = tab === 'marketing' ? marketing : technology;

  return (
    <motion.section
      id="services"
      className="scroll-mt-header bg-off-white py-24 md:py-32"
      {...sectionProps}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8" ref={ref}>
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          
          {/* Left Column: Sticky Header */}
          <div className="lg:w-1/3 lg:shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easeOut }}
              className="sticky top-32 flex flex-col items-start"
            >
              <div className="group inline-flex items-center gap-2 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-brand transition-transform duration-300 group-hover:scale-150" />
                <span className="badge inline-flex">What we do</span>
              </div>
              <h2 className="text-display text-ink">
                Services built for
                <br />
                <span className="heading-serif gradient-text">builders &amp; operators</span>
              </h2>
              <p className="mt-6 text-base leading-[1.7] text-muted md:text-lg">
                Engineering-led delivery: custom software, integrations, and product UX first.
                When you need reach and acquisition, our growth practice plugs into the same team.
              </p>

              {/* Tab switcher */}
              <div
                className="mt-10 inline-flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:rounded-2xl sm:border sm:border-[#E5E2DE] sm:bg-surface sm:p-1.5"
                role="tablist"
                aria-label="Service category"
              >
                {(['technology', 'marketing'] as Category[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={tab === cat}
                    onClick={() => setTab(cat)}
                    className={`relative w-full rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-500 active:scale-[0.98] select-none sm:w-auto ${
                      tab === cat
                        ? 'bg-white text-ink shadow-card sm:shadow-sm'
                        : 'bg-transparent text-muted hover:text-ink sm:hover:bg-black/5'
                    }`}
                  >
                    {cat === 'technology' ? 'Technology' : 'Growth & digital'}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Spotlight List */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                variants={listVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="flex flex-col"
              >
                {/* Top border for the list */}
                <div className="h-px w-full bg-[#E5E2DE]" />
                
                {list.map((svc, index) => (
                  <SpotlightRow key={svc.title} svc={svc} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bottom CTA inline within the list flow */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 flex flex-col items-start gap-6 rounded-3xl border border-[#E5E2DE] bg-white p-8 shadow-sm sm:p-12 transition-colors duration-500 hover:border-brand/30"
            >
              <div>
                <p className="text-2xl font-light tracking-tight text-ink">Not sure where to start?</p>
                <p className="mt-3 text-base text-muted max-w-md leading-[1.7]">
                  Book a free 30-minute consultation. We'll map your requirements and propose a clear scope before any commitment.
                </p>
              </div>
              <a
                href="#contact"
                className="cta-pulse glow-button mt-2 inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-4 text-sm font-semibold text-white transition-all active:scale-95 select-none hover:-translate-y-1 shadow-[0_4px_20px_rgba(232,101,10,0.4)] sm:hover:shadow-[0_8px_32px_rgba(232,101,10,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2"
              >
                Book a free consultation <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>
          
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
