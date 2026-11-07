import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useLenis, scrollToTarget } from "@/lib/lenis";
import { EASE } from "@/lib/anim";
import Logo from "./Logo";

const LINKS = [
  { label: "The House", href: "#house", id: "house" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Showcase", href: "#showcase", id: "showcase" },
  { label: "Residents", href: "#residents", id: "residents" },
  { label: "Blueprint", href: "#process", id: "process" },
];

export default function Nav({ loaded }) {
  const [open, setOpen] = useState(false);
  const lenisRef = useLenis();

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToTarget(lenisRef, href), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur-xl"
        initial={{ y: -80, opacity: 0 }}
        animate={loaded ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      >
        <nav className="flex items-center justify-between px-6 py-4 md:px-12">
          <a
            href="#top"
            className="flex items-center gap-3 group"
            onClick={(e) => go(e, "#top")}
          >
            <Logo size={34} />
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-bone transition-colors group-hover:text-acid">
                KontentHouse
              </span>
              <span className="font-mono2 text-[9px] uppercase tracking-widest text-smoke">
                Agency
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="group relative font-mono2 text-[11px] uppercase tracking-[0.25em] text-smoke transition-colors hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-acid transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="group hidden items-center gap-2 rounded-full bg-acid px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-ink transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,255,0,0.4)] sm:flex"
            >
              Start a project
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:rotate-45" />
            </a>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-bone hover:border-acid hover:text-acid transition-colors lg:hidden"
            >
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-4 bg-current rounded-full" />
                <span className="h-0.5 w-4 bg-current rounded-full" />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-2xl px-6 py-6"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo size={34} />
                <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-bone">
                  KontentHouse
                </span>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-bone hover:border-acid hover:text-acid transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-16 flex flex-col gap-2">
              {[...LINKS, { label: "Contact", href: "#contact", id: "contact" }].map((l, i) => (
                <a
                  key={l.id}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="border-b border-white/10 pb-4 font-display text-4xl font-extrabold uppercase text-bone hover:text-acid transition-colors"
                >
                  <motion.span
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: EASE }}
                  >
                    {l.label}
                    <ArrowUpRight className="text-acid" size={26} />
                  </motion.span>
                </a>
              ))}
            </div>
            <div className="mt-auto space-y-2 border-t border-white/10 pt-6">
              <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-acid">
                Mumbai ↔ Dubai
              </p>
              <p className="font-mono2 text-[10px] uppercase tracking-widest text-smoke">
                Social media marketing &amp; management agency
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

