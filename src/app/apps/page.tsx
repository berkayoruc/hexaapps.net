import Layout from "../components/Layout";
import Header from "../components/Header";
import AppButton from "../components/AppButton";

export const metadata = {
  title: "Apps",
  description: "Apps",
};

export default function Apps() {
  return (
    <Layout>
      <Header appName="Apps" backPath="/" />
      <main className="pb-24 text-4xl ">
        <div className="text-center flex flex-col lg:grid lg:grid-cols-3 gap-2">
          <AppButton
            appURL="/apps/brick-breaker"
            appName="Brick Breaker - Hexa"
            description="Classic Arcade Puzzle Game"
          />
          <AppButton
            appURL="/apps/paws-puzzle"
            appName="Paws Puzzle Slidr"
            description="Cute Animal Sliding Puzzle Game"
          />
          <AppButton
            appURL="/apps/find-my-thing"
            appName="Find My Thing"
            description="Find your thing with this app."
          />
          <AppButton
            appURL="/apps/hexa-weight-tracker"
            appName="Hexa Weight Tracker"
            description="Track your weight with this app."
          />
          <AppButton
            appURL="https://100times.blog/home/"
            appName="100times.blog"
            description="Ai generated entreprenerual blog."
            target="_blank"
          />
          <AppButton
            appURL="https://www.npmjs.com/package/ardelon-create-element"
            appName="Create Element"
            description="Basic UI building npm library"
            target="_blank"
          />
          <AppButton
            appURL="https://chromewebstore.google.com/detail/tab-tracker/effjhkgfakdenmlpfeadfcdofghpffki"
            appName="Tab Tracker"
            description="Tab tracking chrome extension."
            target="_blank"
          />

          <AppButton
            appURL="https://sandalyemisarjet.com/"
            appName="Sandalyemi Şarj Et"
            description="Belediyelerin ücretsiz şarj istasyonlarını bulun."
            target="_blank"
          />
          <AppButton
            appURL="/apps/breather"
            appName="Breather"
            description="iOS app to help you about breathing exercises."
          />
          <AppButton
            appURL="/apps/blurry"
            appName="Blurry"
            description="AI Text Editor allows you to quickly and easily detect and edit text within your images."
          />
        </div>
      </main>
    </Layout>
  );
}
