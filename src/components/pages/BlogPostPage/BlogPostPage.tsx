'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TerminalCard from '@/components/shared/TerminalCard';
import BracketChip from '@/components/shared/BracketChip';
import { formatDate, type Post } from '@/lib/blogShared';
import copy from '@/copy.json';
import styles from './BlogPostPage.module.scss';

const TAG_VARIANTS: Array<'default' | 'success' | 'error'> = [
  'default',
  'success',
  'error',
];

function getTagVariant(index: number): 'default' | 'success' | 'error' {
  return TAG_VARIANTS[index % TAG_VARIANTS.length];
}

interface BlogPostPageProps {
  post: Post;
  children: React.ReactNode;
}

export default function BlogPostPage({ post, children }: BlogPostPageProps) {
  const { terminal } = copy.blog;

  return (
    <div>
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={styles.back}
      >
        <Link href="/blog" className={styles.backLink}>
          <span className={styles.accent}>&lt;</span> {terminal.backLabel}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <TerminalCard title={`${terminal.postTitlePrefix}${post.slug}.mdx`}>
          {/* Prompt line */}
          <div className={styles.command}>
            <span className={styles.accent}>{terminal.user}</span>
            <span className={styles.muted}>{terminal.blogDir}</span>
            <span className={styles.text}>
              {terminal.catCommand}
              {post.slug}.mdx
            </span>
          </div>

          {/* Title + meta */}
          <header className={styles.postHeader}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span className={styles.secondary}>{formatDate(post.date)}</span>
              <span className={styles.dot}>·</span>
              <span className={styles.muted}>
                {post.readingTime} {terminal.readSuffix}
              </span>
            </div>
            {post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag, ti) => (
                  <BracketChip
                    key={tag}
                    label={tag}
                    variant={getTagVariant(ti)}
                  />
                ))}
              </div>
            )}
          </header>

          {/* Rendered MDX (server-compiled) */}
          <article className={styles.prose}>{children}</article>
        </TerminalCard>
      </motion.div>
    </div>
  );
}
