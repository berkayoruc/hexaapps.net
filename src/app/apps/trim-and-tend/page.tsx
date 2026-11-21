import screenshot from "../assets/screenshot-trim-and-tend.png";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import AppContent from "../components/AppContent";
import PruningDemo from "./PruningDemo";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Trim & Tend - Hexa",
  description: "A Cozy Gardening Game",
};

const FEATURES = [
  {
    title: "Mow, prune, shape",
    text: "Tidy lawns, trim trees and sculpt hedges with satisfying, hands-on tools.",
    icon: (
      <>
        <path d="M3 20h18M6 20V10l6-6 6 6v10" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
  },
  {
    title: "Bid on contracts",
    text: "Win city jobs and grow your uncle's landscaping firm one yard at a time.",
    icon: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M8 9h8M8 13h8M8 17h5" />
      </>
    ),
  },
  {
    title: "Grow seedlings",
    text: "Raise your own plants and use them to finish bigger, prettier gardens.",
    icon: (
      <>
        <path d="M12 21V11" />
        <path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6zM12 13c0-3-2-5-6-5 0 3 2 5 6 5z" />
      </>
    ),
  },
  {
    title: "Weekly leaderboard",
    text: "Climb the gardener rankings and see how your work stacks up each week.",
    icon: (
      <>
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" />
        <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
      </>
    ),
  },
];

const HIGHLIGHTS = [
  { title: "No ads", text: "Nothing interrupts your garden." },
  { title: "No real-money purchases", text: "Buy once, play the whole game." },
  { title: "Fully offline", text: "No internet connection needed." },
];

export default function Apps({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const appURL = "https://apps.apple.com/tr/app/trim-tend/id6822917300";
  const androidAppUrl =
    "https://play.google.com/store/apps/details?id=com.hexaapps.trimgardentend";
  const appName = "Trim & Tend";

  if (searchParams?.review === "true") {
    if (searchParams?.store === "android") {
      redirect(androidAppUrl);
      return null;
    } else if (searchParams?.store === "ios" && appURL) {
      redirect(appURL);
      return null;
    }
  }

  return (
    <Layout decor="detail">
      <Header
        appName={appName}
        appURL={appURL || androidAppUrl}
        backPath="/apps"
      />
      <AppContent
          appName={appName}
        screenshot={screenshot}
        title="A Cozy Gardening Game"
        p="Mow lawns, prune trees and shape hedges at your uncle's landscaping firm. Bid on city contracts, grow seedlings and climb the weekly gardener leaderboard. No ads, no real-money purchases, no internet needed."
        appURL={appURL}
        androidAppUrl={androidAppUrl}
        features={FEATURES}
        highlights={HIGHLIGHTS}
        media={
          <PruningDemo
            storeUrl={appURL || androidAppUrl}
            fallback={screenshot}
          />
        }
      />
    </Layout>
  );
}
