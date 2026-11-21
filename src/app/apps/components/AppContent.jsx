import Link from "next/link";
import Image from "next/image";
import StoreBadges from "../../components/StoreBadges";
import Hexagon from "../../components/Hexagon";
import { apps, categoryTint, findApp } from "../../data/apps";

const FEATURE_TINTS = ["bg-mint-tint", "bg-sun-tint", "bg-coral-tint", "bg-peri-tint"];
const HIGHLIGHT_COLORS = ["text-sun", "text-mint", "text-coral-light"];

/**
 * App detail template.
 * - `appName` looks the app up in data/apps for its category, platform and
 *   "more apps" suggestions.
 * - `features` ({ title, text, icon? }[]) and `highlights` ({ title, text }[])
 *   are optional extra sections.
 */
const AppContent = ({
  screenshot,
  title,
  p,
  appName = "",
  appURL = "",
  androidAppUrl = "",
  media = /** @type {import("react").ReactNode} */ (null),
  features = [],
  highlights = [],
}) => {
  const app = findApp(appName);
  const isGame = app?.category === "games";
  const tag = [isGame ? "Game" : "App", app?.platform].filter(Boolean).join(" · ");
  const more = app
    ? apps.filter((a) => a.name !== app.name && a.category === app.category).slice(0, 3)
    : [];
  const hasImage = screenshot && typeof screenshot === "object";

  return (
    <main className="relative">
      {/* HERO */}
      <section className="mx-auto flex max-w-[1240px] flex-col gap-6 px-4 pb-12 pt-5 sm:px-8 sm:pb-28 sm:pt-14 md:flex-row md:items-center md:gap-[72px]">
        <div className="flex min-w-0 flex-1 flex-col gap-[18px] sm:gap-6">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <span className={`block h-16 w-16 overflow-hidden rounded-2xl border-2 border-ink sm:h-[72px] sm:w-[72px] sm:rounded-[18px] ${app ? categoryTint[app.category] : "bg-line"}`}>
              {hasImage && (
                <Image src={screenshot} alt="" sizes="72px" className="h-full w-full object-cover" />
              )}
            </span>
            <span className="flex flex-col gap-1.5">
              <span className="self-start rounded-full bg-sun-tint px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] sm:text-xs">
                {tag}
              </span>
              <span className="text-sm text-muted sm:text-[15px]">by Hexa Apps</span>
            </span>
          </div>
          {appName && (
            <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.035em] sm:text-[clamp(56px,6vw,80px)]">
              {appName}
            </h1>
          )}
          <p className="font-display text-[21px] font-medium tracking-[-0.01em] sm:text-[26px]">
            {title}
          </p>
          <p className="max-w-[48ch] leading-relaxed text-muted sm:text-lg">{p}</p>
          <StoreBadges appURL={appURL} androidAppUrl={androidAppUrl} className="hidden pt-2 sm:flex" />
        </div>

        <div className="flex min-w-0 flex-1 justify-center pt-4 md:pt-0">
          {media || (
            <div className="h-[476px] w-[230px] rotate-3 rounded-[38px] bg-ink p-2 shadow-phone sm:h-[620px] sm:w-[300px] sm:rounded-[48px] sm:p-2.5">
              {hasImage ? (
                <Image
                  src={screenshot}
                  alt={`${appName} screenshot`}
                  priority
                  sizes="300px"
                  className="block h-full w-full rounded-[30px] object-cover sm:rounded-[38px]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-[30px] bg-mint-tint sm:rounded-[38px]">
                  <Hexagon fill="#121417" className="h-20 w-20" />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      {features.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-4 pb-12 sm:px-8 sm:pb-24">
          <h2 className="mb-[18px] font-display text-[30px] font-bold tracking-[-0.03em] sm:mb-8 sm:text-[40px]">
            What you&apos;ll do
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] sm:gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`flex flex-col gap-2.5 rounded-[20px] border-[1.5px] border-ink p-4 shadow-pop-sm sm:gap-3.5 sm:rounded-3xl sm:p-7 sm:shadow-pop ${FEATURE_TINTS[i % FEATURE_TINTS.length]}`}
              >
                {f.icon && (
                  <svg className="h-[26px] w-[26px] sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {f.icon}
                  </svg>
                )}
                <h3 className="font-display text-[17px] font-semibold sm:text-[21px]">{f.title}</h3>
                <p className="text-[13px] leading-normal text-[#2E3135] sm:text-[15px]">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HIGHLIGHTS BAND */}
      {highlights.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-4 pb-12 sm:px-8 sm:pb-24">
          <div className="relative grid gap-[22px] overflow-hidden rounded-[28px] bg-ink px-6 py-7 text-paper sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:gap-8 sm:rounded-[32px] sm:px-14 sm:py-12">
            <Hexagon fill="#FFC94A" outline strokeWidth={5} className="absolute -right-12 -top-12 h-[150px] w-[150px] sm:-right-[60px] sm:-top-20 sm:h-[220px] sm:w-[220px]" />
            {highlights.map((h, i) => (
              <div key={h.title} className="relative flex flex-col gap-1 sm:gap-2">
                <span className={`font-display text-[26px] font-bold sm:text-[32px] ${HIGHLIGHT_COLORS[i % HIGHLIGHT_COLORS.length]}`}>
                  {h.title}
                </span>
                <span className="text-sm text-[#C9CBCE] sm:text-[15px]">{h.text}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MORE */}
      {more.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-4 pb-12 sm:px-8 sm:pb-24">
          <div className="flex items-center justify-between gap-3 pb-4 sm:items-end sm:pb-7">
            <h2 className="font-display text-[30px] font-bold tracking-[-0.03em] sm:text-[40px]">
              More {isGame ? "games" : "apps"}
            </h2>
            <Link href="/apps" className="py-3 text-[15px] font-semibold hover:text-accent sm:text-base">
              All apps →
            </Link>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] sm:gap-5">
            {more.map((m) => (
              <Link
                key={m.name}
                href={m.href}
                className="flex items-center gap-3.5 rounded-[20px] border-[1.5px] border-ink bg-white p-3 shadow-pop-sm transition-transform hover:-translate-y-1 sm:gap-5 sm:rounded-3xl sm:p-4 sm:shadow-pop"
              >
                <span className={`block h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl sm:h-[88px] sm:w-[88px] sm:rounded-[18px] ${categoryTint[m.category]}`}>
                  {m.image && <Image src={m.image} alt="" sizes="88px" className="h-full w-full object-cover" />}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-display text-lg font-semibold sm:text-xl">{m.name}</span>
                  <span className="text-[13px] text-muted sm:text-[15px]">{m.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* STICKY MOBILE DOWNLOAD BAR */}
      {(appURL || androidAppUrl) && (
        <div className="sticky bottom-0 z-10 flex justify-center border-t-[1.5px] border-ink bg-paper/95 px-4 pb-5 pt-3 backdrop-blur sm:hidden">
          <StoreBadges small appURL={appURL} androidAppUrl={androidAppUrl} className="flex-nowrap justify-center" />
        </div>
      )}
    </main>
  );
};

export default AppContent;
