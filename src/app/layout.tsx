import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";

import "@/app/globals.css";
import { SiteShell } from "@/components/layout/site-shell";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shivam Kumar Singla — AI Engineer & Full Stack Developer",
    template: "%s — Shivam Kumar Singla",
  },
  description:
    "Flagship portfolio of Shivam Kumar Singla — AI & Machine Learning Engineer specializing in Generative AI, Full-Stack Architectures, and Intelligent Web Products.",
  keywords: [
    "Shivam Kumar Singla",
    "SHK7057",
    "AI Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Generative AI",
    "React",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Shivam Kumar Singla" }],
  creator: "Shivam Kumar Singla",
  metadataBase: new URL("https://shivam-singla.dev"),
  openGraph: {
    title: "Shivam Kumar Singla — AI Engineer & Full Stack Developer",
    description:
      "Flagship portfolio of Shivam Kumar Singla — AI & Machine Learning Engineer specializing in Generative AI, Full-Stack Architectures, and Intelligent Web Products.",
    url: "https://shivam-singla.dev",
    siteName: "Shivam Kumar Singla Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Kumar Singla — AI Engineer & Full Stack Developer",
    description:
      "Flagship portfolio of Shivam Kumar Singla — AI & Machine Learning Engineer specializing in Generative AI and Full-Stack Systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`dark ${fontSans.variable} ${fontSerif.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
