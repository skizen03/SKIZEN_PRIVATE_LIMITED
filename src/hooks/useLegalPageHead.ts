import { useLayoutEffect } from 'react';
import { SITE_ORIGIN, SITE_NAME } from '../lib/site';

type Options = {
  title: string;
  description: string;
  canonicalPath: '/privacy' | '/terms';
};

/**
 * Updates document title, meta description, and canonical for legal routes; restores on unmount.
 */
export function useLegalPageHead({ title, description, canonicalPath }: Options) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;

  useLayoutEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? null;
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const prevCanonical = canonical?.href ?? null;

    document.title = fullTitle;
    if (meta) meta.setAttribute('content', description);
    if (canonical) canonical.href = canonicalUrl;

    return () => {
      document.title = prevTitle;
      if (meta && prevDesc !== null) meta.setAttribute('content', prevDesc);
      if (canonical && prevCanonical !== null) canonical.href = prevCanonical;
    };
  }, [fullTitle, description, canonicalUrl]);
}
