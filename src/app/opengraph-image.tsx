import { renderOgImage, ogSize } from "./lib/og";

export const alt = "Hexa Apps — Small apps, made with care.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
