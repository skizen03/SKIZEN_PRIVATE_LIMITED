import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Code2, Layers, Zap } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { useSectionMotion } from '../hooks/useSectionMotion';

const STATS = [
  { icon: Layers, value: '15+', label: 'Projects delivered', accent: true },
  { icon: Code2, value: '5+', label: 'Years engineering', accent: false },
  { icon: Zap, value: '98%', label: 'Client satisfaction', accent: false },
];

const BULLETS = [
  'Senior engineers — not freelancers or junior developers',
  'Full-cycle delivery: design, build, test, deploy, support',
  'Hyderabad-based with global delivery standards',
  'Specialised in ERP, CRM, automation & web applications',
];

/** 3-D tilt card — tracks mouse within the card */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      el.style.transform = `perspective(800px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) translateY(-4px)`;
    };
    const onLeave = () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease' }}
    >
      {children}
    </div>
  );
}

const About: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <motion.section
      id="about"
      className="scroll-mt-header relative overflow-hidden bg-white py-28 md:py-32 lg:py-36"
      {...sectionProps}
    >
      {/* Subtle blob accent */}
      <div
        className="blob blob-1 pointer-events-none absolute -right-40 top-0 opacity-30"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ── Left: Editorial text ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <span className="badge mb-6 inline-flex">About SKIZEN</span>
            <h2 className="text-display text-ink">
              A product studio built for{' '}
              <br />
              <span className="heading-serif gradient-text">serious builders</span>
            </h2>
            <p className="mt-6 text-[1.0rem] leading-[1.75] text-muted">
              SKIZEN is a software engineering company and technology partner
              headquartered in Hyderabad, India. We build bespoke digital products —
              from enterprise dashboards and CRM systems to hospital portals and
              full-stack SaaS platforms.
            </p>

            <ul className="mt-8 space-y-3">
              {BULLETS.map((b, i) => (
                <motion.li
                  key={b}
                  className="flex items-start gap-3 text-sm leading-[1.6] text-muted"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: easeOut }}
                >
                  <CheckCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    strokeWidth={2.5}
                  />
                  {b}
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              className="underline-reveal mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ink"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.55, ease: easeOut }}
            >
              Book a free consultation →
            </motion.a>
          </motion.div>

          {/* ── Right: 3D tilt stat cards ── */}
          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
          >
            {STATS.map((s, i) => (
              <TiltCard key={s.label}>
                <motion.div
                  className={`animated-border flex items-center gap-5 rounded-2xl border p-6 ${
                    s.accent
                      ? 'border-brand/20 bg-orange-tint'
                      : 'border-[#E5E2DE] bg-surface'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.1, ease: easeOut }}
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                      s.accent ? 'bg-brand/10' : 'bg-white shadow-card'
                    }`}
                  >
                    <s.icon
                      className={`h-6 w-6 ${s.accent ? 'text-brand' : 'text-ink'}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-ink">{s.value}</p>
                    <p className="mt-0.5 text-sm text-muted">{s.label}</p>
                  </div>
                </motion.div>
              </TiltCard>
            ))}

            {/* Editorial quote card */}
            <TiltCard>
              <motion.blockquote
                className="glass-card rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.55, ease: easeOut }}
              >
                <div className="mb-3 text-3xl leading-none text-brand opacity-50">"</div>
                <p className="text-sm leading-[1.7] text-ink">
                  We don't just write code. We engineer systems that scale with your
                  business and adapt to your evolving needs.
                </p>
                <footer className="mt-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[0.7rem] font-bold text-white">
                    S
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink">SKIZEN Engineering</p>
                    <p className="text-[0.65rem] text-muted">Hyderabad, India</p>
                  </div>
                </footer>
              </motion.blockquote>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* ── Wave Divider ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full" aria-hidden>
        <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none" style={{ display: 'block', height: 50 }}>
          <path d="M0,20 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill="#F3F1EE" fillOpacity="1" />
        </svg>
      </div>
    </motion.section>
  );
};

export default About;
