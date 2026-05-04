import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';
import copy from '@/copy.json';

export const metadata: Metadata = {
  title: `About - ${copy.meta.title}`,
  description:
    "Learn about Felix Zhang's 6+ years building scalable web apps, cloud infrastructure, and digital experiences at MediaMonks, Meta, and more. Based in Toronto, Canada.",
  openGraph: {
    title: 'About Felix Zhang',
    description:
      'Full-Stack Engineer specializing in cloud infrastructure, backend systems, and scalable web applications',
    url: `${copy.meta.url}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Felix Zhang',
    description:
      'Full-Stack Engineer specializing in cloud infrastructure, backend systems, and scalable web applications',
  },
};

export default function About() {
  return <AboutPage />;
}
