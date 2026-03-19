import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Felix Zhang | Full-Stack Engineer",
  description:
    "Felix Zhang is a Full-Stack Engineer with 6+ years of experience delivering scalable web applications, cloud infrastructure, and digital experiences. Based in Toronto, Canada.",
  keywords: [
    "Felix Zhang",
    "Cloud Engineer",
    "Backend Developer",
    "AWS",
    "Software Engineer",
    "Toronto",
    "DevOps",
    "Infrastructure",
    "Serverless",
    "Distributed Systems",
  ],
  authors: [{ name: "Felix Zhang" }],
  creator: "Felix Zhang",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fzhang13.github.io",
    title: "Felix Zhang | Full-Stack Engineer",
    description:
      "Full-Stack Engineer with 6+ years of experience delivering scalable web applications, cloud infrastructure, and digital experiences.",
    siteName: "Felix Zhang Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felix Zhang | Full-Stack Engineer",
    description:
      "Full-Stack Engineer with 6+ years of experience delivering scalable web applications, cloud infrastructure, and digital experiences.",
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
    <html lang="en" className="scroll-smooth">
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
