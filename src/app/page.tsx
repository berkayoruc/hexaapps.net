import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "./components/SiteNav";
import HexDecor from "./components/HexDecor";
import Hexagon, { HEX_PATH } from "./components/Hexagon";
import AppGrid from "./components/AppGrid";
import Footer from "./components/Footer";
import StoreBadges from "./components/StoreBadges";
import { apps } from "./data/apps";
import trimAndTend from "./apps/assets/screenshot-trim-and-tend.png";
import brickBreaker from "./apps/assets/screenshot-brick-breaker.png";
import pawsPuzzle from "./apps/assets/screenshot-paws-puzzle.png";

const STRIP = [
  ["Trim & Tend", "#121417"],
  ["Brick Breaker", "#FF7759"],
  ["Paws Puzzle", "#121417"],
  ["Blurry", "#2B4EE6"],
  ["Find My Thing", "#121417"],
  ["Breather", "#FF7759"],
  ["Tab Tracker", "#121417"],
  ["Hexa Weight Tracker", "#2B4EE6"],
  ["Sandalyemi Şarj Et", "#121417"],
];

const TEAM = [
  { name: "Alihan", href: "/alihan", role: "Frontend Developer", bg: "bg-peri-tint", hex: "#121417" },
  { name: "Berkay", href: "/berkay", role: "Frontend Developer", bg: "bg-sun-tint", hex: "#2B4EE6" },
];

