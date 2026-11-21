import screenshot from "../assets/screenshot-blurry.png";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import AppContent from "../components/AppContent";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Blurry",
  description:
    "AI Text Editor allows you to quickly and easily detect and edit text within your images",
};

export default function Apps({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const appURL = "https://apps.apple.com/us/app/blurry-text-privacy/id6504585179";
  const androidAppUrl =
    "https://play.google.com/store/apps/details?id=com.hexaapps.hexa_blurry";
  const appName = "Blurry";

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
          screenshot={screenshot}
          title="Secure your privacy"
          p="AI Text Editor allows you to quickly and easily detect and edit text within your images! Utilizing cutting-edge artificial intelligence, our app automatically identifies text in your pictures and lets you highlight, blur, or completely hide it as per your needs."
          appURL={appURL}
          androidAppUrl={androidAppUrl}
        />
      </Layout>
    );
  }
}
