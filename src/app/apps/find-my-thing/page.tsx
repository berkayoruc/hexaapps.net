import screenshot from "../assets/screenshot-fmt.png";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import AppContent from "../components/AppContent";

export const metadata = {
  title: "Find My Thing",
  description: "iOS app to help you find your things",
};

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
