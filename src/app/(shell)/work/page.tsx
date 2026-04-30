import type { Metadata } from "next";
import WorkPage from '@/components/pages/WorkPage';
import copy from "@/copy.json";

export const metadata: Metadata = {
  title: `Work Experience - ${copy.meta.title}`,
  description: "Felix Zhang's work experience at MediaMonks, Meta, Palomino Systems - building Zoox.com, Novi.com, Monks.flow AI platform, Adidas experiences, and enterprise applications.",
  keywords: [
    ...copy.meta.keywords,
    "MediaMonks",
    "Meta",
    "Zoox",
    "Adidas",
    "Monks.flow",
    "AI platform",
    "NestJS",
    "React",
  ],
  openGraph: {
    title: "Work Experience - Felix Zhang",
    description: "Projects at MediaMonks, Meta, Zoox, Adidas, and more - full-stack engineering and cloud infrastructure",
    url: `${copy.meta.url}/work`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Work Experience - Felix Zhang",
    description: "Projects at MediaMonks, Meta, Zoox, Adidas, and more - full-stack engineering and cloud infrastructure",
  },
};

export default function Work() {
  return <WorkPage />;
}
