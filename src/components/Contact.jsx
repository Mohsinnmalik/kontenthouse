import { useState, useEffect } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { ArrowUpRight, Instagram, Linkedin, Twitter, MessageCircle, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { FadeUp, ScrollLine } from "@/lib/anim";

const BUDGETS = ["< ₹25k / month", "₹25k – ₹50k / month", "₹50k – ₹1L / month", "₹1L+ / month (Enterprise & Full-Floor)"];
const WHATSAPP_RAW = "917028069181";
const WHATSAPP_DISPLAY = "+91 70280 69181";

const CALL_RAW = "918208059181";
const CALL_DISPLAY = "+91 820 805 9181";

const INSTAGRAM_URL = "https://www.instagram.com/kontent.housee?xtok=OW5rcWZqdG4wNGlq&utm_source=qr";

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: INSTAGRAM_URL },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/kontenthouse" },
  { icon: Twitter, label: "X (Twitter)", href: "https://x.com/kontenthouse" },
];

export default function Contact({ prefilledBrand = "" }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    brand: prefilledBrand,
    budget: BUDGETS[1],
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    if (prefilledBrand) {
      setForm((f) => ({
        ...f,
        brand: prefilledBrand,
        message: f.message || `Hi KontentHouse, we are interested in discussing a strategy similar to the ${prefilledBrand} case study.`,
      }));
    }
  }, [prefilledBrand]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    try {
      await new Promise((r) => setTimeout(r, 600));

      // 1. Save locally so lead is never lost
      const existing = JSON.parse(localStorage.getItem("kontenthouse_inquiries") || "[]");
      existing.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem("kontenthouse_inquiries", JSON.stringify(existing));

      // 2. Confetti celebration
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.7 },
        colors: ["#D4FF00", "#F4F4F0", "#F59E0B"],
      });

      toast.success("Door unlocked — Redirecting to WhatsApp!", {
        description: `Connecting you directly with KontentHouse at ${WHATSAPP_DISPLAY}...`,
      });

      // 3. Construct WhatsApp message text
      const waText = `*New Brief from KontentHouse Website* 🏠⚡
-------------------------------------
*Name:* ${form.name}
*Brand / Company:* ${form.brand}
*Phone / WhatsApp:* ${form.phone || "Not specified"}
*Monthly Budget:* ${form.budget}

*Project Brief:*
${form.message}
-------------------------------------
_Sent via KontentHouse Agency Website_`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(waText)}`;

      // 4. Redirect / open in new window
      window.open(whatsappUrl, "_blank");

      setSentSuccess(true);
      setForm({ name: "", phone: "", brand: "", budget: BUDGETS[1], message: "" });
    } catch (err) {
      toast.error("Could not complete redirect.", {
        description: "Please connect with us directly on WhatsApp below.",
      });
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full border-b border-white/20 bg-transparent py-3 text-base text-bone placeholder:text-smoke/50 outline-none transition-colors focus:border-acid";

  return (
    <section id="contact" className="relative px-6 pb-28 pt-16 md:px-12 md:pb-36 md:pt-24 bg-ink text-bone">
      <div className="mb-16">
        <FadeUp>
          <p className="mb-4 font-mono2 text-[11px] uppercase tracking-[0.3em] text-acid">
            05 — The Doorstep
          </p>
        </FadeUp>
        <h2 className="font-display text-[13vw] font-extrabold uppercase leading-[0.92] tracking-tight text-bone sm:text-[10vw] lg:text-[7vw]">
          <ScrollLine>Let&apos;s build</ScrollLine>
          <ScrollLine delay={0.1}>
            <span className="font-serifac normal-case italic text-acid">your house</span>
          </ScrollLine>
        </h2>
      </div>

      <div className="grid gap-16 lg:grid-cols-5 lg:gap-12">
        <FadeUp className="lg:col-span-3">
          {sentSuccess ? (
            <div className="rounded-3xl border border-acid/50 bg-coal/90 p-10 text-center space-y-6">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-acid/10 text-acid">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-display text-3xl font-extrabold uppercase text-bone">
                Your Brand Just Knocked.
              </h3>
              <p className="font-mono2 text-sm text-smoke max-w-md mx-auto leading-relaxed">
                We have redirected your brief to WhatsApp ({WHATSAPP_DISPLAY}). Our senior strategists will review and discuss your tailored room blueprint immediately.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href={`https://wa.me/${WHATSAPP_RAW}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-acid px-6 py-3 font-display text-xs font-bold uppercase tracking-widest text-ink hover:scale-105 transition-all shadow-[0_0_25px_rgba(212,255,0,0.4)]"
                >
                  Open WhatsApp Chat Again
                </a>
                <button
                  type="button"
                  onClick={() => setSentSuccess(false)}
                  className="rounded-full border border-white/20 px-6 py-3 font-mono2 text-xs uppercase tracking-widest text-bone hover:border-acid hover:text-acid transition-colors"
                >
                  Send Another Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className="mb-1 block font-mono2 text-[11px] uppercase tracking-[0.25em] text-smoke">
                    Your name *
                  </label>
                  <input
                    id="cf-name"
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Kabir Singhania"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="cf-phone" className="mb-1 block font-mono2 text-[11px] uppercase tracking-[0.25em] text-smoke">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="cf-phone"
                    required
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+91 820 805 9181"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cf-brand" className="mb-1 block font-mono2 text-[11px] uppercase tracking-[0.25em] text-smoke">
                  Brand / Company *
                </label>
                <input
                  id="cf-brand"
                  required
                  value={form.brand}
                  onChange={set("brand")}
                  placeholder="e.g. Your Business or Brand Name"
                  className={inputCls}
                />
              </div>

              <div>
                <p className="mb-3 font-mono2 text-[11px] uppercase tracking-[0.25em] text-smoke">
                  Estimated Monthly Investment
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setForm((f) => ({ ...f, budget: b }))}
                      className={`rounded-full border px-4 py-2 font-mono2 text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                        form.budget === b
                          ? "border-acid bg-acid text-ink font-bold shadow-[0_0_20px_rgba(212,255,0,0.3)]"
                          : "border-white/20 text-smoke hover:border-bone hover:text-bone"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="cf-message" className="mb-1 block font-mono2 text-[11px] uppercase tracking-[0.25em] text-smoke">
                  What are we building together? *
                </label>
                <textarea
                  id="cf-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us about your brand, current challenges, and goals (Reels production, founder branding, Meta ads, or white-label editing)..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="group flex w-fit items-center gap-3 rounded-full bg-acid px-9 py-4 font-display text-sm font-bold uppercase tracking-widest text-ink transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(212,255,0,0.45)] disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      Opening WhatsApp
                      <Loader2 size={17} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Brief to WhatsApp
                      <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:rotate-45" />
                    </>
                  )}
                </button>

                <p className="font-mono2 text-[11px] text-smoke/70">
                  Redirects directly to WhatsApp chat: <span className="text-acid">{WHATSAPP_DISPLAY}</span>
                </p>
              </div>
            </form>
          )}
        </FadeUp>

        {/* Direct Channels Column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <FadeUp delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-coal/70 p-8 space-y-6">
              <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-smoke">
                Direct Agency Lines
              </p>
              <div className="flex flex-col gap-3">
                {/* WhatsApp Hotline */}
                <a
                  href={`https://wa.me/${WHATSAPP_RAW}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-acid hover:bg-acid/10"
                >
                  <div className="flex flex-col">
                    <span className="flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-wider text-bone group-hover:text-acid">
                      <MessageCircle size={18} className="text-acid" />
                      WhatsApp Hotline
                    </span>
                    <span className="font-mono2 text-xs text-smoke group-hover:text-bone mt-1 pl-7">
                      {WHATSAPP_DISPLAY}
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-smoke group-hover:text-acid transition-transform group-hover:rotate-45" />
                </a>

                {/* Direct Calling - User updated: 8208059181 */}
                <a
                  href={`tel:+${CALL_RAW}`}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-acid hover:bg-white/[0.03]"
                >
                  <div className="flex flex-col">
                    <span className="flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-wider text-bone group-hover:text-acid">
                      <Phone size={18} className="text-acid" />
                      Direct Calling
                    </span>
                    <span className="font-mono2 text-xs text-smoke group-hover:text-bone mt-1 pl-7">
                      {CALL_DISPLAY}
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-smoke group-hover:text-acid transition-transform group-hover:rotate-45" />
                </a>

                {/* Instagram Direct Link */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-acid hover:bg-white/[0.03]"
                >
                  <div className="flex flex-col">
                    <span className="flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-wider text-bone group-hover:text-acid">
                      <Instagram size={18} className="text-acid" />
                      Instagram Official
                    </span>
                    <span className="font-mono2 text-xs text-smoke group-hover:text-bone mt-1 pl-7">
                      @kontent.housee
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-smoke group-hover:text-acid transition-transform group-hover:rotate-45" />
                </a>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="rounded-3xl border border-white/10 bg-coal/70 p-8">
              <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-smoke mb-4">
                Social Footprint
              </p>
              <div className="flex flex-col gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-2 text-sm text-smoke hover:text-acid transition-colors font-mono2 text-xs uppercase tracking-widest"
                  >
                    <span className="flex items-center gap-2.5">
                      <s.icon size={16} />
                      {s.label}
                    </span>
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
