import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Services', id: 'services' },
  { name: 'Industries', id: 'industries' },
  { name: 'Clients', id: 'clients' },
  { name: 'Portfolio', id: 'portfolio' },
  { name: 'Contact', id: 'contact' },
] as const;

function navTo(item: (typeof navItems)[number]) {
  if (item.id === 'home') return '/';
  return { pathname: '/', hash: `#${item.id}` } as const;
}

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('home');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
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
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
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

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        isScrolled
          ? 'border-zen-line/80 bg-white/80 shadow-sm backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-white/70 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center" aria-label="SKIZEN home">
          <img src="/logo.svg" alt="SKIZEN" className="h-28 w-auto" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={navTo(item)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/' && activeId === item.id
                  ? 'text-ski-accent'
                  : 'text-ski-black/80 hover:text-ski-accent'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Link
            to={{ pathname: '/', hash: '#contact' }}
            className="inline-flex items-center rounded-lg bg-ski-black px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-ski-accent"
          >
            Book a consultation
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((o) => !o)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-zen-line text-ski-black lg:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-zen-line bg-white/95 backdrop-blur-lg lg:hidden"
          >
            <nav className="flex flex-col px-6 py-4" aria-label="Mobile primary">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={navTo(item)}
                  onClick={() => setIsMenuOpen(false)}
                  className={`border-b border-zen-line/60 py-3 text-sm font-medium ${
                    location.pathname === '/' && activeId === item.id ? 'text-ski-accent' : 'text-ski-black'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to={{ pathname: '/', hash: '#contact' }}
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-ski-black py-3 text-sm font-semibold text-white"
              >
                Book a consultation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
