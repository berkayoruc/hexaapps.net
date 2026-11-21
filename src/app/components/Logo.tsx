import Link from "next/link";

export function LogoMark({ className = "h-9 w-9", inner = "#2B4EE6", outer = "#121417" }) {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" className={className}>
      <path d="M18 2 32 10v16L18 34 4 26V10Z" fill={outer} />
      <path d="M18 11 24 14.5v7L18 25l-6-3.5v-7Z" fill={inner} />
    </svg>
  );
}

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-3">
      <LogoMark className="h-8 w-8 sm:h-9 sm:w-9" />
      <span className="font-display text-[19px] font-bold tracking-tight sm:text-xl">
        hexa apps
      </span>
    </Link>
  );
}
