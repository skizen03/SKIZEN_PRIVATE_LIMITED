import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  MapPin,
  Store,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
  Share2,
  BarChart3,
  Search,
  Tag,
  Mail,
  Users,
  MessageSquare,
  StickyNote,
  Zap,
  Calendar,
  Palette,
  ShoppingBag,
  Globe,
  LineChart,
} from 'lucide-react';

/** Simplified Google Ads–style mark (monochrome; not an official logo) */
const IconGoogleAds: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 2l2.2 6.2h6.5l-5.3 3.8 2 6.5L12 15.4 6.6 18.5l2-6.5L3.3 8.2h6.5L12 2z" opacity={0.85} />
  </svg>
);

type ToolItem = {
  label: string;
  Icon: LucideIcon | React.FC<{ className?: string }>;
};

const tools: ToolItem[] = [
  { label: 'Google Ads', Icon: IconGoogleAds },
  { label: 'Google Business Profile', Icon: Store },
  { label: 'Google Maps', Icon: MapPin },
  { label: 'Google Analytics', Icon: BarChart3 },
  { label: 'Search Console', Icon: Search },
  { label: 'Tag Manager', Icon: Tag },
  { label: 'Instagram', Icon: Instagram },
  { label: 'Facebook', Icon: Facebook },
  { label: 'YouTube', Icon: Youtube },
  { label: 'LinkedIn', Icon: Linkedin },
  { label: 'WhatsApp Business', Icon: MessageCircle },
  { label: 'Meta Business Suite', Icon: Share2 },
  { label: 'Email & automation', Icon: Mail },
  { label: 'CRM & pipelines', Icon: Users },
  { label: 'Slack', Icon: MessageSquare },
  { label: 'Notion', Icon: StickyNote },
  { label: 'Zapier & workflows', Icon: Zap },
  { label: 'Scheduling', Icon: Calendar },
  { label: 'Creative & brand', Icon: Palette },
  { label: 'E-commerce', Icon: ShoppingBag },
  { label: 'Looker Studio', Icon: LineChart },
  { label: 'Google Workspace', Icon: Globe },
];

const clients = [
  'Kasam',
  'St Anns Hospital',
  'St Anns Jr College',
  'Marluce Bakers',
  'Pista House',
];

function MarqueeSegment({ suffix }: { suffix: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-4 md:gap-5 md:px-6">
      {tools.map((item) => {
        const Icon = item.Icon;
        return (
          <div
            key={`${suffix}-${item.label}`}
            className="inline-flex items-center gap-2 rounded-full border border-zen-line bg-ski-gray/50 py-2 pl-2.5 pr-4 shadow-sm md:gap-2.5 md:pl-3 md:pr-5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zen-line bg-white text-ski-accent">
              {item.label === 'Google Ads' ? (
                <IconGoogleAds className="h-4 w-4" />
              ) : (
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              )}
            </span>
            <span className="whitespace-nowrap text-xs font-semibold text-ski-black md:text-sm">
              {item.label}
            </span>
          </div>
        );
      })}
      <span className="mx-2 hidden h-4 w-px bg-zen-line sm:block" aria-hidden />
      <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-zen-muted md:text-xs">
        Trusted by
      </span>
      {clients.map((name) => (
        <span
          key={`${suffix}-${name}`}
          className="whitespace-nowrap text-xs font-medium text-zen-muted md:text-sm"
        >
          {name}
        </span>
      ))}
    </div>
  );
}

const MarqueeClients: React.FC = () => {
  return (
    <section className="border-y border-zen-line bg-white py-3 md:py-4" aria-label="Platforms and client names">
      <div className="relative overflow-hidden">
        {/* Edge fade for premium marquee */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent md:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent md:w-24"
          aria-hidden
        />

        <div
          className="flex w-max motion-reduce:animate-none animate-marquee"
          style={{ animationDuration: '70s' }}
          aria-hidden
        >
          <MarqueeSegment suffix="a" />
          <MarqueeSegment suffix="b" />
        </div>
      </div>
    </section>
  );
};

export default MarqueeClients;
