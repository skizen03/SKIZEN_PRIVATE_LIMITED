import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSectionMotion } from '../hooks/useSectionMotion';
import { Github, Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [email, setEmail] = useState('');

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  const columns = [
    {
      title: 'Company',
      links: [
        { name: 'About', to: '/#about' as const },
        { name: 'Services', to: '/#services' as const },
        { name: 'Industries', to: '/#industries' as const },
        { name: 'Clients', to: '/#clients' as const },
      ],
    },
    {
      title: 'Work',
      links: [
        { name: 'Portfolio', to: '/#portfolio' as const },
        { name: 'Testimonials', to: '/#testimonials' as const },
        { name: 'Process', to: '/#process' as const },
        { name: 'FAQ', to: '/#faq' as const },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { name: 'Custom software development', to: '/#services' as const },
        { name: 'Full stack applications', to: '/#services' as const },
        { name: 'ERP & CRM systems', to: '/#services' as const },
        { name: 'Hospital & education portals', to: '/#services' as const },
      ],
    },
  ];

  const onNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <motion.footer
      className="border-t border-white/10 bg-ski-black text-white"
      {...sectionProps}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block text-2xl font-bold">
              SKIZEN
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              SKIZEN is a software and technology company in Hyderabad, India—we build web applications, enterprise
              systems, and automation, with optional growth support from the same team.
            </p>
            <form onSubmit={onNewsletter} className="mt-6 flex max-w-sm flex-col gap-2 sm:flex-row">
              <label htmlFor="footer-email" className="sr-only">
                Email for newsletter
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-ski-accent focus:ring-1 focus:ring-ski-accent"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1 rounded-lg bg-ski-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ski-black"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 transition-colors hover:border-ski-accent hover:text-ski-accent"
                >
                  <s.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.to}
                        className="text-sm text-white/70 transition-colors hover:text-ski-accent"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} SKIZEN. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link to="/#contact" className="text-ski-accent hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
