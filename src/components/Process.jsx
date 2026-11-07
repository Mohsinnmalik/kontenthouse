import { FadeUp } from "@/lib/anim";

const STEPS = [
  {
    n: "01",
    title: "Decode",
    desc: "We audit your existing presence, profile your highest-LTV audience segments, and pinpoint exactly what your category competitors are failing to deliver on the feed.",
    chips: ["Presence Audit", "Audience Map", "Competitor Teardown"],
  },
  {
    n: "02",
    title: "Design",
    desc: "Strategy meets editorial aesthetics — monthly content pillars, distinct visual typography, sound trends, and frame-by-frame scripts are finalized before a single camera powers on.",
    chips: ["Core Pillars", "Visual Identity", "Scripts & Hooks"],
  },
  {
    n: "03",
    title: "Shoot",
    desc: "Full studio-grade production days on location. Cinema cameras, high-output lighting, and 4K macro b-roll captured in concentrated batches that feed your calendar for 30+ days.",
    chips: ["Batch Production", "4K 60FPS", "Macro B-Roll"],
  },
  {
    n: "04",
    title: "Scale",
    desc: "Precision daily publishing, targeted Meta & Google ad amplification, and continuous attribution reviews — we double down on the creative angles generating pipeline revenue.",
    chips: ["Multi-Channel", "Paid Boost", "Iterative Loops"],
  },
];

export default function Process() {
  return (
    <section id="process" className="relative px-6 py-24 md:px-12 md:py-32 bg-ink text-bone">
      <div className="mb-16">
        <FadeUp>
          <p className="mb-4 font-mono2 text-[11px] uppercase tracking-[0.3em] text-acid">
            04 — The Blueprint
          </p>
        </FadeUp>
        <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-bone md:text-6xl">
          <FadeUp y={40}>How a brand</FadeUp>
          <FadeUp y={40} delay={0.08}>
            <span className="font-serifac normal-case italic text-acid">moves in</span>
          </FadeUp>
        </h2>
      </div>

      <div className="relative">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className="sticky mb-6"
            style={{ top: `calc(5.5rem + ${i * 18}px)`, zIndex: i + 1 }}
          >
            <div className="flex min-h-[250px] flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-coal p-8 shadow-[0_-16px_50px_rgba(0,0,0,0.6)] backdrop-blur-md md:min-h-[270px] md:flex-row md:items-center md:p-12 transition-all duration-300 hover:border-acid/40">
              <div className="flex items-start gap-6 md:gap-10">
                <span className="font-display text-5xl font-extrabold text-acid md:text-7xl">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-bone md:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-smoke md:text-base">
                    {s.desc}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:max-w-[240px] md:flex-col md:items-end">
                {s.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 font-mono2 text-[10px] uppercase tracking-[0.2em] text-bone/80 hover:border-acid hover:text-acid transition-colors"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

