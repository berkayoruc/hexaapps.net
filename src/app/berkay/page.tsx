import { pageMetadata } from "../lib/seo";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Content from "./components/Content/Content";

export const metadata = pageMetadata({
  title: "Berkay Oruç",
  description:
    "Berkay Oruç is a geomatics engineer and frontend developer who builds web, iOS and Android apps at Hexa Apps.",
  path: "/berkay",
});

export default function Apps() {
  return (
    <Layout>
      <Header backPath="/" appName="Berkay" />
      <Content />
    </Layout>
  );
}
