import Hexagon from "./Hexagon";

/**
 * Playful page background: a faint hexagon grid that fades out,
 * plus a few floating colored hexagons. Purely decorative.
 */
export default function HexDecor({
  variant = "home",
}: {
  variant?: "home" | "detail" | "plain";
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[900px] sm:h-[1000px]"
    >
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern
            id={`hexgrid-${variant}`}
            width="56"
            height="97"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 2 52 16v28L28 58 4 44V16Z M28 58v39"
              fill="none"
              stroke="#121417"
              strokeOpacity="0.07"
              strokeWidth="1.5"
            />
          </pattern>
          <linearGradient id={`hexfade-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={`hexmask-${variant}`}>
            <rect width="100%" height="100%" fill={`url(#hexfade-${variant})`} />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#hexgrid-${variant})`}
          mask={`url(#hexmask-${variant})`}
        />
      </svg>

      {variant === "home" && (
        <>
          <Hexagon fill="#FFC94A" className="absolute -left-6 top-[600px] h-24 w-24 rotate-[14deg] sm:left-[2%] sm:top-[560px] sm:h-[150px] sm:w-[150px]" />
          <Hexagon fill="#FF7759" className="absolute left-[62%] top-[470px] h-11 w-11 -rotate-12 sm:left-[41%] sm:top-24 sm:h-[72px] sm:w-[72px]" />
          <Hexagon fill="#34C99A" outline strokeWidth={7} className="absolute -right-9 top-24 h-28 w-28 rotate-[8deg] sm:-right-10 sm:top-8 sm:h-[200px] sm:w-[200px]" />
          <Hexagon fill="#B79CFF" className="absolute right-3 top-[760px] h-14 w-14 -rotate-6 sm:right-[5%] sm:top-[700px] sm:h-24 sm:w-24" />
          <Hexagon fill="#2B4EE6" className="absolute left-[38%] top-[720px] hidden h-10 w-10 rotate-[20deg] sm:block" />
          <Hexagon fill="#FF7759" outline strokeWidth={12} className="absolute left-[7%] top-[150px] hidden h-8 w-8 sm:block" />
          <Hexagon fill="#FFC94A" className="absolute right-[40%] top-[520px] hidden h-7 w-7 sm:block" />
        </>
      )}

      {variant === "detail" && (
        <>
          <Hexagon fill="#CDF3E1" strokeWidth={8} className="absolute -left-4 top-[540px] h-[420px] w-[420px] rotate-[10deg] md:left-auto md:right-[8%] md:top-[120px] md:h-[560px] md:w-[560px]" />
          <Hexagon fill="#FFC94A" className="absolute right-4 top-[520px] h-16 w-16 -rotate-[14deg] md:right-[6%] md:top-[110px] md:h-[90px] md:w-[90px]" />
          <Hexagon fill="#FF7759" className="absolute left-5 top-[980px] h-9 w-9 md:left-auto md:right-[40%] md:top-[700px] md:h-[54px] md:w-[54px]" />
          <Hexagon fill="#B79CFF" outline strokeWidth={12} className="absolute left-[4%] top-[640px] hidden h-9 w-9 md:block" />
        </>
      )}
    </div>
  );
}
