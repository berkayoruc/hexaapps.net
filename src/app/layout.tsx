import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import type { Metadata } from "next";

// Fonts are self-hosted via @fontsource-variable packages instead of
// next/font/google, so the build never has to reach Google Fonts.

export const metadata: Metadata = {
  title: "Hexa Apps",
  description:
    "Small apps, made with care. Cozy games, focused utilities and web experiments by Hexa Apps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
