import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "go-eCharger Şarj Geçmişi",
  description:
    "go-eCharger cihazınızın şarj oturumlarını, harcanan enerjiyi ve şarj sürelerini tek sayfada görüntüleyin.",
  path: "/apps/goe-summary",
});

export default function GoeSummaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
