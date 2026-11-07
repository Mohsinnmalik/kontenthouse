import { Suspense, lazy, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MaskedLine } from "@/lib/anim";
import { useLenis, scrollToTarget } from "@/lib/lenis";

const Scene3D = lazy(() => import("./Scene3D"));

export default function Hero({ loaded }) {
  const ref = useRef(null);
  const lenisRef = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacityText = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scaleCanvas = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const yCanvas = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-16 pt-32 md:px-12"
    >
      {/* 3D WebGL Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-70 md:left-auto md:right-[-8%] md:w-[65%] md:opacity-100"
        style={{ scale: scaleCanvas, y: yCanvas }}
      >
        {loaded && (
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        )}
      </motion.div>

      {/* Atmospheric Glow Blurs */}
      <div className="pointer-events-none absolute -right-32 top-1/4 z-0 h-[36rem] w-[36rem] rounded-full bg-acid/10 blur-[150px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 z-0 h-[28rem] w-[28rem] rounded-full bg-amber2/10 blur-[130px]" />

      <motion.div className="relative z-10" style={{ y: yText, opacity: opacityText }}>
        <MaskedLine loaded={loaded} delay={0.05}>
          <p className="mb-6 flex items-center gap-3 font-mono2 text-[11px] uppercase tracking-[0.3em] text-acid md:text-xs">
            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-acid shadow-[0_0_12px_#D4FF00]" />
            Social Media Marketing &amp; Management Agency
          </p>
        </MaskedLine>

        <h1 className="font-display font-extrabold uppercase leading-[0.92] tracking-tight text-bone text-[13vw] sm:text-[11vw] lg:text-[8.2vw]">
          <MaskedLine loaded={loaded} delay={0.15}>Your brand</MaskedLine>
          <MaskedLine loaded={loaded} delay={0.28}>
            <span className="flex items-center gap-[0.22em]">
              lives
              <span className="font-serifac normal-case italic text-acid">here.</span>
            </span>
          </MaskedLine>
        </h1>

        <MaskedLine loaded={loaded} delay={0.45}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-smoke md:max-w-xl md:text-lg">
            KontentHouse designs, shoots and scales social content that turns
            idle scrollers into loyal customers. Welcome to the house your
            feed has been waiting for.
          </p>
        </MaskedLine>

        <MaskedLine loaded={loaded} delay={0.58}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToTarget(lenisRef, "#contact"); }}
              className="group flex items-center gap-2 rounded-full bg-acid px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-ink transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(212,255,0,0.45)]"
            >
              Start a project
              <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:rotate-45" />
            </a>
            <a
              href="#residents"
              onClick={(e) => { e.preventDefault(); scrollToTarget(lenisRef, "#residents"); }}
              className="rounded-full border border-white/20 px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-bone transition-all duration-300 hover:border-acid hover:text-acid hover:bg-white/[0.03]"
            >
              Meet the residents
            </a>
            <a
              href="#showcase"
              onClick={(e) => { e.preventDefault(); scrollToTarget(lenisRef, "#showcase"); }}
              className="hidden sm:flex items-center gap-2 font-mono2 text-xs uppercase tracking-[0.2em] text-smoke hover:text-acid transition-colors px-4 py-3"
            >
              View Reel Reel Vault →
            </a>
          </div>
        </MaskedLine>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-6 right-6 z-10 flex items-center justify-between md:left-12 md:right-12"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-smoke">
          Mumbai ↔ Dubai
        </span>
        <button
          onClick={() => scrollToTarget(lenisRef, "#house")}
          className="group flex items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.3em] text-smoke transition-colors hover:text-acid"
        >
          Scroll to enter
          <ArrowDown size={14} className="animate-bounce text-acid" />
        </button>
        <span className="hidden font-mono2 text-[11px] uppercase tracking-[0.3em] text-smoke sm:block">
          Est. in the feed
        </span>
      </motion.div>
    </section>
  );
}

