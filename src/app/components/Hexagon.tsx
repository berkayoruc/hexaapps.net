type HexagonProps = {
  className?: string;
  fill?: string;
  /** Draw an outline instead of a filled shape. */
  outline?: boolean;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

export const HEX_PATH = "M50 4 90 27v46L50 96 10 73V27Z";
const HEX_PATH_INSET = "M50 8 86 29v42L50 92 14 71V29Z";

/** Decorative rounded hexagon. Always aria-hidden. */
export default function Hexagon({
  className,
  fill = "currentColor",
  outline = false,
  strokeWidth = 6,
  style,
}: HexagonProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d={outline ? HEX_PATH_INSET : HEX_PATH}
        fill={outline ? "none" : fill}
        stroke={fill}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}
