import { pageMetadata } from "../lib/seo";
import Content from "../berkay/components/AlihanContent/Content";
import Header from "../components/Header";
import Layout from "../components/Layout";

export const metadata = pageMetadata({
  title: "Alihan Keskin",
  description:
    "Alihan Keskin is a frontend developer and co-founder of Hexa Apps.",
  path: "/alihan",
});

export default function Apps() {
  return (
    <Layout>
      <Header backPath="/" appName="Alihan" />
      <Content />
    </Layout>
  );
}
