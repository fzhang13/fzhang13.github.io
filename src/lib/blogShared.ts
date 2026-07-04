// Client-safe blog types and helpers.
// No Node `fs`/`path` here so this module can be imported by client
// components without pulling server-only code into the browser bundle.
// The fs-backed loaders live in ./blog (server/build-time only).

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

export function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
