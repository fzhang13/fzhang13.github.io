import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import copy from "@/copy.json";
import FaviconPulse from "@/components/FaviconPulse";

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  keywords: copy.meta.keywords,
  authors: [{ name: "Felix Zhang" }],
  creator: "Felix Zhang",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: copy.meta.url,
    title: copy.meta.title,
    description: copy.meta.ogDescription,
    siteName: copy.meta.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.variable}`}>
      <head>
        <link rel="shortcut icon" href="/fonts/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/fonts/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/fonts/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/fonts/favicon/favicon-16x16.png"
        />
      </head>
      <body className="antialiased">
        <FaviconPulse />
        {children}
      </body>
    </html>
  );
}
