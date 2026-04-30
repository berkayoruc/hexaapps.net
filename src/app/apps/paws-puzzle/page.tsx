import screenshot from "../assets/screenshot-paws-puzzle.png";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import AppContent from "../components/AppContent";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Paws Puzzle Slidr - Hexa",
  description: "Cute Animal Sliding Puzzle Game",
};

export default function Apps({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const appURL =
    "https://apps.apple.com/tr/app/paws-puzzle-sliding-tiles/id6762161043";
  const androidAppUrl =
    "https://play.google.com/store/apps/details?id=com.hexaapps.paws_puzzle_slidr";
  const appName = "Paws Puzzle Slidr";

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
          title="Cute Animal Sliding Puzzle Game"
          p="Slide your way into fun! Solve beautiful animal-themed puzzles featuring 500+ levels across 50 unique worlds. Unlock rewards and master the slide!"
          appURL={appURL}
          androidAppUrl={androidAppUrl}
        />
      </Layout>
    );
  }
}
