import type { Metadata } from "next";
import {
  Inter,
  Space_Grotesk,
  Fraunces,
  Syne,
  Cormorant_Garamond,
  JetBrains_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import { SITE_URL, BUSINESS } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Faces used only inside the Power and Furniture worlds. next/font emits the
// @font-face rules globally but browsers fetch a face only when it's used.
const worldDisplay = Syne({
  variable: "--font-world-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const worldSerif = Cormorant_Garamond({
  variable: "--font-world-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const TITLE = `${BUSINESS.name} — ${BUSINESS.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${BUSINESS.name}`,
  },
  description: BUSINESS.description,
  applicationName: BUSINESS.name,
  keywords: [
    "smart home",
    "smart switches",
    "touch panel",
    "home automation",
    "smart switches India",
    "Aaro Tec",
    "portable power station",
    "home power backup",
    "solid wood furniture",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: BUSINESS.name,
    title: TITLE,
    description: BUSINESS.description,
    url: SITE_URL,
    locale: "en_IN",
    images: [{ url: BUSINESS.ogImage, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: BUSINESS.description,
    images: [BUSINESS.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${serif.variable} ${worldDisplay.variable} ${worldSerif.variable} ${mono.variable} antialiased`}
    >
      <body>
        <LocalBusinessJsonLd />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
