import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CheckCircle2, Users, MapPin, Calendar, Building, TrendingDown, Sparkles, Layers, ShieldCheck, Play, Video } from "lucide-react";
import { useLenis, scrollToTarget } from "@/lib/lenis";

export default function CaseStudyModal({ client, onClose, onSelectForInquiry }) {
  const lenisRef = useLenis();

  if (!client) return null;

  const handleInquire = () => {
    onClose();
    if (onSelectForInquiry) onSelectForInquiry(client.name);
    setTimeout(() => {
      scrollToTarget(lenisRef, "#contact");
    }, 200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden rounded-3xl border border-white/20 bg-coal shadow-2xl text-bone"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-ink/90 backdrop-blur-xl px-6 py-4 md:px-8">
            <div className="flex items-center gap-3">
              {client.logo ? (
                <div className="h-8 max-w-[120px] flex items-center bg-white/10 rounded-lg p-1.5 border border-white/10">
                  <img src={client.logo} alt={client.name} className="h-full w-auto object-contain" />
                </div>
              ) : (
                <span className="h-3 w-3 rounded-full bg-acid animate-pulse shadow-[0_0_10px_#D4FF00]" />
              )}
              <span className="font-mono2 text-xs uppercase tracking-[0.25em] text-smoke hidden sm:inline">
                Case Study Teardown
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-bone hover:border-acid hover:text-acid hover:rotate-90 transition-all duration-300"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar">
            {/* Hero Banner Section */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-8 bg-gradient-to-br from-ink via-coal to-acid/5">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`rounded-full px-3.5 py-1 font-mono2 text-[10px] font-bold uppercase tracking-wider ${
                  client.type === "Direct Client"
                    ? "bg-acid text-ink shadow-[0_0_15px_rgba(212,255,0,0.35)]"
                    : "bg-white/15 text-acid border border-acid/40"
                }`}>
                  {client.typeBadge || client.type}
                </span>
                <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono2 text-[10px] uppercase text-smoke flex items-center gap-1.5">
                  <Building size={12} /> {client.industry}
                </span>
                {client.location && (
                  <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono2 text-[10px] uppercase text-smoke flex items-center gap-1.5">
                    <MapPin size={12} /> {client.location}
                  </span>
                )}
                {client.engagementDuration && (
                  <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono2 text-[10px] uppercase text-smoke flex items-center gap-1.5">
                    <Calendar size={12} /> {client.engagementDuration}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-bone tracking-tight">
                    {client.name}
                  </h2>
                  <p className="mt-2 font-mono2 text-xs sm:text-sm text-acid/90 uppercase tracking-widest">
                    {client.subtitle}
                  </p>
                </div>

                {client.logo && (
                  <div className="shrink-0 flex h-16 w-32 items-center justify-center rounded-2xl bg-white/[0.08] p-3 border border-white/15">
                    <img src={client.logo} alt={client.name} className="max-h-full max-w-full object-contain" />
                  </div>
                )}
              </div>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-smoke max-w-2xl">
                {client.overview}
              </p>

              {/* Stats Bar */}
              {client.stats && (
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  {client.stats.map((st, i) => (
                    <div key={i} className="bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      <p className="font-mono2 text-[10px] uppercase tracking-wider text-smoke">{st.label}</p>
                      <p className="font-display text-lg font-bold text-bone mt-0.5">{st.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Video Player Showcase Inside Case Study */}
            {client.videoUrl && (
              <div className="rounded-2xl border border-white/15 bg-ink p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video size={20} className="text-acid" />
                    <h3 className="font-display text-lg font-bold uppercase tracking-wider text-bone">
                      Featured Production Asset / Reel
                    </h3>
                  </div>
                  <span className="font-mono2 text-[10px] uppercase text-smoke tracking-wider">
                    Official Production
                  </span>
                </div>

                <div className="relative mx-auto max-w-sm aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                  <video
                    src={client.videoUrl}
                    poster={client.poster}
                    controls
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Special Section: AutoShield Dedicated Team Structure */}
            {client.teamStructure && (
              <div className="rounded-2xl border border-white/10 bg-ink/60 p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-acid" />
                  <h3 className="font-display text-xl font-bold uppercase tracking-wider text-bone">
                    Dedicated 5-Resource Team Structure
                  </h3>
                </div>
                <p className="font-mono2 text-xs text-smoke">
                  AutoShield benefits from a specialized 5-member team solely focused on founder branding, viral stunts, and video production.
                </p>
                <div className="grid gap-3 sm:grid-cols-3 mt-4">
                  {client.teamStructure.map((t, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-coal/80 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-2xl font-extrabold text-acid">{t.count}</span>
                        <span className="font-mono2 text-[10px] uppercase text-smoke">Dedicated</span>
                      </div>
                      <p className="font-display text-sm font-bold text-bone mt-1">{t.role}</p>
                      <p className="font-mono2 text-[10px] text-smoke/70 mt-1">{t.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Section: AG Stays CPC Advertising Performance Table */}
            {client.adPerformanceTable && (
              <div className="rounded-2xl border border-acid/40 bg-ink/70 p-6 md:p-8 space-y-4 shadow-[0_0_30px_rgba(212,255,0,0.08)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown size={22} className="text-acid" />
                    <h3 className="font-display text-xl font-bold uppercase tracking-wider text-bone">
                      Reported Meta Ads CPC Optimization
                    </h3>
                  </div>
                  <span className="rounded-full bg-acid/20 px-3 py-1 font-mono2 text-[10px] uppercase text-acid font-bold">
                    Campaign Impact
                  </span>
                </div>
                <p className="font-mono2 text-xs text-smoke">
                  Direct comparison of reported advertising cost-per-click before and after KontentHouse creative restructuring.
                </p>

                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left font-mono2 text-xs">
                    <thead>
                      <tr className="border-b border-white/15 text-smoke uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">Campaign Stage</th>
                        <th className="py-3 px-3">Reported CPC</th>
                        <th className="py-3 px-3">Campaign Execution Context</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {client.adPerformanceTable.map((row, idx) => (
                        <tr key={idx} className={idx === 2 ? "bg-acid/10 text-bone font-bold" : "text-smoke"}>
                          <td className="py-3.5 px-3 flex items-center gap-2">
                            {idx === 2 && <Sparkles size={14} className="text-acid" />}
                            {row.stage}
                          </td>
                          <td className="py-3.5 px-3 font-display text-base font-extrabold text-acid">
                            {row.cpc}
                          </td>
                          <td className="py-3.5 px-3 text-[11px] text-smoke">
                            {row.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] font-mono2 text-smoke/60 italic pt-2">
                  *Figures presented as reported campaign results achieved during the active seasonal advertising window.
                </p>
              </div>
            )}

            {/* Strategic Approach & Core Discovery */}
            {client.approach && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-acid" />
                  <h3 className="font-display text-lg font-bold uppercase tracking-wider text-bone">
                    Our Strategic Approach &amp; Core Insight
                  </h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-smoke">
                  {client.approach}
                </p>
                {client.collaborationNote && (
                  <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3 text-xs font-mono2 text-smoke">
                    <span className="text-acid font-bold">Partnership Note:</span> {client.collaborationNote}
                  </div>
                )}
              </div>
            )}

            {/* Services Delivered Breakdown */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Layers size={20} className="text-acid" />
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-bone">
                  Services Provided
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {client.services.map((svc, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-ink/50 p-5 space-y-3">
                    <p className="font-display text-sm font-bold uppercase tracking-wider text-acid">
                      {svc.category}
                    </p>
                    <ul className="space-y-2">
                      {svc.items.map((it, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-smoke leading-relaxed">
                          <CheckCircle2 size={14} className="text-acid shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Modal CTA Bar */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-coal to-ink p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-display text-xl font-bold uppercase text-bone">
                  Want a similar architecture for your brand?
                </h4>
                <p className="font-mono2 text-xs text-smoke mt-1">
                  We build custom rooms around your revenue streams, audience, and market position.
                </p>
              </div>
              <button
                onClick={handleInquire}
                className="group shrink-0 flex items-center gap-2 rounded-full bg-acid px-7 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-ink hover:scale-105 hover:shadow-[0_0_30px_rgba(212,255,0,0.4)] transition-all"
              >
                Inquire About This Scope
                <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
