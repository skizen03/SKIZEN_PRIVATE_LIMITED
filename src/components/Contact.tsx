import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Linkedin, Twitter } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { CONTACT_EMAIL, CONTACT_FORM_ENDPOINT, SOCIAL_LINKS } from '../lib/site';
import { SectionWordTitle } from './typography/WordMotion';

import { useSectionMotion, interactiveCardProps } from '../hooks/useSectionMotion';

const WHATSAPP_HREF =
  'https://wa.me/916305680890?text=' +
  encodeURIComponent('Hello SKIZEN, I would like to discuss a project with you.');

const Contact: React.FC = () => {
  const { sectionProps } = useSectionMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          message: formData.message.trim(),
          _subject: 'SKIZEN — New message from website',
          _captcha: false,
        }),
      });
      const data = (await res.json()) as { success?: boolean | string; message?: string };
      const ok = data.success === true || data.success === 'true';
      if (!res.ok || !ok) {
        throw new Error(data.message || 'Request failed');
      }
      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5200);
    } catch {
      setSubmitError(`Could not send. Email us at ${CONTACT_EMAIL}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, title: 'Email', value: CONTACT_EMAIL, link: `mailto:${CONTACT_EMAIL}` },
    { icon: Phone, title: 'Phone', value: '+91 63056 80890', link: 'tel:+916305680890' },
    { icon: MapPin, title: 'Head office', value: 'Hyderabad, India', link: '#contact' },
  ];

  const socials = [
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: SOCIAL_LINKS.x, label: 'Twitter / X' },
  ].filter((s) => Boolean(s.href));

  return (
    <motion.section
      id="contact"
      className="scroll-mt-header border-t border-zen-line bg-white py-20 md:py-24 lg:py-28"
      {...sectionProps}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start"
        >
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <SectionWordTitle
              className="text-3xl font-semibold tracking-tight text-ski-black md:text-4xl lg:text-5xl"
              text="Let's build something powerful together"
            />
            <p className="mt-4 text-base leading-relaxed text-zen-muted md:text-lg">
              Share goals for <strong className="font-semibold text-ski-black">business automation</strong>,{' '}
              <strong className="font-semibold text-ski-black">full stack development</strong>, or product roadmap
              support. We respond within one business day.
            </p>
          </div>
          
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zen-muted">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-zen-line bg-white px-4 py-3 text-sm text-ski-black outline-none transition-shadow duration-200 placeholder:text-neutral-400 focus:border-ski-accent focus:ring-2 focus:ring-ski-accent/20"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zen-muted">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-zen-line bg-white px-4 py-3 text-sm text-ski-black outline-none transition-shadow duration-200 placeholder:text-neutral-400 focus:border-ski-accent focus:ring-2 focus:ring-ski-accent/20"
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zen-muted">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zen-line bg-white px-4 py-3 text-sm text-ski-black outline-none transition-shadow duration-200 placeholder:text-neutral-400 focus:border-ski-accent focus:ring-2 focus:ring-ski-accent/20"
                  placeholder="Organization"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zen-muted">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-lg border border-zen-line bg-white px-4 py-3 text-sm text-ski-black outline-none transition-shadow duration-200 placeholder:text-neutral-400 focus:border-ski-accent focus:ring-2 focus:ring-ski-accent/20"
                  placeholder="Project scope, timeline, and links…"
                />
              </div>
              {submitError ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                  {submitError}
                </p>
              ) : null}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.99 }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-ski-black py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-ski-accent disabled:opacity-60"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={18} />
                    Sent — we&apos;ll be in touch
                  </>
                ) : isSubmitting ? (
                  <>Sending…</>
                ) : (
                  <>
                    <Send size={18} />
                    Send message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: easeOut }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-xl border border-zen-line bg-ski-gray/40 p-6">
              <h3 className="text-sm font-semibold text-ski-black">Direct channels</h3>
              <p className="mt-2 text-sm text-zen-muted">
                Prefer chat? Reach us on WhatsApp for quick questions or to book a consultation.
              </p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zen-line bg-white py-3 text-sm font-semibold text-ski-black transition-colors duration-300 hover:border-ski-accent hover:text-ski-accent sm:w-auto sm:px-6"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" strokeWidth={2} />
                WhatsApp SKIZEN
              </a>
            </div>

            <div className="space-y-3">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  {...interactiveCardProps}
                  className="flex items-center gap-4 rounded-xl border border-zen-line bg-white p-4 transition-shadow duration-300 hover:shadow-card"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-zen-line bg-ski-gray/40">
                    <info.icon className="h-5 w-5 text-ski-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-zen-muted">{info.title}</p>
                    <p className="text-sm font-medium text-ski-black">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {socials.length ? (
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-zen-line text-zen-muted transition-colors hover:border-ski-accent hover:text-ski-accent"
                    aria-label={s.label}
                  >
                    <s.icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            ) : null}

            
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
