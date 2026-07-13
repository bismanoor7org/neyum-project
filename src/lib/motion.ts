/** Site-wide motion tokens — luxury easing, scroll reveals, stagger */
export const siteEase = [0.22, 1, 0.36, 1] as const;

export const siteReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: siteEase },
  },
};

export const siteRevealScale = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.78, ease: siteEase },
  },
};

export const siteStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const siteStaggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: siteEase },
  },
};

/** @deprecated use siteReveal — kept for home imports */
export const homeEase = siteEase;
export const homeReveal = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: siteEase },
  }),
};
export const homeRevealScale = siteRevealScale;
export const homeStagger = siteStagger;
export const homeStaggerItem = siteStaggerItem;
