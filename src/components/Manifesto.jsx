import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollLine, FadeUp } from "@/lib/anim";
import { CheckCircle2, Sparkles } from "lucide-react";

const IMG_STUDIO =
  "https://images.unsplash.com/photo-1664277497095-424e085175e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxjb250ZW50JTIwY3JlYXRvciUyMGZpbG1pbmclMjB2aWRlbyUyMHN0dWRpb3xlbnwwfHx8fDE3OTQwNTU3MDh8MA&ixlib=rb-4.1.0&q=85";
const IMG_PHONE =
  "https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxzbWFydHBob25lJTIwc29jaWFsJTIwbWVkaWElMjBuZW9uJTIwZGFya3xlbnwwfHx8fDE3OTQwNTU3MDh8MA&ixlib=rb-4.1.0&q=85";

export default function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [140, -90]);

  return (
    <section id="house" ref={ref} className="relative px-6 pb-24 pt-24 md:px-12 md:pb-32 md:pt-32 text-ink">
      <div className="mb-14 flex items-center justify-between">
        <FadeUp>
          <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-ink/60">
            01 — Agency Philosophy &amp; DNA
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="hidden font-mono2 text-[11px] uppercase tracking-[0.3em] text-ink/60 md:block">
            Beyond Conventional Social Media
          </p>
        </FadeUp>
      </div>

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-[3.6rem]">
            <ScrollLine>We don&apos;t just</ScrollLine>
            <ScrollLine delay={0.08}>
              create <span className="font-serifac normal-case italic">content.</span>
            </ScrollLine>
            <ScrollLine delay={0.16}>
              We build <span className="text-outline-dark">brands</span>
            </ScrollLine>
            <ScrollLine delay={0.24}>
              that <span className="font-serifac normal-case italic">scale revenue.</span>
            </ScrollLine>
          </h2>

          <FadeUp delay={0.2} className="mt-10 max-w-lg space-y-5">
            <p className="text-base leading-relaxed text-ink/80 md:text-lg">
              Our approach goes far beyond conventional social media management.
              We combine creative production, strategic content planning, performance marketing,
              founder-led branding, and digital solutions to help businesses establish an unshakeable market presence.
            </p>
            <p className="text-base leading-relaxed text-ink/80 md:text-lg">
              We don&apos;t believe in creating content just for vanity views and aesthetics.
              We first dissect the business, its audience, revenue sources, market positioning,
              and growth objectives — engineering creative content that serves concrete business goals.
            </p>
          </FadeUp>

          {/* Capabilities Grid */}
          <FadeUp delay={0.25} className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
            {[
              "Revenue-Linked Strategy",
              "Founder-Led Branding",
              "Cinematic Video Production",
              "Performance Meta Ads",
              "AI Integration & Automation",
              "White-Label Backend Support",
            ].map((pillar) => (
              <div key={pillar} className="flex items-center gap-2 text-xs font-mono2 uppercase tracking-wider text-ink/80">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                <span>{pillar}</span>
              </div>
            ))}
          </FadeUp>

          <FadeUp delay={0.3} className="mt-10 flex flex-wrap gap-3">
            {["Strategy-first", "Studio-grade", "Always-on", "Algorithm-proof"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-ink/25 px-4 py-2 font-mono2 text-[11px] uppercase tracking-[0.2em] text-ink/75 hover:bg-ink hover:text-bone transition-colors duration-300"
              >
                {chip}
              </span>
            ))}
          </FadeUp>
        </div>

        <div className="relative hidden min-h-[560px] lg:block">
          <motion.figure
            className="absolute right-0 top-0 w-[72%] overflow-hidden rounded-2xl shadow-2xl border border-ink/10"
            style={{ y: yA }}
          >
            <img src={IMG_STUDIO} alt="Content shoot in a creator studio" className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105" />
            <figcaption className="bg-ink px-4 py-2.5 font-mono2 text-[10px] uppercase tracking-[0.25em] text-bone/90 flex items-center justify-between">
              <span>On set — production day</span>
              <span className="text-acid">Studio Grade</span>
            </figcaption>
          </motion.figure>
          <motion.figure
            className="absolute bottom-0 left-0 w-[48%] overflow-hidden rounded-2xl shadow-2xl border border-ink/10"
            style={{ y: yB }}
          >
            <img src={IMG_PHONE} alt="Social media apps on a phone in neon light" className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105" />
            <figcaption className="bg-ink px-4 py-2.5 font-mono2 text-[10px] uppercase tracking-[0.25em] text-bone/90 flex items-center justify-between">
              <span>Where brands convert</span>
              <span className="text-acid">Feed Ready</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>

      {/* Mobile collage */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:hidden">
        <img src={IMG_STUDIO} alt="Content shoot in a creator studio" className="aspect-square w-full rounded-xl object-cover shadow-lg" />
        <img src={IMG_PHONE} alt="Social media apps on a phone" className="aspect-square w-full rounded-xl object-cover shadow-lg" />
      </div>
    </section>
  );
}
