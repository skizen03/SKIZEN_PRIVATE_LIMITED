import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  BarChart3,
  Boxes,
  CheckCircle2,
  Cpu,
  GitBranch,
  Globe2,
  LayoutDashboard,
  Layers,
  Lock,
  Server,
  ShieldCheck,
  Ticket,
  Users,
} from 'lucide-react';

export type CorporateVisualVariant =
  | 'hero'
  | 'about'
  | 'services'
  | 'clients'
  | 'portfolio'
  | 'whyChoose'
  | 'testimonials'
  | 'process'
  | 'faq'
  | 'contact';

type Props = {
  variant: CorporateVisualVariant;
  /** Slightly tighter layout for dense section headers */
  compact?: boolean;
  className?: string;
};

function Shell({
  children,
  className = '',
  yRange = -40,
}: {
  children: React.ReactNode;
  className?: string;
  yRange?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, yRange]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative mx-auto w-full max-w-md lg:max-w-none ${className}`}
      aria-hidden
    >
      <div className="pointer-events-none absolute -right-4 -top-6 h-28 w-28 rounded-full bg-ski-accent/10 blur-3xl md:h-32 md:w-32" />
      <div className="pointer-events-none absolute -bottom-6 -left-4 h-32 w-32 rounded-full bg-ski-black/[0.04] blur-3xl md:h-40 md:w-40" />
      {children}
    </motion.div>
  );
}

const cardBase =
  'relative cursor-default rounded-2xl border border-zen-line bg-white shadow-card transition-[box-shadow,border-color] duration-300 hover:border-ski-accent/30 hover:shadow-card-hover';
const micro = 'text-[10px] font-medium uppercase tracking-wider text-zen-muted';

const cardMotion = {
  whileHover: { y: -3, transition: { type: 'spring' as const, stiffness: 400, damping: 30 } },
  whileTap: { scale: 0.985, transition: { type: 'spring' as const, stiffness: 520, damping: 34 } },
};

const floatCardMotion = {
  whileHover: {
    y: -2,
    scale: 1.02,
    transition: { type: 'spring' as const, stiffness: 450, damping: 26 },
  },
  whileTap: { scale: 0.96, transition: { type: 'spring' as const, stiffness: 500, damping: 30 } },
};

const floatCardClass =
  'z-10 cursor-default rounded-xl border border-zen-line bg-white shadow-card transition-[box-shadow,border-color] duration-300 hover:border-ski-accent/30 hover:shadow-card-hover';

/** Corporate / enterprise-style abstract visuals — no external assets */
const CorporateTechVisual: React.FC<Props> = ({ variant, compact, className = '' }) => {
  const sm = compact ? 'p-4' : 'p-5';
  const yR = compact ? -28 : -40;

  switch (variant) {
    case 'hero':
      return (
        <Shell className={className} yRange={-48}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className={`${cardBase} ${sm} group/bars`}
            {...cardMotion}
          >
            <div className="mb-4 flex items-center justify-between border-b border-zen-line pb-3">
              <div className="flex items-center gap-2 text-xs font-medium text-zen-muted">
                <LayoutDashboard className="h-4 w-4 text-ski-accent" strokeWidth={1.5} />
                Platform overview
              </div>
              <span className="rounded-full bg-ski-gray px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zen-muted">
                Live
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                {[40, 65, 45, 80, 55].map((h, i) => (
                  <div
                    key={i}
                    className="origin-bottom flex-1 rounded-sm bg-gradient-to-t from-ski-accent/25 to-ski-accent/5 transition-transform duration-300 group-hover/bars:scale-y-110"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
              <div className="flex items-end justify-between gap-4 rounded-lg border border-zen-line bg-ski-gray/40 p-3 transition-[border-color,background-color] duration-300 group-hover/bars:border-ski-accent/20 group-hover/bars:bg-white">
                <div>
                  <p className={micro}>Deploy health</p>
                  <p className="text-lg font-semibold tabular-nums text-ski-black">Stable</p>
                </div>
                <Cpu className="h-8 w-8 text-ski-accent/80 transition-transform duration-300 group-hover/bars:rotate-6" strokeWidth={1.25} />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className={`group/api absolute -right-2 top-1/3 w-[42%] p-3 md:-right-6 ${floatCardClass}`}
            {...floatCardMotion}
          >
            <div className={`mb-2 flex items-center gap-2 ${micro}`}>
              <BarChart3 className="h-3.5 w-3.5 text-ski-accent" strokeWidth={1.5} />
              API latency
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-ski-gray">
              <div className="h-full w-3/5 origin-left rounded-full bg-ski-accent transition-transform duration-500 group-hover/api:scale-x-[1.08]" />
            </div>
            <p className="mt-2 text-xs font-semibold text-ski-black">Within SLO</p>
          </motion.div>
        </Shell>
      );

    case 'about':
      return (
        <Shell className={className} yRange={yR}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`${cardBase} ${sm} group/bars`}
            {...cardMotion}
          >
            <div className="mb-3 flex items-center justify-between border-b border-zen-line pb-3">
              <span className="flex items-center gap-2 text-xs font-medium text-zen-muted">
                <Layers className="h-4 w-4 text-ski-accent" strokeWidth={1.5} />
                Operating model
              </span>
              <span className="rounded bg-ski-accent/15 px-2 py-0.5 text-[10px] font-semibold text-ski-accent">
                ISO-ready
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Architecture & security', barClass: 'w-full' },
                { label: 'Engineering delivery', barClass: 'w-11/12' },
                { label: 'Run & optimise', barClass: 'w-4/5' },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex justify-between text-[11px] font-medium text-ski-black">
                    <span>{row.label}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-ski-accent" strokeWidth={2} />
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-ski-gray">
                    <div
                      className={`h-full origin-left rounded-full bg-ski-accent/80 transition-transform duration-300 group-hover/bars:scale-x-[1.02] ${row.barClass}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className={`group/uptime absolute -bottom-4 -right-1 w-[55%] p-3 md:-right-4 ${floatCardClass}`}
            {...floatCardMotion}
          >
            <p className={micro}>Uptime target</p>
            <p className="text-xl font-semibold tabular-nums text-ski-black transition-transform duration-300 group-hover/uptime:scale-105">
              99.9%
            </p>
            <p className="mt-1 text-[10px] text-zen-muted">Enterprise SLA</p>
          </motion.div>
        </Shell>
      );

    case 'services':
      return (
        <Shell className={className} yRange={yR}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
            className={`${cardBase} ${sm} group/svc`}
            {...cardMotion}
          >
            <div className="mb-3 flex items-center gap-2 border-b border-zen-line pb-3 text-xs font-medium text-zen-muted">
              <Server className="h-4 w-4 text-ski-accent" strokeWidth={1.5} />
              Capability stack
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Applications', 'Data layer', 'Integrations', 'Observability'].map((t) => (
                <div
                  key={t}
                  className="rounded-lg border border-zen-line bg-ski-gray/30 px-2.5 py-2 text-center text-[11px] font-semibold text-ski-black transition-[border-color,background-color] duration-300 group-hover/svc:border-ski-accent/25 group-hover/svc:bg-white"
                >
                  {t}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-zen-line bg-white px-3 py-2">
              <Globe2 className="h-4 w-4 shrink-0 text-ski-accent" strokeWidth={1.5} />
              <span className="text-[11px] leading-snug text-zen-muted">Cloud-native · API-first · RBAC</span>
            </div>
          </motion.div>
        </Shell>
      );

    case 'clients':
      return (
        <Shell className={className} yRange={yR}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${cardBase} ${sm} pb-6 group/clients`}
            {...cardMotion}
          >
            <div className="mb-4 flex items-center gap-2 border-b border-zen-line pb-3 text-xs font-medium text-zen-muted">
              <Users className="h-4 w-4 text-ski-accent" strokeWidth={1.5} />
              Account topology
            </div>
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-ski-accent/30 bg-ski-accent/5 transition-[transform,border-color,box-shadow] duration-300 group-hover/clients:scale-105 group-hover/clients:border-ski-accent/50 group-hover/clients:shadow-md">
              <span className="text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-ski-black">
                SKIZEN
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {['ERP', 'Web', 'Portal', 'Analytics'].map((t) => (
                <div
                  key={t}
                  className="rounded border border-zen-line bg-ski-gray/40 py-1.5 text-center text-[10px] font-semibold text-ski-black"
                >
                  {t}
                </div>
              ))}
            </div>
          </motion.div>
        </Shell>
      );

    case 'portfolio':
      return (
        <Shell className={className} yRange={yR}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${cardBase} ${sm} group/port`}
            {...cardMotion}
          >
            <div className="mb-3 flex items-center justify-between border-b border-zen-line pb-3">
              <span className="flex items-center gap-2 text-xs font-medium text-zen-muted">
                <GitBranch className="h-4 w-4 text-ski-accent" strokeWidth={1.5} />
                Release train
              </span>
              <span className="rounded bg-ski-black px-2 py-0.5 font-mono text-[10px] font-semibold text-white">
                v2.4.0
              </span>
            </div>
            <div className="space-y-2">
              {['Build passed', 'Security scan', 'Staging deploy'].map((step, i) => (
                <div key={step} className="flex items-center gap-2 text-[11px] font-medium text-ski-black">
                  <CheckCircle2 className="h-3.5 w-3.5 text-ski-accent" strokeWidth={2} />
                  {step}
                  <span className="ml-auto font-mono text-[10px] text-zen-muted">{['CI', 'SAST', 'CD'][i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-ski-gray">
              <div className="h-full w-4/5 origin-left rounded-full bg-ski-accent transition-transform duration-500 group-hover/port:scale-x-[1.04]" />
            </div>
            <p className="mt-2 text-[10px] text-zen-muted">Production promotion · Change controlled</p>
          </motion.div>
        </Shell>
      );

    case 'whyChoose':
      return (
        <Shell className={className} yRange={yR}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${cardBase} ${sm} group/matrix`}
            {...cardMotion}
          >
            <div className="mb-3 border-b border-zen-line pb-3 text-xs font-medium text-zen-muted">Capability matrix</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { k: 'Scale', v: 'Multi-tenant' },
                { k: 'Security', v: 'RBAC · Audit' },
                { k: 'Velocity', v: 'Agile pods' },
                { k: 'Support', v: '24/7 ready' },
              ].map((cell) => (
                <div
                  key={cell.k}
                  className="rounded-lg border border-zen-line bg-ski-gray/25 p-2 transition-[border-color,background-color] duration-300 group-hover/matrix:border-ski-accent/20 group-hover/matrix:bg-white"
                >
                  <p className={micro}>{cell.k}</p>
                  <p className="mt-1 text-xs font-semibold text-ski-black">{cell.v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Shell>
      );

    case 'testimonials':
      return (
        <Shell className={className} yRange={yR}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${cardBase} ${sm} group/csat`}
            {...cardMotion}
          >
            <div className="mb-3 flex items-center justify-between border-b border-zen-line pb-3">
              <span className={micro}>Stakeholder CSAT</span>
              <BarChart3 className="h-4 w-4 text-ski-accent" strokeWidth={1.5} />
            </div>
            <p className="text-3xl font-semibold tabular-nums text-ski-black">4.9</p>
            <p className="text-xs text-zen-muted">Weighted score · Post-delivery surveys</p>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 flex-1 origin-bottom rounded-sm bg-ski-accent/80 transition-transform duration-300 group-hover/csat:scale-y-125"
                  style={{ transitionDelay: `${i * 35}ms` }}
                />
              ))}
            </div>
            <p className="mt-2 text-[10px] font-medium text-zen-muted">NPS-aligned reporting</p>
          </motion.div>
        </Shell>
      );

    case 'process':
      return (
        <Shell className={className} yRange={yR}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${cardBase} ${sm} group/process`}
            {...cardMotion}
          >
            <div className="mb-3 flex items-center gap-2 border-b border-zen-line pb-3 text-xs font-medium text-zen-muted">
              <Boxes className="h-4 w-4 text-ski-accent" strokeWidth={1.5} />
              Delivery phases
            </div>
            <div className="relative pl-4">
              <div className="absolute bottom-1 left-1.5 top-1 w-px bg-zen-line" />
              {['Discover', 'Design', 'Build', 'Verify', 'Ship'].map((phase, i) => (
                <div
                  key={phase}
                  className="relative mb-2.5 flex items-center gap-2 transition-transform duration-300 last:mb-0 group-hover/process:translate-x-0.5"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span className="absolute -left-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-ski-accent transition-[transform,box-shadow] duration-300 group-hover/process:scale-125 group-hover/process:shadow-sm" />
                  <span className="ml-4 text-[11px] font-semibold text-ski-black">{phase}</span>
                  <span className="ml-auto font-mono text-[9px] text-zen-muted">P{i + 1}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </Shell>
      );

    case 'faq':
      return (
        <Shell className={className} yRange={yR}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${cardBase} ${sm} group/faq`}
            {...cardMotion}
          >
            <div className="mb-3 flex items-center gap-2 border-b border-zen-line pb-3 text-xs font-medium text-zen-muted">
              <Ticket className="h-4 w-4 text-ski-accent" strokeWidth={1.5} />
              Knowledge base
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-zen-line bg-ski-gray/30 px-3 py-2 transition-[border-color,background-color] duration-300 group-hover/faq:border-ski-accent/25 group-hover/faq:bg-white">
                <span className="text-[11px] font-semibold text-ski-black">Open requests</span>
                <span className="rounded bg-white px-2 py-0.5 font-mono text-[10px] text-ski-accent transition-transform duration-300 group-hover/faq:scale-110">
                  3
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-zen-line px-3 py-2 transition-[border-color] duration-300 group-hover/faq:border-ski-accent/20">
                <span className="text-[11px] font-semibold text-ski-black">Median first response</span>
                <span className="font-mono text-[10px] text-zen-muted">&lt; 24h</span>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-zen-muted">Documented answers · Single source of truth</p>
          </motion.div>
        </Shell>
      );

    case 'contact':
      return (
        <Shell className={className} yRange={yR}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${cardBase} ${sm} group/contact`}
            {...cardMotion}
          >
            <div className="mb-3 flex items-center gap-2 border-b border-zen-line pb-3 text-xs font-medium text-zen-muted">
              <ShieldCheck className="h-4 w-4 text-ski-accent" strokeWidth={1.5} />
              Secure channel
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-zen-line bg-ski-gray/30 p-3 transition-[border-color,background-color,transform] duration-300 group-hover/contact:border-ski-accent/30 group-hover/contact:bg-white group-hover/contact:shadow-sm">
              <Lock className="h-8 w-8 shrink-0 text-ski-accent/90 transition-transform duration-300 group-hover/contact:scale-105" strokeWidth={1.25} />
              <div>
                <p className="text-xs font-semibold text-ski-black">TLS 1.3 · Encrypted transit</p>
                <p className="mt-0.5 font-mono text-[10px] text-zen-muted">@skizen.in</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded border border-zen-line bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-zen-muted transition-[border-color,color] duration-300 group-hover/contact:border-ski-accent/25 group-hover/contact:text-ski-black">
                B2B only
              </span>
              <span className="rounded border border-zen-line bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-zen-muted transition-[border-color,color] duration-300 group-hover/contact:border-ski-accent/25 group-hover/contact:text-ski-black">
                NDA on request
              </span>
            </div>
          </motion.div>
        </Shell>
      );

    default:
      return null;
  }
};

export default CorporateTechVisual;
