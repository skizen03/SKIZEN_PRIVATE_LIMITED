import React, { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'hover' | 'link';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const pos = useRef({ x: -100, y: -100 });
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on pointer:fine devices
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, [role="link"]')) {
        setState('link');
      } else if (target.closest('button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
        setState('hover');
      } else {
        setState('default');
      }
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(calc(${pos.current.x}px - 50%), calc(${pos.current.y}px - 50%))`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  return (
    <div
      ref={dotRef}
      className={`cursor-dot cursor-dot--${state}`}
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}
      aria-hidden
    >
      <div className="cursor-dot__inner" />
    </div>
  );
};

export default CustomCursor;