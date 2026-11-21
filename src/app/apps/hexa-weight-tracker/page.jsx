import Layout from "../../components/Layout";
import Header from "../../components/Header";
import AppContent from "../components/AppContent";
import screenshot from "../assets/screenshot-weight.png";

export const metadata = {
  title: "Hexa Weight Tracker",
  description: "Track your weight with an app that's as simple as it gets.",
};

export default function Apps() {
  const appURL =
    "https://apps.apple.com/us/app/hexa-weight-tracker/id6443335021";
  const appName = "Hexa Weight Tracker";
  return (
    <Layout decor="detail">
      <Header appName={appName} appURL={appURL} backPath="/apps" />
      <AppContent
          appName={appName}
        screenshot={screenshot}
        title="A quick and simple way to track your weight"
        p="Different time periods, various charts, easy to track weight, and more."
        appURL={appURL}
      />
    </Layout>
  );
}
