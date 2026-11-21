import Image from "next/image";
import Link from "next/link";
import appStoreBlack from "../apps/assets/appstore/US/black.svg";
import appStoreWhite from "../apps/assets/appstore/US/white.svg";
import googlePlay from "../apps/assets/google_play.png";

/** Official App Store / Google Play badges. */
export default function StoreBadges({
  appURL,
  androidAppUrl,
  onDark = false,
  small = false,
  className = "",
}: {
  appURL?: string;
  androidAppUrl?: string;
  onDark?: boolean;
  /** Smaller badges that fit side by side on a phone. */
  small?: boolean;
  className?: string;
}) {
  if (!appURL && !androidAppUrl) return null;
  const h = small ? "h-11" : "h-[52px]";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {appURL && (
        <Link href={appURL} target="_blank" rel="noopener noreferrer" className="transition-transform hover:-translate-y-0.5">
          <Image src={onDark ? appStoreWhite : appStoreBlack} alt="Download on the App Store" className={`${h} w-auto`} />
        </Link>
      )}
      {androidAppUrl && (
        <Link href={androidAppUrl} target="_blank" rel="noopener noreferrer" className="transition-transform hover:-translate-y-0.5">
          <Image src={googlePlay} alt="Get it on Google Play" className={`${h} w-auto`} />
        </Link>
      )}
    </div>
  );
}
