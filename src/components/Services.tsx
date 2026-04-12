import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Megaphone,
  Share2,
  Sparkles,
  Instagram,
  PenLine,
  Search,
  Gauge,
  MousePointerClick,
  Users,
  Video,
  UserPlus,
  Compass,
  Globe,
  Layers,
  Boxes,
  Stethoscope,
  GraduationCap,
  Package,
  LayoutDashboard,
  LineChart,
  Workflow,
  Palette,
  Code2,
  ChevronRight,
  ShoppingCart,
} from 'lucide-react';
import { SectionWordTitle } from './typography/WordMotion';
import CorporateTechVisual from './tech-visuals/CorporateTechVisual';
import { easeOut } from '../lib/motion';
import { useSectionMotion, interactiveCardProps } from '../hooks/useSectionMotion';

type Category = 'marketing' | 'technology';

const marketing = [
  { icon: Megaphone, title: 'Digital marketing', desc: 'Integrated campaigns across channels.' },
  { icon: Share2, title: 'Social media management', desc: 'Editorial rhythm, reporting, and community care.' },
  { icon: Sparkles, title: 'Brand presence', desc: 'Positioning, narratives, and visual consistency.' },
  { icon: Instagram, title: 'Instagram growth', desc: 'Content systems tuned for reach and conversion.' },
  { icon: PenLine, title: 'Content creation', desc: 'Copy, creative direction, and production coordination.' },
  { icon: Search, title: 'SEO', desc: 'Technical foundation and content that earns visibility.' },
  { icon: Gauge, title: 'Performance marketing', desc: 'Measurement-first acquisition and retention.' },
  { icon: MousePointerClick, title: 'Paid advertising', desc: 'Search, social, and programmatic with clear ROAS goals.' },
  { icon: Users, title: 'Influencer marketing', desc: 'Vetted partnerships and disclosure-safe activations.' },
  { icon: Video, title: 'Video production', desc: 'Storyboards through delivery for web and social.' },
  { icon: UserPlus, title: 'Lead generation', desc: 'Funnels, landing pages, and CRM-ready handoffs.' },
  { icon: Compass, title: 'Brand strategy', desc: 'Research-backed roadmaps for portfolio and launch brands.' },
];

const technology = [
  { icon: Globe, title: 'Website development', desc: 'Fast product and marketing sites with clean IA and performance budgets.' },
  { icon: Layers, title: 'Full stack web applications', desc: 'React, Node, APIs, and cloud-native deploys.' },
  { icon: Boxes, title: 'ERP systems', desc: 'Operations, finance hooks, and role-based workflows.' },
  { icon: LayoutDashboard, title: 'CRM systems', desc: 'Pipeline, tasks, and integrations your team adopts.' },
  { icon: Package, title: 'Inventory management', desc: 'Stock, transfers, and outlet-level visibility.' },
  { icon: Stethoscope, title: 'Hospital management systems', desc: 'Patient, billing, and admin on one backbone.' },
  { icon: GraduationCap, title: 'Student management portals', desc: 'Admissions, academics, and communication.' },
  { icon: ShoppingCart, title: 'Ordering systems', desc: 'B2B/B2C ordering with fulfillment hooks.' },
  { icon: LayoutDashboard, title: 'Admin dashboards', desc: 'Role-based control centers and reporting.' },
  { icon: LineChart, title: 'Analytics platforms', desc: 'Event models, dashboards, and exports.' },
  { icon: Workflow, title: 'Automation tools', desc: 'Workflows that reduce manual ops and errors.' },
  { icon: Palette, title: 'UI / UX design', desc: 'Product-grade interfaces and design systems.' },
  { icon: Code2, title: 'Custom software development', desc: 'Bespoke modules when off-the-shelf is not enough.' },
];

const Services: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [tab, setTab] = useState<Category>('technology');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  const list = tab === 'marketing' ? marketing : technology;

  return (
    <motion.section
      id="services"
      className="scroll-mt-header bg-white py-20 md:py-24 lg:py-28"
      {...sectionProps}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mb-12 space-y-10"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
              <SectionWordTitle
                className="text-3xl font-semibold tracking-tight text-ski-black md:text-4xl lg:text-5xl"
                text="Services"
              />
              <p className="mt-4 text-base leading-relaxed text-zen-muted md:text-lg">
                Engineering-led delivery: <strong className="font-semibold text-ski-black">custom software</strong>,{' '}
                <strong className="font-semibold text-ski-black">integrations</strong>, and product UX first. When you
                need reach and acquisition, our{' '}
                <strong className="font-semibold text-ski-black">growth &amp; digital</strong> practice plugs into the
                same team.
              </p>
            </div>
            <div className="mx-auto flex w-full max-w-[280px] justify-center sm:max-w-xs lg:max-w-none lg:justify-end">
              <CorporateTechVisual variant="services" compact className="max-w-[320px]" />
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="inline-flex rounded-lg border border-zen-line bg-ski-gray/40 p-1"
              role="tablist"
              aria-label="Service category"
            >
            <motion.button
              type="button"
              role="tab"
              aria-selected={tab === 'technology'}
              onClick={() => setTab('technology')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                tab === 'technology' ? 'bg-white text-ski-black shadow-sm' : 'text-zen-muted hover:text-ski-black'
              }`}
            >
              Technology
            </motion.button>
            <motion.button
              type="button"
              role="tab"
              aria-selected={tab === 'marketing'}
              onClick={() => setTab('marketing')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                tab === 'marketing' ? 'bg-white text-ski-black shadow-sm' : 'text-zen-muted hover:text-ski-black'
              }`}
            >
              Growth &amp; digital
            </motion.button>
          </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.02, ease: easeOut }}
                {...interactiveCardProps}
                className="group flex cursor-default flex-col rounded-xl border border-zen-line bg-white p-5 shadow-sm transition-shadow duration-300 hover:border-ski-accent/20 hover:shadow-card-hover"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zen-line bg-ski-gray/40 transition-colors duration-300 group-hover:border-ski-accent/25">
                    <item.icon className="h-5 w-5 text-ski-accent" strokeWidth={1.5} />
                  </div>
                  <ChevronRight className="h-4 w-4 text-zen-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ski-accent group-hover:opacity-100" />
                </div>
                <h3 className="text-sm font-semibold text-ski-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zen-muted">{item.desc}</p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ski-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  Learn more
                  <ChevronRight className="h-3 w-3" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Services;
