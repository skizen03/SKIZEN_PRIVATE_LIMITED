import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLenis } from 'lenis/react';

type LegalPageLayoutProps = {
  title: string;
  intro?: string;
  children: React.ReactNode;
};

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, intro, children }) => {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [lenis]);

  return (
    <div className="border-b border-zen-line bg-white pb-20 pt-28 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-ski-accent transition-colors hover:text-ski-black"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
          Back to home
        </Link>

        <header className="border-b border-zen-line pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-ski-black md:text-4xl">{title}</h1>
          {intro ? <p className="mt-4 text-sm text-zen-muted md:text-base">{intro}</p> : null}
        </header>

        <article className="legal-prose mt-10 space-y-8 text-sm leading-relaxed text-ski-black md:text-base">
          {children}
        </article>
      </div>
    </div>
  );
};

export default LegalPageLayout;
