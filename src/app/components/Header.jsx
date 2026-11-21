import Link from "next/link";
import Logo from "./Logo";

/**
 * Sub-page header: logo, breadcrumb back to the parent page and an
 * optional download button.
 */
const Header = ({ appName = "", appURL = "", backPath = "" }) => {
  const backLabel = backPath === "/apps" ? "Apps" : "Home";
  return (
    <header className="relative mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-6">
      <div className="flex items-center gap-3 sm:gap-5">
        {backPath && (
          <Link
            href={backPath}
            aria-label={`Back to ${backLabel}`}
            className="flex h-12 w-12 items-center justify-center rounded-[14px] border-[1.5px] border-ink bg-white shadow-pop-sm transition-transform hover:-translate-y-0.5 sm:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </Link>
        )}
        <Logo />
        {backPath && appName && (
          <nav aria-label="Breadcrumb" className="hidden items-center gap-2 text-sm text-muted sm:flex">
            <Link href={backPath} className="px-1 py-3 hover:text-ink">
              {backLabel}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-ink">{appName}</span>
          </nav>
        )}
      </div>
      {appURL && (
        <Link
          href={appURL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-accent"
        >
          Download
        </Link>
      )}
    </header>
  );
};

export default Header;
