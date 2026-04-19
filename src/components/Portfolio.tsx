import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { useSectionMotion } from '../hooks/useSectionMotion';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const projects = [
  {
    num: '01',
    title: 'The Caffeine Stories',
    titleItalic: 'Caffeine Stories',       // Playfair italic portion
    titlePlain: 'The ',                     // Space Grotesk portion
    year: '2025',
    category: 'Full-stack ordering & analytics',
    description:
      'Scalable ordering platform with real-time tracking, admin dashboards with RBAC, reporting, and analytics.',
    tags: ['React.js', 'Node.js', 'Supabase', 'Chart.js'],
    href: 'https://thecaffeinestories.vercel.app/',
    color: '#E8650A',
    accent: 'rgba(232,101,10,0.08)',
  },
  {
    num: '02',
    title: 'St Anns Hospital',
    titleItalic: 'Anns Hospital',
    titlePlain: 'St ',
    year: '2024',
    category: 'Institutional website',
    description:
      'Responsive hospital platform with improved accessibility and patient-first communication design.',
    tags: ['React.js', 'Tailwind CSS', 'Firebase', 'EmailJS'],
    href: 'https://stannshospital.org/',
    color: '#4ECDC4',
    accent: 'rgba(78,205,196,0.07)',
  },
  {
    num: '03',
    title: 'Vision Fame',
    titleItalic: 'Fame',
    titlePlain: 'Vision ',
    year: '2024',
    category: 'Startup website',
    description:
      'Complete startup digital presence establishing modern brand communication for a growing private limited company.',
    tags: ['React.js', 'Next.js', 'Tailwind CSS'],
    href: 'https://visionfamepvtltd.com/',
    color: '#C3A6FF',
    accent: 'rgba(195,166,255,0.07)',
  },
  {
    num: '04',
    title: 'St Anns Jr College',
    titleItalic: 'Jr College',
    titlePlain: 'St Anns ',
    year: '2024',
    category: 'Educational website',
    description:
      'Modern educational platform with clear IA, admissions-oriented content, and fully responsive layouts.',
    tags: ['React.js', 'Tailwind CSS'],
    href: 'https://stannsjuniorcollegetarnaka.in/',
    color: '#FFB347',
    accent: 'rgba(255,179,71,0.07)',
  },
];

