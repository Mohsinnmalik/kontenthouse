const ITEMS = [
  "Social Strategy",
  "Reels Production",
  "Performance Ads",
  "Influencer Collabs",
  "Brand Identity",
  "Community Growth",
  "Content Architecture",
  "Viral Growth Loops",
];

function Row({ ariaHidden = false }) {
  return (
    <ul aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-display text-2xl font-bold uppercase tracking-tight text-bone/85 md:text-4xl transition-colors hover:text-acid">
            {item}
          </span>
          <span className="inline-block h-2.5 w-2.5 rotate-45 bg-acid shadow-[0_0_10px_#D4FF00]" />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-coal/70 py-6">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}

