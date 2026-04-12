export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUpProps = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: easeOut },
};
