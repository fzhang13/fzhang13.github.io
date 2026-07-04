// Server/build-time only — uses Node `fs`/`path`. Do NOT import from a
// client component; use ./blogShared for client-safe types and helpers.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calcReadingTime, type Post, type PostMeta } from './blogShared';

export type { Post, PostMeta } from './blogShared';
export { formatDate } from './blogShared';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) ?? [],
        readingTime: calcReadingTime(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) ?? [],
    readingTime: calcReadingTime(content),
    content,
  };
}
