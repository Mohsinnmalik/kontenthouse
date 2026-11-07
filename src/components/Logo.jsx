export default function Logo({ size = 34, dark = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KontentHouse logo"
      className="transition-transform duration-300 hover:rotate-6"
    >
      <rect width="48" height="48" rx="12" fill={dark ? "#09090B" : "#D4FF00"} />
      <path
        d="M24 11.5 37 22.5V36a1.5 1.5 0 0 1-1.5 1.5h-23A1.5 1.5 0 0 1 11 36V22.5L24 11.5Z"
        stroke={dark ? "#D4FF00" : "#09090B"}
        strokeWidth="3.2"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="20.4" y="26.5" width="7.2" height="11" rx="1" fill={dark ? "#D4FF00" : "#09090B"} />
      <circle cx="24" cy="19" r="2.1" fill={dark ? "#D4FF00" : "#09090B"} />
    </svg>
  );
}

