import type { MetadataRoute } from "next";
import { apps } from "./data/apps";
import { SITE_URL } from "./lib/seo";

// Pages that exist but are not in the main app list.
const EXTRA_PATHS = [
  "/apps/findminifigures",
  "/apps/goe-summary",
  "/apps/blurry/privacy",
  "/apps/blurry/terms",
  "/apps/find-my-thing/privacy",
  "/apps/find-my-thing/terms",
  "/berkay",
  "/alihan",
];

// Next 13.4's sitemap type supports only url and lastModified.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const appPaths = apps.filter((a) => !a.external).map((a) => a.href);
  return ["/", "/apps", ...appPaths, ...EXTRA_PATHS].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  }));
}
