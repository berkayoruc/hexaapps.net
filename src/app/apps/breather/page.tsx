import { pageMetadata } from "../../lib/seo";
import screenshot from "../assets/screenshot-breather.png";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import AppContent from "../components/AppContent";
import { redirect } from "next/navigation";

export const metadata = pageMetadata({
  title: "Breather — Guided Breathing Exercises",
  description:
    "Breather is an iOS app with guided breathing exercises that help you relax and focus.",
  path: "/apps/breather",
});

export default function Apps({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const appURL = "https://apps.apple.com/us/app/lung-test/id6473705672";
  const appName = "Breather";

  if (searchParams?.review === "true") {
    redirect(appURL);
    return null;
  } else {
    return (
      <Layout decor="detail">
        <Header appName={appName} appURL={appURL} backPath="/apps" />
        <AppContent
          appName={appName}
          screenshot={screenshot}
          title="Breathe easy"
          p="Breather is a simple app that helps you to relax and focus on your breathing. It guides you through a series of breathing exercises that help you to relax and focus."
          appURL={appURL}
        />
      </Layout>
    );
  }
}
