import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import BlogPostPage from '@/components/pages/BlogPostPage';
import { getAllPosts, getPost } from '@/lib/blog';
import copy from '@/copy.json';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const posts = getAllPosts();
  const meta = posts.find(p => p.slug === params.slug);

  if (!meta) {
    return { title: `Post Not Found - ${copy.meta.title}` };
  }

  return {
    title: `${meta.title} - ${copy.meta.title}`,
    description: meta.excerpt,
    keywords: [...copy.meta.keywords, ...meta.tags],
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      url: `${copy.meta.url}/blog/${meta.slug}`,
      type: 'article',
      publishedTime: meta.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.excerpt,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const exists = getAllPosts().some(p => p.slug === params.slug);
  if (!exists) notFound();

  const post = getPost(params.slug);

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return <BlogPostPage post={post}>{content}</BlogPostPage>;
}
