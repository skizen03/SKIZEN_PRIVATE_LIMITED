import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { LENIS_ANCHOR_OFFSET } from './SmoothScrollRoot';

/**
 * Smooth scroll for same-page hash links. Section links that use `/#id` are handled by React Router + HomePage.
 */
export function LenisAnchorHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const scrollToId = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      lenis.scrollTo(el, {
        offset: LENIS_ANCHOR_OFFSET,
        duration: 1.05,
      });
    };

    const onClickCapture = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const id = href.slice(1);
      if (!id) return;
      if (!document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
      window.history.pushState(null, '', href);
    };

    document.addEventListener('click', onClickCapture, true);

    const hash = window.location.hash;
    if (hash.length > 1) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => scrollToId(id));
    }

    return () => document.removeEventListener('click', onClickCapture, true);
  }, [lenis]);

  return null;
}
