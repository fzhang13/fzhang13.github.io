import type { Metadata } from 'next';
import StackPage from '@/components/pages/StackPage';
import copy from '@/copy.json';

export const metadata: Metadata = {
  title: `Tech Stack - ${copy.meta.title}`,
  description:
    'Technical skills and tools: TypeScript, JavaScript, React, Next.js, Node.js, NestJS, AWS, GCP, PostgreSQL, Docker, Terraform, GraphQL, and more.',
  keywords: [
    ...copy.meta.keywords,
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Docker',
    'Terraform',
    'GraphQL',
    'Claude Code',
  ],
  openGraph: {
    title: 'Tech Stack - Felix Zhang',
    description:
      'Full-stack technologies and cloud infrastructure tools - TypeScript, React, AWS, Node.js, PostgreSQL, Docker',
    url: `${copy.meta.url}/stack`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Stack - Felix Zhang',
    description:
      'Full-stack technologies and cloud infrastructure tools - TypeScript, React, AWS, Node.js, PostgreSQL, Docker',
  },
};

export default function Stack() {
  return <StackPage />;
}
