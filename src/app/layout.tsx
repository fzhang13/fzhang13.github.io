import type { Metadata } from 'next';
import './globals.css';
import copy from '@/copy.json';
import FaviconPulse from '@/components/FaviconPulse';
import { ThemeProvider } from '@/context/ThemeContext';
import { JetBrains_Mono, Space_Grotesk, Inter } from 'next/font/google';

// Optimize font loading with Next.js
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: false, // Not critical
});

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  keywords: copy.meta.keywords,
  authors: [{ name: 'Felix Zhang' }],
  creator: 'Felix Zhang',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: copy.meta.url,
    title: copy.meta.title,
    description: copy.meta.ogDescription,
    siteName: copy.meta.siteName,
    images: [
      {
        url: `${copy.meta.url}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: copy.meta.title,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: copy.meta.title,
    description: copy.meta.ogDescription,
    images: [
      {
        url: `${copy.meta.url}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: copy.meta.title,
      },
    ],
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
    <html
      lang="en"
      data-theme="root"
      className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        {/* Favicons */}
        <link rel="shortcut icon" href="/fonts/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/fonts/favicon/favicon.svg"
        />
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
        {/* Performance: DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body>
        <ThemeProvider>
          <FaviconPulse />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
