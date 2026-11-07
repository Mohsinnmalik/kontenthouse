import { useState } from "react";
import { ArrowUpRight, MapPin, Building, Play, Sparkles } from "lucide-react";
import { FadeUp, ScrollLine } from "@/lib/anim";
import { CLIENTS } from "@/data/clientsData";
import CaseStudyModal from "./CaseStudyModal";

export default function Clients({ onSelectClientForContact }) {
  const [filter, setFilter] = useState("all");
  const [activeClient, setActiveClient] = useState(null);

  const filteredClients = CLIENTS.filter((c) => {
    if (filter === "direct") return c.type === "Direct Client";
    if (filter === "partnership") return c.type === "Agency Partnership";
    return true;
  });

  return (
    <section
      id="residents"
      className="relative z-20 -mt-8 rounded-t-[2.5rem] bg-ink px-6 py-24 md:rounded-t-[4rem] md:px-12 md:py-32 border-t border-white/10"
    >
      {/* Section Header */}
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <FadeUp>
            <p className="mb-4 flex items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.3em] text-acid">
              <Sparkles size={14} className="text-acid" />
              03 — Client Portfolio &amp; Case Studies
            </p>
          </FadeUp>
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-bone md:text-6xl">
            <ScrollLine>Brands that</ScrollLine>
            <ScrollLine delay={0.08}>
              <span className="font-serifac normal-case italic text-acid">live with us</span>
            </ScrollLine>
          </h2>
        </div>
        <FadeUp delay={0.15}>
          <p className="max-w-md text-sm leading-relaxed text-smoke">
            Across food &amp; beverage, automotive protection, boutique stays, tech education,
            and international enterprise — spanning direct client engagements and white-label agency partnerships.
          </p>
        </FadeUp>
      </div>

      {/* Filter Tabs */}
      <FadeUp className="mb-10 flex flex-wrap items-center gap-3">
        {[
          { id: "all", label: `All Engagements (${CLIENTS.length})` },
          { id: "direct", label: "Direct Clients (5)" },
          { id: "partnership", label: "Agency Partnerships (2)" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`rounded-full border px-5 py-2.5 font-mono2 text-xs uppercase tracking-wider transition-all duration-300 ${
              filter === btn.id
                ? "border-acid bg-acid text-ink font-bold shadow-[0_0_20px_rgba(212,255,0,0.3)]"
                : "border-white/15 bg-white/[0.02] text-smoke hover:border-bone hover:text-bone"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </FadeUp>

      {/* Interactive Grid of Client Engagements */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client, i) => (
          <FadeUp key={client.id} delay={0.05 * i}>
            <div
              onClick={() => setActiveClient(client)}
              className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-coal/70 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-acid/60 hover:bg-coal hover:shadow-[0_20px_45px_rgba(212,255,0,0.08)] cursor-pointer"
            >
              <div>
                {/* Header Row: Official Brand Logo & Type Badge */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  {client.logo ? (
                    <div className="flex h-12 max-w-[140px] items-center rounded-xl bg-white/[0.06] p-2 border border-white/10 group-hover:border-acid/40 transition-colors">
                      <img src={client.logo} alt={client.name} className="h-full w-auto object-contain max-h-8" />
                    </div>
                  ) : (
                    <span className="font-display text-sm font-bold uppercase text-bone">{client.name}</span>
                  )}

                  <span className={`rounded-full px-3 py-1 font-mono2 text-[10px] font-bold uppercase tracking-wider ${
                    client.type === "Direct Client"
                      ? "bg-acid/20 text-acid border border-acid/30"
                      : "bg-white/10 text-bone/90 border border-white/15"
                  }`}>
                    {client.typeBadge || client.type}
                  </span>
                </div>

                {/* Brand Title */}
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-bone group-hover:text-acid transition-colors">
                  {client.name}
                </h3>
                <p className="mt-1 font-mono2 text-[11px] uppercase tracking-wider text-smoke line-clamp-1">
                  {client.subtitle}
                </p>

                {/* Location & Industry Badges */}
                <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono2 uppercase text-smoke">
                  <span className="flex items-center gap-1 rounded-md bg-white/[0.03] px-2.5 py-1 border border-white/5">
                    <Building size={11} /> {client.industry}
                  </span>
                  {client.location && (
                    <span className="flex items-center gap-1 rounded-md bg-white/[0.03] px-2.5 py-1 border border-white/5 text-acid/90">
                      <MapPin size={11} /> {client.location}
                    </span>
                  )}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-smoke/90 line-clamp-3">
                  {client.description}
                </p>
              </div>

              {/* Bottom Video Badge & CTA */}
              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-mono2 text-[10px] uppercase text-acid font-semibold">
                  <Play size={10} className="fill-acid" /> Watch Reel &amp; Breakdown
                </span>
                <span className="font-mono2 text-[11px] uppercase tracking-wider text-bone group-hover:text-acid flex items-center gap-1 font-bold">
                  View Case Study →
                </span>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Case Study Modal Container */}
      {activeClient && (
        <CaseStudyModal
          client={activeClient}
          onClose={() => setActiveClient(null)}
          onSelectForInquiry={onSelectClientForContact}
        />
      )}
    </section>
  );
}
