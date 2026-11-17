import screenshot from "../assets/screenshot-trim-and-tend.png";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import AppContent from "../components/AppContent";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Trim & Tend - Hexa",
  description: "A Cozy Gardening Game",
};

export default function Apps({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // TODO: add the App Store URL once the iOS listing is live
  const appURL = "";
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
    <Layout>
      <Header
        appName={appName}
        appURL={appURL || androidAppUrl}
        backPath="/apps"
      />
      <AppContent
        screenshot={screenshot}
        title="A Cozy Gardening Game"
        p="Mow lawns, prune trees and shape hedges at your uncle's landscaping firm. Bid on city contracts, grow seedlings and climb the weekly gardener leaderboard. No ads, no real-money purchases, no internet needed."
        appURL={appURL}
        androidAppUrl={androidAppUrl}
      />
    </Layout>
  );
}
