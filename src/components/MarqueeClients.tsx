import React from 'react';

/* ─── Content ───────────────────────────────────── */

const clients = [
  'Pista House',
  'St Anns Hospital',
  'Kasam Pullaiah',
  'St Anns Jr College',
  'Marluce Bakers',
  'Nexus Edge',
];

const tools = [
  'React.js',
  'Google Ads',
  'Supabase',
  'Node.js',
  'Tailwind CSS',
  'Instagram',
  'Google Analytics',
  'Meta Business Suite',
  'Looker Studio',
];

// Duplicate items to ensure smooth infinite scrolling
const repeatedClients = [...clients, ...clients, ...clients, ...clients];
const repeatedTools = [...tools, ...tools, ...tools, ...tools, ...tools];

/* ─── Main component ────────────────────────────── */
const MarqueeClients: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden bg-[#F3F1EE] py-12 sm:py-20 lg:py-24"
      aria-label="Clients and platforms we work with"
    >
      {/* Floating Badge (Mobile Friendly & Elegant) */}
      <div className="pointer-events-none relative z-20 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E8E5E2] bg-white/80 backdrop-blur-sm px-3.5 py-1.5 shadow-sm">
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-brand"
            style={{ animation: 'dot-pulse 2s ease-in-out infinite' }}
            aria-hidden
          />
          <span className="font-grotesk text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted">
            Clients &amp; Stack
          </span>
        </div>
      </div>

      {/* Marquee Container with GPU-accelerated CSS mask for smooth fading edges */}
      <div className="relative flex flex-col gap-6 sm:gap-10 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* Row 1: Clients (Huge Typography, Moving Left) */}
        <div className="group flex overflow-hidden">
          <div
            className="flex w-max items-center animate-marquee-left group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ animationDuration: '45s' }}
          >
            {repeatedClients.map((client, i) => (
              <div key={`client-${i}`} className="flex items-center shrink-0">
                <span className="heading-serif px-6 text-4xl sm:text-6xl md:text-7xl font-bold italic tracking-tight text-ink transition-colors duration-300 hover:text-brand cursor-default">
                  {client}
                </span>
                <span className="font-serif text-4xl sm:text-6xl text-brand/20 shrink-0 italic">
                  *
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Tools (Technical Typography, Moving Right) */}
        <div className="group flex overflow-hidden">
          <div
            className="flex w-max items-center animate-marquee-right group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ animationDuration: '60s' }}
          >
            {repeatedTools.map((tool, i) => (
              <div key={`tool-${i}`} className="flex items-center shrink-0">
                <span className="font-mono px-6 text-sm sm:text-base lg:text-lg uppercase tracking-[0.25em] text-muted transition-colors duration-300 hover:text-ink cursor-default">
                  {tool}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8E5E2] shrink-0" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes dot-pulse {
          0% { box-shadow: 0 0 0 0 rgba(232,101,10, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(232,101,10, 0); }
          100% { box-shadow: 0 0 0 0 rgba(232,101,10, 0); }
        }
      `}</style>
    </section>
  );
};

export default MarqueeClients;
