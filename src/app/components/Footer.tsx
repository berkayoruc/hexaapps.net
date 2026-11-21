import Link from "next/link";
import { LogoMark } from "./Logo";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-[#C9CBCE]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-8 sm:py-10">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-[22px] w-[22px]" outer="#F4F4F1" inner="#FFC94A" />
          <span>© {new Date().getFullYear()} Hexa Apps</span>
        </div>
        <nav aria-label="Footer" className="-ml-3 flex flex-wrap gap-1 sm:ml-0">
          <Link href="/apps" className="p-3 hover:text-white">Apps</Link>
          <Link href="/#team" className="p-3 hover:text-white">Team</Link>
          <Link href="/berkay" className="p-3 hover:text-white">Berkay</Link>
          <Link href="/alihan" className="p-3 hover:text-white">Alihan</Link>
          <a href="mailto:hexagameapps@gmail.com" className="p-3 hover:text-white">
            hexagameapps@gmail.com
          </a>
        </nav>
      </div>
    </footer>
  );
}
