import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Services', id: 'services' },
  { name: 'Industries', id: 'industries' },
  { name: 'Portfolio', id: 'portfolio' },
  { name: 'Process', id: 'process' },
  { name: 'Contact', id: 'contact' },
] as const;

function navTo(item: (typeof navItems)[number]) {
  return { pathname: '/', hash: `#${item.id}` } as const;
}

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('home');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const ids = navItems.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -55% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-[#E5E2DE]/70 bg-[#FAFAF8]/85 shadow-sm backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-6 px-5 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2" aria-label="SKIZEN home">
          <img src="/logo.svg" alt="SKIZEN" width={140} height={112} className="h-28 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = location.pathname === '/' && activeId === item.id;
            return (
              <Link
                key={item.id}
                to={navTo(item)}
                className={`relative rounded-md px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-brand'
                    : 'text-ink/65 hover:text-ink'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-brand"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 lg:block">
          <Link
            to={{ pathname: '/', hash: '#contact' }}
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-[0.8125rem] font-semibold text-off-white transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-brand hover:shadow-glow"
          >
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((o) => !o)}
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-lg border border-[#E5E2DE] bg-white text-ink transition-all active:scale-95 select-none hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 lg:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMenuOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={18} strokeWidth={2} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={18} strokeWidth={2} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overscroll-contain overflow-hidden border-t border-[#E5E2DE]/70 bg-[#FAFAF8]/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col px-5 pb-6 pt-2" aria-label="Mobile primary">
              {navItems.map((item, i) => {
                const isActive = location.pathname === '/' && activeId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      to={navTo(item)}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center border-b border-[#E5E2DE]/60 py-3.5 text-sm font-medium transition-colors ${
                        isActive ? 'text-brand' : 'text-ink'
                      }`}
                    >
                      {item.name}
                      {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand" />}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                className="mt-5"
              >
                <Link
                  to={{ pathname: '/', hash: '#contact' }}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-ink py-3.5 text-sm font-semibold text-off-white transition-colors hover:bg-brand"
                >
                  Get started →
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
