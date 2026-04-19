import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSectionMotion } from '../hooks/useSectionMotion';
import { Github, Linkedin, Twitter, Instagram, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../lib/site';

const Footer: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const socialLinks = [
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: SOCIAL_LINKS.x, label: 'Twitter / X' },
    { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
  ].filter((s) => Boolean(s.href));

  const columns = [
    {
      title: 'Company',
      links: [
        { name: 'About', to: '/#about' as const },
        { name: 'Services', to: '/#services' as const },
        { name: 'Industries', to: '/#industries' as const },
        { name: 'Portfolio', to: '/#portfolio' as const },
      ],
    },
    {
      title: 'Work',
      links: [
        { name: 'Testimonials', to: '/#testimonials' as const },
        { name: 'Process', to: '/#process' as const },
        { name: 'FAQ', to: '/#faq' as const },
        { name: 'Contact', to: '/#contact' as const },
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
    setSubmitted(true);
    setEmail('');
  };

  return (
    <motion.footer
      className="border-t border-white/8 bg-ink text-white"
      {...sectionProps}
    >
      {/* CTA band */}
      <div className="border-b border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Ready to build?</p>
            <p className="mt-1.5 text-xl font-semibold text-white">Start with a free consultation</p>
          </div>
          <Link
            to={{ pathname: '/', hash: '#contact' }}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow"
          >
            Book a call <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand col */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block" aria-label="SKIZEN home">
              <span className="text-2xl font-bold tracking-tight text-white">SKIZEN</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-[1.7] text-white/45">
              A software engineering company and technology partner in Hyderabad, India—
              building web applications, enterprise systems, and automation.
            </p>

            {/* Newsletter */}
            {submitted ? (
              <p className="mt-6 text-sm font-medium text-brand">Thanks! We'll be in touch.</p>
            ) : (
              <form onSubmit={onNewsletter} className="mt-6 flex max-w-sm gap-2">
                <label htmlFor="footer-email" className="sr-only">Email for newsletter</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email"
                  required
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-brand focus:ring-1 focus:ring-brand"
                />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            {/* Socials */}
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/40 transition-all hover:border-brand/50 hover:text-brand"
                  >
                    <s.icon size={16} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/30">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.to}
                        className="text-sm text-white/50 transition-colors hover:text-white"
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

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-[0.78rem] text-white/30 md:flex-row">
          <p>© {new Date().getFullYear()} SKIZEN Private Limited. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="transition-colors hover:text-white/70">Privacy</Link>
            <Link to="/terms" className="transition-colors hover:text-white/70">Terms</Link>
            <a
              href="mailto:hello@skizen.in"
              className="inline-flex items-center gap-1 transition-colors hover:text-white/70"
            >
              info@skizen.in <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
