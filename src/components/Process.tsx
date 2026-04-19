import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { easeOut } from '../lib/motion';

const STEPS = [
  { num: '01', title: 'Discovery & Scope', body: "We start by understanding your goals, users, and constraints. You'll get a detailed scope document before any code is written." },
  { num: '02', title: 'Design & Architecture', body: 'UI wireframes, system design, database schema, and API contracts — all reviewed and approved before development begins.' },
  { num: '03', title: 'Agile Development', body: "Two-week sprints. Regular demos. You're never waiting weeks to see progress — you see it live, every fortnight." },
  { num: '04', title: 'QA & Testing', body: 'Automated unit tests, integration tests, browser testing, and manual QA on every sprint before features ship.' },
  { num: '05', title: 'Deployment & Handover', body: 'Production deployment with CI/CD pipelines, documentation, training, and environment setup included.' },
  { num: '06', title: 'Support & Iteration', body: "6 months of post-launch support, bug fixes, and performance monitoring. Then we plan the next phase together." },
];

const ProcessStep = ({ step, index }: { step: typeof STEPS[0]; index: number }) => {
  const stepRef = useRef<HTMLDivElement>(null);
  
  // Track when the step hits the vertical center of the viewport
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ['start 60%', 'start 40%']
  });

  // Smooth the scroll value
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Interpolations for visual state
  const circleBg = useTransform(smoothProgress, [0, 1], ['#FFFFFF', '#E8650A']);
  const circleBorder = useTransform(smoothProgress, [0, 1], ['rgba(229,226,222,1)', 'rgba(232,101,10,0)']);
  const numColor = useTransform(smoothProgress, [0, 1], ['#E8650A', '#FFFFFF']);
  
  const cardBorder = useTransform(smoothProgress, [0, 1], ['rgba(229,226,222,1)', 'rgba(232,101,10,0.4)']);
  const glowOpacity = smoothProgress;

  return (
    <div ref={stepRef} className="group relative flex gap-6 sm:gap-10">
      
      {/* Glow aura behind the circle when active */}
      <motion.div 
        className="absolute left-0 top-0 z-0 h-12 w-12 rounded-full bg-brand/30 blur-xl sm:h-16 sm:w-16"
        style={{ opacity: glowOpacity }}
      />

      {/* Step number circle */}
      <div className="relative z-10 shrink-0">
        <motion.div 
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-[0.65rem] font-bold tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16 sm:text-xs"
          style={{ backgroundColor: circleBg, borderColor: circleBorder, color: numColor }}
        >
          {step.num}
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div 
        className="relative mb-8 flex-1 rounded-3xl border bg-white/80 p-6 shadow-card backdrop-blur-md transition-all duration-300 hover:shadow-card-hover group-hover:-translate-y-1 sm:mb-12 sm:p-8"
        style={{ borderColor: cardBorder }}
      >
        <h3 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">{step.title}</h3>
        <p className="mt-3 text-sm leading-[1.7] text-muted sm:text-base">{step.body}</p>
        
        {/* Subtle internal glow matching the scroll progress */}
        <motion.div 
          className="pointer-events-none absolute inset-0 z-[-1] rounded-3xl"
          style={{ 
            background: 'linear-gradient(135deg, rgba(232,101,10,0.05), transparent)',
            opacity: glowOpacity
          }}
        />
      </motion.div>
    </div>
  );
};

const Process: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  // Main vertical beam tracking the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end 80%']
  });
  
  const beamHeight = useSpring(scrollYProgress, { stiffness: 50, damping: 15 });

  return (
    <motion.section
      id="process"
      ref={containerRef}
      className="scroll-mt-header relative overflow-hidden bg-[#FAFAF8] py-28 md:py-36 lg:py-40"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8" ref={ref}>
        
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E2DE] bg-white px-3 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="font-grotesk text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted">
              How we work
            </span>
          </div>
          <h2 className="text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Our engineering{' '}
            <span className="heading-serif gradient-text font-normal italic">process</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-[1.7] text-muted sm:text-lg">
            A repeatable, transparent framework that eliminates surprises — from the first discovery call to final deployment.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative mx-auto">
          {/* Default track line */}
          <div className="absolute bottom-0 left-[23px] top-4 w-[2px] bg-[#E5E2DE]/60 sm:left-[31px]" aria-hidden />

          {/* Glowing Scroll Beam */}
          <motion.div
            className="absolute bottom-0 left-[23px] top-4 z-10 w-[2px] origin-top bg-brand shadow-[0_0_12px_rgba(232,101,10,0.8)] sm:left-[31px]"
            style={{ scaleY: beamHeight }}
            aria-hidden
          >
             {/* Beam Tip Spark */}
             <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-brand bg-white shadow-[0_0_15px_rgba(232,101,10,1)]" />
          </motion.div>

          {/* Steps */}
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Process;
