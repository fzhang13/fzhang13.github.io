import type { Metadata } from 'next';
import BlogPage from '@/components/pages/BlogPage';
import { getAllPosts } from '@/lib/blog';
import copy from '@/copy.json';

export const metadata: Metadata = {
  title: `Blog - ${copy.meta.title}`,
  description:
    'Writing by Felix Zhang on engineering at scale, Next.js, cloud infrastructure, and building for the web.',
  keywords: [
    ...copy.meta.keywords,
    'blog',
    'engineering blog',
    'Next.js',
    'React',
    'software engineering',
  ],
  openGraph: {
    title: 'Blog - Felix Zhang',
    description:
      'Writing on engineering at scale, Next.js, cloud infrastructure, and building for the web.',
    url: `${copy.meta.url}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Felix Zhang',
    description:
      'Writing on engineering at scale, Next.js, cloud infrastructure, and building for the web.',
  },
};

export default function Blog() {
  const posts = getAllPosts();
  return <BlogPage posts={posts} />;
}
