import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';
import CorporateTechVisual from './tech-visuals/CorporateTechVisual';
import { easeOut } from '../lib/motion';
import { useSectionMotion, interactiveCardProps } from '../hooks/useSectionMotion';

const projects = [
  {
    title: 'The Caffeine Stories',
    year: '2025',
    category: 'Full stack ordering & admin analytics',
    description:
      'Scalable full-stack ordering platform with real-time order tracking (React.js, Node.js, Supabase). Admin dashboard with reporting, invoices, RBAC, and analytics.',
    tags: ['React.js', 'Node.js', 'Supabase', 'Chart.js'],
    href: 'https://thecaffeinestories.vercel.app/',
    initials: 'CS',
  },
  {
    title: 'St Anns Hospital Website',
    year: '2024',
    category: 'Institutional website',
    description:
      'Responsive hospital platform with React.js and Tailwind CSS—improved accessibility, communication, and trust for patients and visitors.',
    tags: ['React.js', 'Tailwind CSS', 'Firebase', 'EmailJS'],
    href: 'https://stannshospital.org/',
    initials: 'SA',
  },
  {
    title: 'Vision Fame',
    year: '2024',
    category: 'Startup website',
    description:
      'Complete startup website establishing digital presence and modern brand communication for a growing private limited company.',
    tags: ['React.js', 'Next.js', 'Tailwind CSS'],
    href: 'https://visionfamepvtltd.com/',
    initials: 'VF',
  },
  {
    title: 'St Anns Junior College',
    year: '2024',
    category: 'Educational website',
    description:
      'Modern educational website with clear institutional IA, admissions-oriented content, and responsive layouts.',
    tags: ['React.js', 'Tailwind CSS'],
    href: 'https://stannsjuniorcollegetarnaka.in/',
    initials: 'SJ',
  },
];

const Portfolio: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <motion.section
      id="portfolio"
      className="scroll-mt-header bg-ski-gray py-20 md:py-24 lg:py-28"
      {...sectionProps}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start"
        >
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-ski-black md:text-4xl lg:text-5xl">
              Portfolio
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zen-muted md:text-lg">
              Selected builds spanning <strong className="font-semibold text-ski-black">full stack products</strong>,
              institutional platforms, and high-performance web engineering.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-[280px] justify-center sm:max-w-xs lg:max-w-none lg:justify-end">
            <CorporateTechVisual variant="portfolio" compact className="max-w-[320px]" />
          </div>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.08, ease: easeOut }}
              {...interactiveCardProps}
              className="group flex cursor-default flex-col overflow-hidden rounded-xl border border-zen-line bg-white shadow-sm transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="flex items-center justify-between gap-4 border-b border-zen-line px-6 py-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zen-line bg-ski-gray/50 text-sm font-bold tracking-tight text-ski-black"
                  aria-hidden
                >
                  {project.initials}
                </span>
                <motion.a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zen-line text-ski-black transition-colors duration-300 hover:border-ski-accent hover:text-ski-accent"
                  aria-label={`Open ${project.title} in a new tab`}
                >
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </motion.a>
              </div>

              <div className="flex flex-1 flex-col p-6 pt-5">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ski-accent">
                  <span>{project.category}</span>
                  <span className="text-zen-line">|</span>
                  <span className="text-zen-muted">{project.year}</span>
                </div>
                <h3 className="text-lg font-semibold text-ski-black">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zen-muted">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-zen-line bg-ski-gray/50 px-2.5 py-1 text-xs font-medium text-ski-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ski-accent hover:underline"
                >
                  View live project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
