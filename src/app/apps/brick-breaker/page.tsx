import screenshot from "../assets/screenshot-brick-breaker.png";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import AppContent from "../components/AppContent";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Brick Breaker - Hexa",
  description: "Classic Arcade Puzzle Game",
};

export default function Apps({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const appURL =
    "https://apps.apple.com/us/app/brick-breaker-hexa/id6744274476";
  const androidAppUrl =
    "https://play.google.com/store/apps/details?id=com.hexaapps.hexa_brick_breaker";
  const appName = "Brick Breaker - Hexa";

  if (searchParams?.review === "true") {
    if (searchParams?.store === "android") {
      redirect(androidAppUrl);
      return null;
    } else if (searchParams?.store === "ios") {
      redirect(appURL);
      return null;
    }
  } else {
    return (
      <Layout>
        <Header appName={appName} appURL={appURL} backPath="/apps" />
        <AppContent
          screenshot={screenshot}
          title="Classic Arcade Puzzle Game"
          p="Break bricks, master physics, unleash your reflexes! Enjoy this classic arcade puzzle game on your device."
          appURL={appURL}
          androidAppUrl={androidAppUrl}
        />
      </Layout>
    );
  }
}