function Phone({
  src,
  className,
  priority,
}: {
  src: typeof trimAndTend;
  className: string;
  priority?: boolean;
}) {
  return (
    <div className={`absolute box-border bg-ink ${className}`}>
      <Image
        src={src}
        alt=""
        priority={priority}
        sizes="256px"
        className="block h-full w-full rounded-[inherit] object-cover"
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-49BZHMMWXC"></Script>
      <Script id="google-analytics">
        {`
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', 'G-49BZHMMWXC');
		`}
      </Script>

      <div className="relative overflow-x-clip">
        <HexDecor variant="home" />
        <SiteNav />

        <main className="relative">
          {/* HERO */}
          <section
            id="top"
            className="mx-auto flex max-w-[1240px] flex-col gap-10 px-4 pb-12 pt-7 sm:px-8 sm:pb-24 sm:pt-[72px] lg:flex-row lg:items-center lg:gap-16"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-5 sm:gap-7">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-white px-3 py-[7px] text-[11px] font-semibold uppercase tracking-[0.04em] text-muted sm:px-3.5 sm:py-2 sm:text-[13px]">
                <Hexagon fill="#34C99A" className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                Independent studio · iOS · Android · Web
              </span>
              <h1 className="font-display text-[46px] font-bold leading-none tracking-[-0.035em] sm:text-[clamp(56px,6vw,84px)] sm:leading-[0.98]">
                Small apps,
                <br />
                made with{" "}
                <span className="inline-block -rotate-2 rounded-[14px] bg-sun px-2.5 sm:rounded-[18px] sm:px-3.5">
                  care.
                </span>
              </h1>
              <p className="max-w-[34ch] text-[17px] leading-relaxed text-muted sm:text-xl">
                Cozy games, focused utilities and a few web experiments — built
                by two developers who like simple things that work.
              </p>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:pt-2">
                <Link
                  href="#apps"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-accent px-[26px] font-semibold text-white shadow-[0_5px_0_#121417] transition-transform hover:-translate-y-0.5 sm:shadow-pop"
                >
                  Browse all apps
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <Link
                  href="/apps/trim-and-tend"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-ink bg-white px-[26px] font-semibold transition-colors hover:bg-sun-tint"
                >
                  New: Trim &amp; Tend
                </Link>
              </div>
            </div>

            {/* Phone stack */}
            <div aria-hidden="true" className="relative h-[380px] min-w-0 flex-none sm:h-[560px] lg:flex-1">
              <Phone
                src={pawsPuzzle}
                className="left-2 top-12 h-[280px] w-[136px] -rotate-[9deg] rounded-[26px] p-1.5 sm:left-[4%] sm:top-16 sm:h-[452px] sm:w-[220px] sm:-rotate-[8deg] sm:rounded-[36px] sm:p-2"
              />
              <Phone
                src={brickBreaker}
                className="right-2 top-12 h-[280px] w-[136px] rotate-[9deg] rounded-[26px] p-1.5 sm:right-[4%] sm:top-16 sm:h-[452px] sm:w-[220px] sm:rotate-[8deg] sm:rounded-[36px] sm:p-2"
              />
              <Phone
                src={trimAndTend}
                priority
                className="left-1/2 top-0 -ml-[86px] h-[360px] w-[172px] rounded-[32px] p-[7px] shadow-phone sm:-ml-32 sm:h-[528px] sm:w-64 sm:rounded-[42px] sm:p-[9px]"
              />
            </div>
          </section>

          {/* TILTED STRIP */}
          <div
            aria-hidden="true"
            className="-mx-8 mb-14 -rotate-3 overflow-hidden whitespace-nowrap border-y-2 border-ink bg-sun py-3 sm:-mx-10 sm:mb-28 sm:-rotate-2 sm:py-[18px]"
          >
            <div className="flex items-center gap-[18px] pl-8 font-display text-xl font-bold tracking-tight sm:gap-7 sm:text-[28px]">
              {STRIP.map(([name, color], i) => (
                <span key={name} className="flex items-center gap-[18px] sm:gap-7">
                  <span>{name}</span>
                  {i < STRIP.length - 1 && (
                    <svg viewBox="0 0 100 100" className="h-3 w-3 sm:h-[18px] sm:w-[18px]">
                      <path d={HEX_PATH} fill={color} />
                    </svg>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* FEATURED */}
          <section id="games" className="mx-auto max-w-[1240px] scroll-mt-6 px-4 pb-14 sm:px-8 sm:pb-28">
            <div className="relative flex flex-col gap-5 overflow-hidden rounded-[28px] bg-ink p-6 text-paper sm:rounded-[32px] sm:p-14 lg:flex-row-reverse lg:items-center lg:gap-14">
              <Hexagon fill="#34C99A" outline strokeWidth={5} className="absolute -right-12 -top-12 h-40 w-40 lg:-bottom-24 lg:-right-[70px] lg:top-auto lg:h-[260px] lg:w-[260px]" />
              <Hexagon fill="#FFC94A" className="absolute left-[48%] top-7 hidden h-11 w-11 rotate-[16deg] lg:block" />

              <div className="relative flex min-w-0 flex-1 justify-center">
                <div className="aspect-[4/3] w-full max-w-[480px] overflow-hidden rounded-[18px] border-[3px] border-paper bg-[#22252A] sm:rounded-3xl lg:rotate-2">
                  <Image
                    src={trimAndTend}
                    alt="Trim & Tend gameplay screenshot"
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="block h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="relative flex min-w-0 flex-1 flex-col gap-[18px] sm:gap-5">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-sun sm:text-[13px]">
                  Featured game
                </span>
                <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-[52px]">
                  Trim &amp; Tend
                </h2>
                <p className="max-w-[46ch] leading-relaxed text-[#C9CBCE] sm:text-lg">
                  Mow lawns, prune trees and shape hedges at your uncle&apos;s
                  landscaping firm. Bid on city contracts, grow seedlings and
                  climb the weekly gardener leaderboard.
                </p>
                <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                  {["No ads", "No real-money purchases", "Plays offline"].map((t) => (
                    <li key={t} className="rounded-full bg-paper/10 px-3 py-1.5 text-[13px] sm:px-3.5 sm:py-2 sm:text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-3 pt-1 sm:pt-3">
                  <StoreBadges
                    onDark
                    appURL="https://apps.apple.com/tr/app/trim-tend/id6822917300"
                    androidAppUrl="https://play.google.com/store/apps/details?id=com.hexaapps.trimgardentend"
                  />
                  <Link href="/apps/trim-and-tend" className="px-2 py-3.5 font-semibold text-sun hover:underline">
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ALL APPS */}
          <section id="apps" className="mx-auto max-w-[1240px] scroll-mt-6 px-4 pb-14 sm:px-8 sm:pb-28">
            <div className="flex flex-col gap-2 pb-4 sm:gap-3 sm:pb-6">
              <h2 className="font-display text-[34px] font-bold tracking-[-0.03em] sm:text-5xl">
                Everything we&apos;ve made
              </h2>
              <p className="text-[15px] text-muted sm:text-[17px]">
                {apps.length} products across games, mobile apps and the web.
              </p>
            </div>
            <AppGrid />
          </section>

          {/* TEAM */}
          <section id="team" className="mx-auto flex max-w-[1240px] scroll-mt-6 flex-col gap-4 px-4 pb-14 sm:px-8 sm:pb-28 lg:flex-row lg:gap-12">
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <h2 className="font-display text-[34px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                Two developers,
                <br />
                one hexagon.
              </h2>
              <p className="max-w-[40ch] leading-relaxed text-muted sm:text-[17px]">
                Hexa Apps is a side studio. We design, build and ship everything
                ourselves — from the first sketch to the store listing.
              </p>
            </div>
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-3 pt-1 sm:gap-5">
              {TEAM.map((m) => (
                <Link
                  key={m.name}
                  href={m.href}
                  className={`flex flex-col gap-3 rounded-[20px] border-[1.5px] border-ink p-[18px] shadow-pop-sm transition-transform hover:-translate-y-1 sm:gap-4 sm:rounded-3xl sm:p-7 sm:shadow-pop ${m.bg}`}
                >
                  <svg viewBox="0 0 100 100" aria-hidden="true" className="h-12 w-12 sm:h-16 sm:w-16">
                    <path d={HEX_PATH} fill={m.hex} stroke={m.hex} strokeWidth="6" strokeLinejoin="round" />
                    <text x="50" y="62" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="34" fill="#FFFFFF">
                      {m.name[0]}
                    </text>
                  </svg>
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-[19px] font-semibold sm:text-[22px]">{m.name}</span>
                    <span className="text-[13px] text-[#3A3D42] sm:text-[15px]">{m.role}</span>
                  </span>
                  <span className="hidden text-[15px] font-semibold sm:block">Profile →</span>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
