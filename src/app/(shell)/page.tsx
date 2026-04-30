import type { Metadata } from "next";
import HomePage from '@/components/pages/HomePage';
import copy from "@/copy.json";

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.ogDescription,
  },
};

export default function Home() {
  return <HomePage />;
}
