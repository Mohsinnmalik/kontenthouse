import { motion } from "framer-motion";

export const EASE = [0.76, 0, 0.24, 1];

/** On-load masked line reveal */
export function MaskedLine({ children, delay = 0, loaded = true, className = "" }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "112%" }}
        animate={loaded ? { y: "0%" } : { y: "112%" }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Scroll-triggered masked line reveal */
export function ScrollLine({ children, delay = 0, className = "" }) {
  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.span
        className="block will-change-transform"
        variants={{
          hidden: { y: "112%" },
          show: { y: "0%", transition: { duration: 0.9, ease: EASE, delay } },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Simple fade-up reveal */
export function FadeUp({ children, delay = 0, className = "", y = 32 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

