import { pageMetadata } from "../../lib/seo";
// import screenshot from "../assets/screenshot-blurry.png";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import AppContent from "../components/AppContent";
import { redirect } from "next/navigation";

export const metadata = pageMetadata({
  title: "Find Minifigures — Identify Collectible Minifigures",
  description:
    "Find Minifigures helps you identify which collectible minifigure is inside a blind bag, track your collection and avoid duplicates.",
  path: "/apps/findminifigures",
});

export default function Apps({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const appURL = "https://apps.apple.com/us/app/find-minifig/id6746837953";
  const androidAppUrl =
    "https://play.google.com/store/apps/details?id=com.hexaapps.find_mini_figures";
  const appName = "Find Minifigures";

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
      <Layout decor="detail">
        <Header appName={appName} appURL={appURL} backPath="/apps" />
        <AppContent
          appName={appName}
          screenshot={"screenshot"}
          title="Find collectible minifigures"
          p="Unlock the mystery of your Lego® Collectible Minifigures! 'Find Minifigures' helps you identify which character is hiding inside those blind bags. Use our intuitive QR scanner for instant reveals on supported series, or explore detailed visual guides and checklists for all others. Track your collection, avoid unwanted duplicates, and complete your sets with ease!"
          appURL={appURL}
          androidAppUrl={androidAppUrl}
        />
      </Layout>
    );
  }
}
