import { pageMetadata } from "../../lib/seo";
import screenshot from "../assets/screenshot-fmt.png";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import AppContent from "../components/AppContent";

export const metadata = pageMetadata({
  title: "Find My Thing — Remember Where You Put Things",
  description:
    "Find My Thing is an iOS app that saves where your things are, with text recognition, location saving and Apple Maps support.",
  path: "/apps/find-my-thing",
});

export default function Apps() {
  const appURL = "https://apps.apple.com/us/app/find-my-thing/id1636212988";
  const appName = "Find My Thing";
  return (
    <Layout decor="detail">
      <Header appName={appName} appURL={appURL} backPath="/apps" />
      <AppContent
          appName={appName}
        screenshot={screenshot}
        title="A new way to save things"
        p="Text recognition, location save, open with Apple Maps, and more."
        appURL={appURL}
      />
    </Layout>
  );
}
