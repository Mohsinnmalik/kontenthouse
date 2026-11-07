import { ArrowUp } from "lucide-react";
import { useLenis, scrollToTarget } from "@/lib/lenis";
import { FadeUp } from "@/lib/anim";
import Logo from "./Logo";

export default function Footer() {
  const lenisRef = useLenis();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-6 pb-10 pt-20 md:px-12 bg-ink text-bone">
      <div className="flex flex-wrap items-start justify-between gap-10">
        <div className="flex items-center gap-3">
          <Logo size={42} />
          <div>
            <p className="font-display text-base font-bold uppercase tracking-[0.2em] text-bone">
              KontentHouse
            </p>
            <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-smoke">
              Social Media Marketing &amp; Management Agency
            </p>
          </div>
        </div>

        <div className="flex gap-12 font-mono2 text-[11px] uppercase tracking-[0.25em]">
          <div className="flex flex-col gap-2.5">
            <span className="text-smoke">Navigation</span>
            {[
              ["The House", "#house"],
              ["Services", "#services"],
              ["Showcase", "#showcase"],
              ["Residents", "#residents"],
              ["Blueprint", "#process"],
              ["Contact", "#contact"],
            ].map(([l, h]) => (
              <a
                key={h}
                href={h}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(lenisRef, h);
                }}
                className="text-bone/80 transition-colors hover:text-acid"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-smoke">Network</span>
            {[
              ["Instagram", "https://www.instagram.com/kontent.housee?xtok=OW5rcWZqdG4wNGlq&utm_source=qr"],
              ["LinkedIn", "https://linkedin.com/company/kontenthouse"],
              ["X (Twitter)", "https://x.com/kontenthouse"],
              ["YouTube", "https://youtube.com/@kontenthouse"],
            ].map(([l, h]) => (
              <a
                key={l}
                href={h}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone/80 transition-colors hover:text-acid"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollToTarget(lenisRef, 0)}
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-bone transition-all duration-300 hover:border-acid hover:bg-acid hover:text-ink hover:scale-110 shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp size={22} className="transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      </div>

      {/* Heroic Outline Wordmark */}
      <FadeUp y={60} className="mt-20">
        <h2
          onClick={() => scrollToTarget(lenisRef, 0)}
          className="select-none whitespace-nowrap text-center font-display text-[12vw] font-extrabold uppercase leading-none tracking-tight text-outline transition-all duration-700 hover:text-acid hover:[-webkit-text-stroke:0px] cursor-pointer drop-shadow-2xl"
        >
          Kontenthouse
        </h2>
      </FadeUp>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono2 text-[10px] uppercase tracking-[0.25em] text-smoke">
        <span>© {new Date().getFullYear()} KontentHouse Agency. All rooms reserved.</span>
        <span className="text-acid">Mumbai ↔ Dubai — Made in the feed</span>
      </div>
    </footer>
  );
}

