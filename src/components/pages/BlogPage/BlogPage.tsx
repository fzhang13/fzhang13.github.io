'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TerminalCard from '@/components/shared/TerminalCard';
import BracketChip from '@/components/shared/BracketChip';
import { formatDate, type PostMeta } from '@/lib/blogShared';
import copy from '@/copy.json';
import styles from './BlogPage.module.scss';

const TAG_VARIANTS: Array<'default' | 'success' | 'error'> = [
  'default',
  'success',
  'error',
];

function getTagVariant(index: number): 'default' | 'success' | 'error' {
  return TAG_VARIANTS[index % TAG_VARIANTS.length];
}

interface BlogPageProps {
  posts: PostMeta[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  const { terminal } = copy.blog;

  return (
    <div>
      {/* Visually hidden h1 for SEO and accessibility */}
      <h1 className="sr-only">Blog</h1>

      {/* Terminal header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={styles.header}
      >
        <p>
          <span className={styles.accent}>{terminal.user}</span>
          <span className={styles.muted}>{terminal.blogDir}</span>
          <span className={styles.text}>{terminal.listCommand}</span>
        </p>
        <p className={styles.headerMeta}>
          <span className={styles.accent}>{terminal.listOk}</span>{' '}
          {posts.length}{' '}
          {posts.length === 1 ? terminal.entrySingular : terminal.entryPlural}
        </p>
      </motion.div>

      {/* Post listing */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TerminalCard title={terminal.indexTitle}>
          <div className={styles.command}>
            <span className={styles.accent}>{terminal.user}</span>
            <span className={styles.muted}>{terminal.blogDir}</span>
            <span className={styles.text}>{terminal.catIndexCommand}</span>
          </div>

          {posts.length === 0 ? (
            <p className={styles.empty}>{terminal.empty}</p>
          ) : (
            <div className={styles.list}>
              {posts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  className={styles.entry}
                >
                  <div className={styles.meta}>
                    <span className={styles.secondary}>
                      {formatDate(post.date)}
                    </span>
                    <span className={styles.dot}>·</span>
                    <span className={styles.muted}>
                      {post.readingTime} {terminal.readSuffix}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className={styles.title}>
                    <span className={styles.caret}>&gt;</span> {post.title}
                  </Link>

                  <p className={styles.excerpt}>{post.excerpt}</p>

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
                </motion.article>
              ))}
            </div>
          )}
        </TerminalCard>
      </motion.div>
    </div>
  );
}
