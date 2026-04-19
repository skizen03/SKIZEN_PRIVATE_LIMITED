import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { easeOut } from '../lib/motion';

const STATS = [
  { value: '10+', label: 'Clients Served' },
  { value: '15+', label: 'Projects Delivered' },
  { value: '9+', label: 'Industries' },
  { value: '98%', label: 'Satisfaction Rate' },
];

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [isHovering, setIsHovering] = useState(false);

  // Silky smooth spring for the interactive spotlight
  const mouseX = useSpring(0, { stiffness: 35, damping: 15, mass: 0.5 });
  const mouseY = useSpring(0, { stiffness: 35, damping: 15, mass: 0.5 });

  useEffect(() => {
    // Initial center position on mount
    mouseX.set(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
    mouseY.set(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);
  }, [mouseX, mouseY]);

  // Capture pointer movements anywhere in the hero section
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '15%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '5%']);

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={(e) => {
        handlePointerMove(e);
        setIsHovering(true);
      }}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#FAFAF8]"
      style={{ isolation: 'isolate' }}
      aria-label="Hero"
    >
      {/* ── Creative Interactive Backgrounds ── */}
      
      {/* 1. Interactive Spotlight Orb & Technical HUD (Follows touch/cursor) */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 z-0 transition-opacity duration-1000"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isMobile ? '400px' : '700px',
          height: isMobile ? '400px' : '700px',
          opacity: isHovering ? 1 : 0.6,
        }}
      >
         {/* The blurred light (Visible on all devices) */}
         <div className="absolute inset-0 rounded-full blur-[90px] sm:blur-[120px]" 
              style={{ background: 'radial-gradient(circle, rgba(232,101,10,0.18) 0%, rgba(232,101,10,0.05) 40%, transparent 70%)' }} />
         
         {/* The Technical Crosshair Tracker (Hidden on Mobile for a cleaner look) */}
         <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-20 mix-blend-multiply">
            {/* Axis lines */}
            <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-brand/60 to-transparent" />
            <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
            {/* Concentric rings */}
            <div className="w-[120px] h-[120px] rounded-full border border-brand/40" />
            <motion.div 
               className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-brand/40"
               animate={{ rotate: 360 }}
               transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            />
            <motion.div 
               className="absolute w-[360px] h-[360px] rounded-full border border-dotted border-brand/30"
               animate={{ rotate: -360 }}
               transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            />
         </div>
      </motion.div>

      {/* 2. Engineering Blueprint Grid with Data Pulses */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          y: gridY,
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 10%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 10%, transparent 90%)',
        }}
      >
        {/* Base Static Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] sm:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0F0F0E 1px, transparent 1px),
              linear-gradient(to bottom, #0F0F0E 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Animated Data Pulses (Hidden on mobile to reduce clutter and save battery) */}
        <div className="hidden sm:block">
          <motion.div
            className="absolute top-0 w-[2px] h-[25vh] bg-gradient-to-b from-transparent via-brand to-transparent opacity-50 blur-[1px]"
            style={{ left: '20%' }}
            animate={{ y: ['-30vh', '120vh'] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-0 w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-ink to-transparent opacity-30"
            style={{ left: '75%' }}
            animate={{ y: ['-40vh', '120vh'] }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity, delay: 1.5 }}
          />
          <motion.div
            className="absolute left-0 h-[2px] w-[35vw] bg-gradient-to-r from-transparent via-brand to-transparent opacity-40 blur-[1px]"
            style={{ top: '35%' }}
            animate={{ x: ['-40vw', '120vw'] }}
            transition={{ duration: 7, ease: "linear", repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute left-0 h-[1px] w-[25vw] bg-gradient-to-r from-transparent via-brand to-transparent opacity-30"
            style={{ top: '65%' }}
            animate={{ x: ['120vw', '-30vw'] }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity, delay: 2.2 }}
          />
        </div>
      </motion.div>
      
      {/* 3. Static Ambient Auras */}
      <motion.div 
        className="pointer-events-none absolute top-[-20%] right-[-10%] z-0 h-[600px] w-[600px] rounded-full bg-brand/10 blur-[130px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']) }}
      />
      <motion.div 
        className="pointer-events-none absolute bottom-[-10%] left-[-10%] z-0 h-[500px] w-[500px] rounded-full bg-brand/5 blur-[100px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }}
      />


      {/* ── Main Content ── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-28 pb-10 text-center sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <span className="badge shimmer mb-8 inline-flex bg-white/50 backdrop-blur-md">
            <span className="accent-dot" />
            Software &amp; Product Engineering
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-hero text-ink"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
        >
          <span className="block">Build software</span>
          <span className="block">
            <span className="heading-serif gradient-text">that&nbsp;scales</span>
          </span>
          <span className="block text-[0.58em] font-normal tracking-tight text-ink/70" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}>with your business</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="mx-auto mt-7 max-w-xl text-[1.05rem] leading-[1.7] text-muted"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
        >
          SKIZEN designs and engineers custom web applications, ERP &amp; CRM systems,
          portals, and automation—delivered by senior engineers, end to end.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: easeOut }}
        >
          <a
            href="#contact"
            className="cta-pulse glow-button relative inline-flex items-center gap-2 rounded-2xl bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(232,101,10,0.4)] transition-all duration-300 active:scale-[0.98] select-none sm:hover:-translate-y-1 sm:hover:shadow-[0_8px_32px_rgba(232,101,10,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2"
          >
            Book a free consultation
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <Link
            to={{ pathname: '/', hash: '#portfolio' }}
            className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E2DE] bg-white/70 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur-sm transition-all duration-300 active:scale-[0.98] select-none sm:hover:-translate-y-1 sm:hover:border-brand/30 sm:hover:shadow-[0_8px_24px_rgba(15,15,14,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2"
          >
            View our work ↗
          </Link>
        </motion.div>

        {/* Trust */}
        <motion.p
          className="mt-7 text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45, ease: easeOut }}
        >
          Trusted by retail, healthcare, education &amp; SaaS companies
        </motion.p>
      </motion.div>

      {/* ── Stats Row ── */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-6 lg:px-8 pb-12"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
      >
        <div className="glass-card animated-border grid grid-cols-2 divide-x divide-y divide-[#E5E2DE]/60 overflow-hidden rounded-3xl sm:grid-cols-4 sm:divide-y-0 backdrop-blur-md bg-white/40">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center justify-center py-7 px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.6 + i * 0.07, ease: easeOut }}
            >
              <span className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {s.value}
              </span>
              <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted text-center">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Wave Divider Bottom ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full" aria-hidden>
        <svg
          viewBox="0 0 1440 60"
          className="w-full"
          preserveAspectRatio="none"
          style={{ display: 'block', height: 60 }}
        >
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
            fill="#FFFFFF"
            fillOpacity="0.55"
          />
        </svg>
      </div>
    </motion.section>
  );
};

export default Hero;