/** Text scramble hook — cycles random chars then resolves to final string */
function useScramble(target: string, active: boolean) {
  const [display, setDisplay] = useState(target);
  const frame = useRef(0);
  const raf = useRef<number>(0);

  const animate = useCallback(() => {
    let iteration = 0;
    const total = target.length * 3;
    const tick = () => {
      setDisplay(
        target
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration / 3) return target[i];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );
      if (iteration < total) {
        iteration++;
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);

  useEffect(() => {
    if (active) {
      const cleanup = animate();
      return cleanup;
    } else {
      setDisplay(target);
    }
  }, [active, animate, target]);

  return display;
}

/** Single project row */
function ProjectRow({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const scrambled = useScramble(project.category.toUpperCase(), hovered);
  const lineRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }}
    >
      {/* Top rule — animated width on inView */}
      <motion.div
        className="h-px bg-[#E5E2DE]"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1, ease: easeOut }}
      />

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block py-8 sm:py-10 lg:py-12"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`View ${project.title} — opens in new tab`}
      >
        {/* Hover background wash */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: project.accent }}
          aria-hidden
        />

        <div className="relative z-10 grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 sm:gap-x-10 lg:grid-cols-[80px_1fr_auto] lg:items-center lg:gap-x-12">

          {/* ── Column 1: Number ── */}
          <div className="flex items-center">
            <span
              className="select-none font-['Space_Grotesk'] text-[0.65rem] font-bold tracking-[0.22em] transition-colors duration-300"
              style={{ color: hovered ? project.color : 'rgba(15,15,14,0.25)' }}
            >
              {project.num}
            </span>
          </div>

          {/* ── Column 2: Main content ── */}
          <div>
            {/* Category — scramble effect */}
            <p
              className="mb-3 font-['Space_Grotesk'] text-[0.6rem] font-semibold tracking-[0.22em] transition-colors duration-300 sm:text-[0.65rem]"
              style={{ color: hovered ? project.color : 'rgba(15,15,14,0.35)' }}
            >
              {scrambled}
            </p>

            {/* Title — split serif/sans typography */}
            <h3 className="flex flex-wrap items-baseline gap-x-2 leading-none">
              <span
                className="font-['Inter'] text-[clamp(1.4rem,3.5vw,2.6rem)] font-semibold tracking-tight text-ink transition-opacity duration-300"
                style={{ opacity: hovered ? 0.5 : 1 }}
              >
                {project.titlePlain}
              </span>
              <span
                className="font-['Playfair_Display'] text-[clamp(1.5rem,3.8vw,2.9rem)] font-bold italic leading-none tracking-tight transition-all duration-500"
                style={{
                  color: hovered ? project.color : '#0F0F0E',
                  textShadow: hovered ? `0 0 40px ${project.color}40` : 'none',
                }}
              >
                {project.titleItalic}
              </span>
              <span
                className="ml-1 font-['Space_Grotesk'] text-[0.7rem] font-medium tracking-[0.12em] text-muted/40"
              >
                /{project.year}
              </span>
            </h3>

            {/* Description — slides in on hover */}
            <div
              className="overflow-hidden transition-all duration-500"
              style={{ maxHeight: hovered ? '80px' : '0px', opacity: hovered ? 1 : 0 }}
            >
              <p className="mt-3 font-['Space_Grotesk'] text-sm leading-[1.6] text-muted">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2 overflow-hidden transition-all duration-500"
              style={{ maxHeight: hovered ? '60px' : '0px', opacity: hovered ? 1 : 0, marginTop: hovered ? '12px' : '0px' }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-2.5 py-0.5 font-['Space_Grotesk'] text-[0.6rem] font-semibold tracking-wide"
                  style={{
                    borderColor: `${project.color}40`,
                    color: project.color,
                    background: project.accent,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Column 3: Arrow (desktop) ── */}
          <div className="hidden lg:flex lg:items-center lg:justify-end">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-400"
              style={{
                borderColor: hovered ? project.color : '#E5E2DE',
                background: hovered ? project.accent : 'transparent',
                transform: hovered ? 'translate(4px, -4px)' : 'translate(0,0)',
              }}
            >
              <ArrowUpRight
                className="h-5 w-5 transition-colors duration-300"
                style={{ color: hovered ? project.color : 'rgba(15,15,14,0.3)' }}
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

/** Parallax decorative large number */
function ParallaxNumber({ num, color }: { num: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="pointer-events-none select-none font-['Playfair_Display'] text-[clamp(6rem,15vw,12rem)] font-black leading-none"
      aria-hidden
    >
      <span style={{ color, opacity: 0.055 }}>{num}</span>
    </motion.div>
  );
}

const Portfolio: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.04 });

  return (
    <motion.section
      id="portfolio"
      className="scroll-mt-header relative overflow-hidden bg-off-white py-28 md:py-32 lg:py-36"
      {...sectionProps}
    >
      {/* ── Background decorative numbers ── */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between overflow-hidden px-4 py-12" aria-hidden>
        <div className="self-end">
          <ParallaxNumber num="01" color="#E8650A" />
        </div>
        <div className="self-start">
          <ParallaxNumber num="04" color="#C3A6FF" />
        </div>
      </div>

      {/* ── Grain overlay ── */}
      <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8" ref={ref}>

        {/* ── Header ── */}
        <div className="mb-16 grid sm:grid-cols-2 sm:items-end sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            <span className="badge mb-6 inline-flex">Selected work</span>
            <h2 className="leading-none">
              {/* Mix: serif + sans in the heading */}
              <span className="block font-['Inter'] text-[clamp(1rem,2vw,1.2rem)] font-semibold uppercase tracking-[0.18em] text-muted">
                Portfolio
              </span>
              <span className="block font-['Playfair_Display'] text-[clamp(2.8rem,7vw,5.5rem)] font-black italic leading-[1.0] tracking-tight text-ink">
                Built &amp;
              </span>
              <span className="block font-['Playfair_Display'] text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[1.0] tracking-tight text-ink">
                Shipped.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="sm:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: easeOut }}
          >
            <p className="font-['Space_Grotesk'] text-sm leading-[1.75] text-muted">
              Hover any project to see details.
              <br />
              Click to visit the live build.
            </p>
            <p className="mt-4 font-['Space_Grotesk'] text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted/40">
              {projects.length} projects
            </p>
          </motion.div>
        </div>

        {/* ── Project list ── */}
        <div>
          {projects.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} inView={inView} />
          ))}
          {/* Final bottom rule */}
          <motion.div
            className="h-px bg-[#E5E2DE]"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: projects.length * 0.1, ease: easeOut }}
          />
        </div>

        {/* ── Footer CTA ── */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-5 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
        >
          <p className="font-['Space_Grotesk'] text-sm text-muted">
            Want to see more, or discuss your project?
          </p>
          <a
            href="#contact"
            className="cta-pulse glow-button inline-flex items-center gap-2.5 rounded-2xl bg-ink px-8 py-3.5 font-['Space_Grotesk'] text-sm font-semibold text-white shadow-pill transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:shadow-glow"
          >
            Start a project
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
