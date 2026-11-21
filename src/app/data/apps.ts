import type { StaticImageData } from "next/image";
import trimAndTend from "../apps/assets/screenshot-trim-and-tend.png";
import brickBreaker from "../apps/assets/screenshot-brick-breaker.png";
import pawsPuzzle from "../apps/assets/screenshot-paws-puzzle.png";
import blurry from "../apps/assets/screenshot-blurry.png";
import findMyThing from "../apps/assets/screenshot-fmt.png";
import weight from "../apps/assets/screenshot-weight.png";
import breather from "../apps/assets/screenshot-breather.png";

export type AppCategory = "games" | "mobile" | "web";

export type HexaApp = {
  name: string;
  desc: string;
  platform: string;
  category: AppCategory;
  href: string;
  external?: boolean;
  image?: StaticImageData;
  mono?: string;
};

export const apps: HexaApp[] = [
  {
    name: "Trim & Tend",
    desc: "A cozy gardening game. Mow, prune and grow your landscaping firm.",
    platform: "iOS · Android",
    category: "games",
    href: "/apps/trim-and-tend",
    image: trimAndTend,
  },
  {
    name: "Brick Breaker – Hexa",
    desc: "Classic arcade puzzle game. Break bricks, master physics.",
    platform: "iOS · Android",
    category: "games",
    href: "/apps/brick-breaker",
    image: brickBreaker,
  },
  {
    name: "Paws Puzzle Slidr",
    desc: "Cute animal sliding puzzles — 500+ levels across 50 worlds.",
    platform: "iOS · Android",
    category: "games",
    href: "/apps/paws-puzzle",
    image: pawsPuzzle,
  },
  {
    name: "Blurry",
    desc: "AI text editor that finds text in your images so you can blur or hide it.",
    platform: "iOS · Android",
    category: "mobile",
    href: "/apps/blurry",
    image: blurry,
  },
  {
    name: "Find My Thing",
    desc: "Save where things are with text recognition and location.",
    platform: "iOS",
    category: "mobile",
    href: "/apps/find-my-thing",
    image: findMyThing,
  },
  {
    name: "Hexa Weight Tracker",
    desc: "A quick and simple way to track your weight, with charts.",
    platform: "iOS",
    category: "mobile",
    href: "/apps/hexa-weight-tracker",
    image: weight,
  },
  {
    name: "Breather",
    desc: "Guided breathing exercises to help you relax and focus.",
    platform: "iOS",
    category: "mobile",
    href: "/apps/breather",
    image: breather,
  },
  {
    name: "Tab Tracker",
    desc: "A Chrome extension that keeps track of your tabs.",
    platform: "Chrome extension",
    category: "web",
    href: "https://chromewebstore.google.com/detail/tab-tracker/effjhkgfakdenmlpfeadfcdofghpffki",
    external: true,
    mono: "Tt",
  },
  {
    name: "Sandalyemi Şarj Et",
    desc: "Belediyelerin ücretsiz şarj istasyonlarını bulun.",
    platform: "Web",
    category: "web",
    href: "https://sandalyemisarjet.com/",
    external: true,
    mono: "Ş",
  },
  {
    name: "100times.blog",
    desc: "An AI-generated entrepreneurial blog.",
    platform: "Web",
    category: "web",
    href: "https://100times.blog/home/",
    external: true,
    mono: "100",
  },
  {
    name: "Create Element",
    desc: "A basic UI-building library on npm.",
    platform: "npm package",
    category: "web",
    href: "https://www.npmjs.com/package/ardelon-create-element",
    external: true,
    mono: "</>",
  },
];

export const categoryTint: Record<AppCategory, string> = {
  games: "bg-sun-tint",
  mobile: "bg-peri-tint",
  web: "bg-mint-tint",
};

const normalize = (s: string) => s.toLowerCase().replace(/[–—-]/g, "-").replace(/\s+/g, " ").trim();

/** Finds an app by display name, ignoring case and dash style. */
export const findApp = (name: string) =>
  apps.find((a) => normalize(a.name) === normalize(name));
