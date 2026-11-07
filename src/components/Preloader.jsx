import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/anim";
import Logo from "./Logo";

const WORD = "KONTENTHOUSE";

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const dur = 1400;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExit(true), 300);
        setTimeout(onDone, 1050);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-8 md:px-12 md:py-10"
      initial={{ y: 0 }}
      animate={exit ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      <div className="flex items-center justify-between font-mono2 text-[11px] uppercase tracking-[0.3em] text-smoke">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-acid animate-ping" />
          Social Media Agency
        </span>
        <span className="hidden sm:block">MUMBAI ↔ DUBAI</span>
      </div>

      <div className="flex flex-col items-center gap-6">
        <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <Logo size={64} />
        </motion.div>
        <h1 className="flex overflow-hidden font-display text-[7.5vw] font-extrabold leading-none tracking-tight text-bone sm:text-5xl md:text-7xl">
          {WORD.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.045 }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>
        <p className="font-mono2 text-xs uppercase tracking-[0.35em] text-acid/80">
          Where brands move in
        </p>
      </div>

      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-smoke">
            Opening the house
          </p>
          <p className="text-[10px] font-mono2 text-smoke/50 uppercase tracking-widest">
            Loading interactive experience...
          </p>
        </div>
        <span className="font-display text-6xl font-extrabold text-acid md:text-8xl">
          {count}
          <span className="text-3xl text-smoke/50 font-normal">%</span>
        </span>
      </div>
    </motion.div>
  );
}

