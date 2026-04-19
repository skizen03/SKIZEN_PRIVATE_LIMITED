import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import Hero from '../components/Hero';
import MarqueeClients from '../components/MarqueeClients';
import SectionDivider from '../components/SectionDivider';
import About from '../components/About';
import Services from '../components/Services';
import Industries from '../components/Industries';
import Clients from '../components/Clients';
import Portfolio from '../components/Portfolio';
import WhyChoose from '../components/WhyChoose';
import Testimonials from '../components/Testimonials';
import Process from '../components/Process';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import { LENIS_ANCHOR_OFFSET } from '../providers/SmoothScrollRoot';

const HomePage: React.FC = () => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const raw = location.hash?.replace(/^#/, '') ?? '';
    if (!raw || !lenis) return;
    const id = decodeURIComponent(raw);
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        lenis.scrollTo(el, { offset: LENIS_ANCHOR_OFFSET, duration: 1.05 });
      }
    };
    const t = window.setTimeout(scroll, 80);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash, lenis]);

  return (
    <>
      <Hero />

      <SectionDivider />
      <About />
      <Services />
      <Industries />
      <Clients />
      <Portfolio />
      <WhyChoose />
      <Testimonials />
      <Process />
      <FAQ />
      <Contact />
    </>
  );
};

export default HomePage;
