import Layout from "../components/Layout";
import Header from "../components/Header";
import AppGrid from "../components/AppGrid";
import { apps } from "../data/apps";

export const metadata = {
  title: "Apps - Hexa Apps",
  description: "Games, mobile apps and web tools made by Hexa Apps.",
};

export default function Apps() {
  return (
    <Layout decor="home">
      <Header backPath="/" />
      <main className="mx-auto max-w-[1240px] px-4 pb-14 pt-6 sm:px-8 sm:pb-28 sm:pt-12">
        <div className="flex flex-col gap-2 pb-4 sm:gap-3 sm:pb-6">
          <h1 className="font-display text-[40px] font-bold leading-none tracking-[-0.035em] sm:text-7xl">
            Everything we&apos;ve{" "}
            <span className="inline-block -rotate-2 rounded-[14px] bg-sun px-2.5 sm:rounded-[18px] sm:px-3.5">
              made.
            </span>
          </h1>
          <p className="pt-2 text-[15px] text-muted sm:text-[17px]">
            {apps.length} products across games, mobile apps and the web.
          </p>
        </div>
        <AppGrid />
      </main>
    </Layout>
  );
}
