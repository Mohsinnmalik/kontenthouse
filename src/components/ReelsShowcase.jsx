import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Heart, MessageCircle, Share2, Eye, TrendingUp, Sparkles, ChevronLeft, ChevronRight, Volume2, VolumeX, MapPin, ArrowUpRight, X } from "lucide-react";
import { FadeUp, ScrollLine } from "@/lib/anim";
import { CLIENTS } from "@/data/clientsData";
import CaseStudyModal from "./CaseStudyModal";

export default function ReelsShowcase({ onSelectClientForContact }) {
  const [selectedCaseClient, setSelectedCaseClient] = useState(null);
  const [playingModalVideo, setPlayingModalVideo] = useState(null);
  const [liked, setLiked] = useState({});
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // We take the 6 designated video showcase clients in exact user sequence:
  // 1. DevOps, 2. AG Stays, 3. ZOMOS, 4. Gentleman Barista, 5. Rasrivaz, 6. AutoShield
  const reelItems = CLIENTS.slice(0, 6);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenCaseStudy = (client, e) => {
    e.stopPropagation();
    setSelectedCaseClient(client);
  };

  const handlePlayVideoModal = (client, e) => {
    e.stopPropagation();
    setPlayingModalVideo(client);
  };

  return (
    <section id="showcase" className="relative px-6 py-24 md:px-12 md:py-32 bg-ink text-bone border-t border-white/10 overflow-hidden">
      {/* Section Header with Left/Right Horizontal Scroll Controls */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <FadeUp>
            <p className="mb-4 flex items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.3em] text-acid">
              <Sparkles size={14} className="text-acid" />
              Creative Production &amp; Reel Vault (Horizontal Stream)
            </p>
          </FadeUp>
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-bone md:text-6xl">
            <ScrollLine>Content engineered</ScrollLine>
            <ScrollLine delay={0.08}>
              for <span className="font-serifac normal-case italic text-acid">retention &amp; revenue</span>
            </ScrollLine>
          </h2>
        </div>

        {/* Navigation & Scroll Controls */}
        <div className="flex items-center gap-4">
          <p className="hidden sm:block font-mono2 text-xs uppercase tracking-widest text-smoke">
            Slide to explore reels →
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-bone hover:border-acid hover:bg-acid hover:text-ink disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-transparent disabled:hover:text-bone transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-bone hover:border-acid hover:bg-acid hover:text-ink disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-transparent disabled:hover:text-bone transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally Scrollable Reel Carousel Track */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reelItems.map((client, idx) => (
          <div
            key={client.id}
            onMouseEnter={() => setHoveredVideoId(client.id)}
            onMouseLeave={() => setHoveredVideoId(null)}
            onClick={(e) => handlePlayVideoModal(client, e)}
            className="group relative shrink-0 w-[280px] sm:w-[320px] md:w-[360px] aspect-[9/16] overflow-hidden rounded-[2.2rem] border border-white/15 bg-coal/90 transition-all duration-500 hover:-translate-y-2 hover:border-acid/70 hover:shadow-[0_20px_50px_rgba(212,255,0,0.15)] flex flex-col justify-between snap-center"
          >
            {/* Live Video Background or Poster */}
            {client.videoUrl && (
              <video
                src={client.videoUrl}
                poster={client.poster}
                loop
                muted={isMuted}
                playsInline
                autoPlay={hoveredVideoId === client.id}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}

            {/* Gradient Dark Vignette Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/75 pointer-events-none" />

            {/* Top Header: Brand Sequence #, Official Logo & Category Badge */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 rounded-full bg-ink/85 backdrop-blur-md border border-white/10 px-3 py-1.5 shadow-md">
                <span className="font-mono2 text-[10px] text-acid font-bold">/0{idx + 1}</span>
                {client.logo && (
                  <img src={client.logo} alt={client.name} className="h-5 w-auto object-contain rounded" />
                )}
                <span className="font-display text-xs uppercase tracking-wider text-bone font-bold line-clamp-1">
                  {client.name}
                </span>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 font-mono2 text-[10px] text-acid font-semibold border border-white/5">
                <Eye size={12} className="text-acid" />
                {client.stats ? client.stats[0]?.value : "Active"}
              </span>
            </div>

            {/* Center Play Pulse Glow */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-acid text-ink shadow-[0_0_35px_rgba(212,255,0,0.65)] transition-transform duration-300 group-hover:scale-125">
                <Play size={24} className="fill-ink ml-1" />
              </div>
            </div>

            {/* Bottom Card Meta Details */}
            <div className="relative z-10 p-5 space-y-2.5 bg-gradient-to-t from-ink via-ink/95 to-transparent pt-8">
              <div className="flex items-center justify-between text-[10px] font-mono2 uppercase tracking-wider text-acid font-bold">
                <span className="flex items-center gap-1">
                  <TrendingUp size={12} />
                  {client.typeBadge || client.type}
                </span>
                {client.location && (
                  <span className="text-smoke flex items-center gap-1">
                    <MapPin size={10} /> {client.location}
                  </span>
                )}
              </div>

              <h3 className="font-display text-base font-bold text-bone leading-snug line-clamp-2 group-hover:text-acid transition-colors">
                {client.subtitle}
              </h3>

              {/* Social Metrics Bar & Case Study Link */}
              <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-smoke font-mono2 text-xs">
                <button
                  onClick={(e) => toggleLike(client.id, e)}
                  className="flex items-center gap-1.5 hover:text-acid transition-colors"
                >
                  <Heart size={14} className={liked[client.id] ? "fill-acid text-acid" : ""} />
                  <span>{liked[client.id] ? "Saved" : "Save"}</span>
                </button>

                <button
                  onClick={(e) => handleOpenCaseStudy(client, e)}
                  className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-acid font-bold hover:underline"
                >
                  Case Study
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal Scroll Progress Bar Indicator */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden max-w-md">
          <div
            className="h-full bg-acid transition-all duration-150 rounded-full"
            style={{ width: `${Math.max(16, scrollProgress)}%` }}
          />
        </div>
        <div className="flex items-center gap-3 font-mono2 text-[10px] uppercase text-smoke">
          <span>01 DevOps</span>
          <span>•</span>
          <span>02 AG Stays</span>
          <span>•</span>
          <span>03 ZOMOS</span>
          <span>•</span>
          <span>04 Barista</span>
          <span>•</span>
          <span>05 Rasrivaz</span>
          <span>•</span>
          <span>06 AutoShield</span>
        </div>
      </div>

      {/* Full-Screen Video Player Modal */}
      <AnimatePresence>
        {playingModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlayingModalVideo(null)}
            className="fixed inset-0 z-[160] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-coal shadow-2xl"
            >
              <div className="relative aspect-[9/16] w-full bg-black">
                <video
                  src={playingModalVideo.videoUrl}
                  poster={playingModalVideo.poster}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />

                {/* Top Overlay Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md px-3 py-1.5 border border-white/10">
                    {playingModalVideo.logo && (
                      <img src={playingModalVideo.logo} alt="" className="h-5 w-auto object-contain rounded" />
                    )}
                    <span className="font-display text-xs font-bold text-bone">
                      {playingModalVideo.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setPlayingModalVideo(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-bone hover:border-acid hover:text-acid border border-white/10"
                    aria-label="Close video"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Bottom Video Footer Info */}
              <div className="p-5 bg-ink flex items-center justify-between border-t border-white/10">
                <div>
                  <p className="font-display text-sm font-bold text-bone">{playingModalVideo.name}</p>
                  <p className="font-mono2 text-[10px] text-smoke uppercase">{playingModalVideo.subtitle}</p>
                </div>
                <button
                  onClick={(e) => {
                    const c = playingModalVideo;
                    setPlayingModalVideo(null);
                    handleOpenCaseStudy(c, e);
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-acid px-4 py-2 font-display text-[11px] font-bold uppercase tracking-wider text-ink hover:scale-105 transition-all"
                >
                  View Case Study
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Modal Container */}
      {selectedCaseClient && (
        <CaseStudyModal
          client={selectedCaseClient}
          onClose={() => setSelectedCaseClient(null)}
          onSelectForInquiry={onSelectClientForContact}
        />
      )}
    </section>
  );
}
