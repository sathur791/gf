/** Shared Framer Motion presets for consistent cinematic feel */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_SOFT = [0.45, 0, 0.55, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, filter: 'blur(4px)' },
};

export const fadeUpTransition = (delay = 0, duration = 0.8) => ({
  duration,
  delay,
  ease: EASE_OUT_EXPO,
});

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export const scaleReveal = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.7, ease: EASE_OUT_EXPO },
};

export const letterStagger = (index: number, baseDelay = 0) => ({
  initial: { opacity: 0, y: 8, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.45, delay: baseDelay + index * 0.035, ease: EASE_OUT_EXPO },
});
