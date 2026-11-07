import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowUpRight, Flame, Video, Camera, Users, Sparkles } from "lucide-react";
import { FadeUp, ScrollLine } from "@/lib/anim";
import { useLenis, scrollToTarget } from "@/lib/lenis";

export default function DeliverablesCalculator() {
  const lenisRef = useLenis();
  const [reels, setReels] = useState(12);
  const [shootDays, setShootDays] = useState(2);
  const [adsActive, setAdsActive] = useState(true);
  const [communityActive, setCommunityActive] = useState(true);

  // Dynamic estimate calculations
  const estimatedReach = (reels * 42000 + (adsActive ? 180000 : 0)).toLocaleString();
  const estimatedWatchHours = (reels * 480).toLocaleString();
  const estimatedCostTier = reels <= 10 && shootDays === 1 
    ? "₹25k – ₹50k / mo" 
    : reels <= 16 
    ? "₹50k – ₹1L / mo" 
    : "₹1L+ / mo (Full Floor)";

  return (
    <section className="relative px-6 py-20 md:px-12 md:py-28 bg-ink border-t border-white/10 text-bone">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <FadeUp>
            <p className="mb-3 flex items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.3em] text-acid">
              <Calculator size={14} className="text-acid" />
              Interactive Scope &amp; ROI Architect
            </p>
          </FadeUp>
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-bone md:text-5xl">
            <ScrollLine>Configure your</ScrollLine>
            <ScrollLine delay={0.08}>
              <span className="font-serifac normal-case italic text-acid">growth engine</span>
            </ScrollLine>
          </h2>
        </div>
        <FadeUp delay={0.15}>
          <p className="max-w-xs text-sm leading-relaxed text-smoke">
            Fine-tune monthly output volume to match your brand's growth velocity.
          </p>
        </FadeUp>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Controls Column */}
        <FadeUp className="lg:col-span-7 rounded-3xl border border-white/10 bg-coal/80 p-8 md:p-10 space-y-8">
          {/* Reel Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-bone">
                <Video size={18} className="text-acid" />
                Short-Form Reels / Month
              </label>
              <span className="font-display text-2xl font-extrabold text-acid">
                {reels} <span className="font-mono2 text-xs text-smoke">Reels</span>
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={30}
              step={2}
              value={reels}
              onChange={(e) => setReels(Number(e.target.value))}
              className="w-full accent-acid cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
            />
            <div className="flex justify-between font-mono2 text-[10px] uppercase text-smoke">
              <span>6 Minimal</span>
              <span>12 Sweet Spot</span>
              <span>20 Dominant</span>
              <span>30 Daily Drop</span>
            </div>
          </div>

          {/* Shoot Days Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-bone">
                <Camera size={18} className="text-acid" />
                On-Location 4K Shoot Days
              </label>
              <span className="font-display text-2xl font-extrabold text-acid">
                {shootDays} <span className="font-mono2 text-xs text-smoke">Days</span>
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={4}
              step={1}
              value={shootDays}
              onChange={(e) => setShootDays(Number(e.target.value))}
              className="w-full accent-acid cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
            />
            <div className="flex justify-between font-mono2 text-[10px] uppercase text-smoke">
              <span>1 Day Batch</span>
              <span>2 Days Recommended</span>
              <span>3 Days Multi-Set</span>
              <span>4 Days Full Film</span>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={() => setAdsActive(!adsActive)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left ${
                adsActive ? "border-acid bg-acid/10 text-bone" : "border-white/10 bg-transparent text-smoke"
              }`}
            >
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-wider">Paid Meta / Google Ads</p>
                <p className="font-mono2 text-[10px] text-smoke mt-0.5">ROAS engineered pipeline</p>
              </div>
              <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${adsActive ? "border-acid bg-acid text-ink font-bold text-[10px]" : "border-smoke"}`}>
                {adsActive ? "✓" : ""}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCommunityActive(!communityActive)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left ${
                communityActive ? "border-acid bg-acid/10 text-bone" : "border-white/10 bg-transparent text-smoke"
              }`}
            >
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-wider">24/7 DM &amp; Community</p>
                <p className="font-mono2 text-[10px] text-smoke mt-0.5">Zero unread messages</p>
              </div>
              <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${communityActive ? "border-acid bg-acid text-ink font-bold text-[10px]" : "border-smoke"}`}>
                {communityActive ? "✓" : ""}
              </span>
            </button>
          </div>
        </FadeUp>

        {/* Output Metrics Column */}
        <FadeUp delay={0.1} className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-acid/40 bg-gradient-to-br from-coal via-coal to-acid/10 p-8 md:p-10 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono2 text-[11px] uppercase tracking-[0.25em] text-acid">
                Projected Monthly Reach
              </span>
              <span className="rounded-full bg-acid/20 px-3 py-1 font-mono2 text-[10px] uppercase text-acid font-bold">
                Algorithm-Proof
              </span>
            </div>

            <div>
              <p className="font-display text-5xl md:text-6xl font-extrabold text-bone tracking-tight">
                ~{estimatedReach}
              </p>
              <p className="font-mono2 text-xs text-smoke uppercase tracking-wider mt-1">
                Estimated Organic &amp; Paid Impressions
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
              <div>
                <p className="font-mono2 text-[10px] uppercase text-smoke">Estimated Watch Time</p>
                <p className="font-display text-xl font-bold text-bone mt-1">{estimatedWatchHours} Hours</p>
              </div>
              <div>
                <p className="font-mono2 text-[10px] uppercase text-smoke">Recommended Tier</p>
                <p className="font-display text-xl font-bold text-acid mt-1">{estimatedCostTier}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollToTarget(lenisRef, "#contact")}
            className="group flex w-full items-center justify-center gap-3 rounded-full bg-acid px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-ink transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(212,255,0,0.4)]"
          >
            Lock In This Scope
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
          </button>
        </FadeUp>
      </div>
    </section>
  );
}

