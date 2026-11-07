import { ArrowUpRight, Clapperboard, Megaphone, UserCheck, Bot, Handshake, Compass } from "lucide-react";
import { FadeUp } from "@/lib/anim";

const SERVICES = [
  {
    icon: Clapperboard,
    title: "Creative & Content Production",
    desc: "Cinematic 4K video production, viral short-form editing, product photography, and sound-engineered reels built for maximum scroll retention.",
    tags: ["Cinematic 4K", "Short-Form Reels", "Product Photography", "Scriptwriting"],
    span: "md:col-span-7",
    dark: true,
    img: "https://images.unsplash.com/photo-1611784728558-6c7d9b409cdf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB2aWRlbyUyMHByb2R1Y3Rpb24lMjBzdHVkaW8lMjBzb2NpYWwlMjBtZWRpYSUyMGNvbnRlbnQlMjBjcmVhdGlvbiUyMGFnZW5jeXxlbnwwfHx8fDE3OTQwNTU2NTN8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    icon: Compass,
    title: "Revenue-Focused Content Strategy",
    desc: "We analyze your business model, customer behavior, and sales peaks (like The Gentleman Barista's 4 AM night rush) to design content that drives actual revenue.",
    tags: ["Business Analysis", "Audience Mapping", "Revenue Anchoring"],
    span: "md:col-span-5",
  },
  {
    icon: UserCheck,
    title: "Founder-Led Branding & Stunts",
    desc: "Transforming founders into trusted industry authorities (like Moiz at AutoShield) backed by creative marketing stunts and disruptive viral activations.",
    tags: ["Personal Branding", "Marketing Stunts", "Authority Building"],
    span: "md:col-span-4",
  },
  {
    icon: Megaphone,
    title: "Performance Marketing & Meta Ads",
    desc: "Full-funnel Meta and Google advertising engineered around CAC, lead generation, and ruthless CPC optimization (e.g. AG Stays ₹458 ➔ ₹7–₹10 CPC).",
    tags: ["Meta Ads", "Lead Gen", "CPC Optimization"],
    span: "md:col-span-4",
  },
  {
    icon: Bot,
    title: "AI Integration & Digital Solutions",
    desc: "Deploying AI-powered workflow automations, content intelligence, and modern website development support to accelerate business scalability.",
    tags: ["AI Automation", "Web Development", "Workflows"],
    span: "md:col-span-4",
  },
  {
    icon: Handshake,
    title: "White-Label Backend Production",
    desc: "Operating as an elastic, reliable backend video production partner for agencies (such as DevOps Institute Mumbai), scaling output without agency overhead.",
    tags: ["White-Label Production", "Post-Production", "Agency Partnerships"],
    span: "md:col-span-12",
    wide: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative px-6 pb-28 pt-8 md:px-12 md:pb-36 text-ink">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <FadeUp>
            <p className="mb-4 font-mono2 text-[11px] uppercase tracking-[0.3em] text-ink/60">
              02 — Core Capabilities
            </p>
          </FadeUp>
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-ink md:text-6xl">
            <FadeUp y={40}>Engineered for</FadeUp>
            <FadeUp y={40} delay={0.08}>
              <span className="font-serifac normal-case italic text-ink/70">business growth</span>
            </FadeUp>
          </h2>
        </div>
        <FadeUp delay={0.15}>
          <p className="max-w-xs text-sm leading-relaxed text-ink/65">
            Six distinct disciplines under one roof — from founder-led viral storytelling to performance Meta ads and white-label agency scale.
          </p>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        {SERVICES.map((s, i) => (
          <FadeUp key={s.title} delay={0.05 * i} className={s.span}>
            <article
              className={`group relative flex h-full min-h-[230px] flex-col justify-between overflow-hidden rounded-2xl border p-7 transition-all duration-500 md:min-h-[270px] md:p-9 ${
                s.dark
                  ? "border-ink bg-ink text-bone"
                  : "border-ink/15 bg-white text-ink hover:border-ink/50 hover:shadow-xl"
              }`}
            >
              {s.img && (
                <img
                  src={s.img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="relative flex items-start justify-between">
                <s.icon size={30} strokeWidth={1.6} className={s.dark ? "text-acid" : "text-ink"} />
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45 ${
                  s.dark ? "border-white/20 text-bone group-hover:border-acid group-hover:text-acid" : "border-ink/20 text-ink group-hover:border-ink"
                }`}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
              <div className="relative mt-12">
                <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">{s.title}</h3>
                <p className={`mt-2.5 max-w-lg text-sm leading-relaxed md:text-base ${s.dark ? "text-bone/75" : "text-ink/65"}`}>
                  {s.desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className={`rounded-full border px-3 py-1 font-mono2 text-[10px] uppercase tracking-[0.18em] ${
                        s.dark ? "border-white/25 text-bone/75 bg-white/5" : "border-ink/20 text-ink/65 bg-ink/[0.02]"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
