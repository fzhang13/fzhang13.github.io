'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TerminalCard from '@/components/shared/TerminalCard';
import BracketChip from '@/components/shared/BracketChip';
import { formatDate, type PostMeta } from '@/lib/blogShared';
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
          <span className={styles.accent}>felix@zhang</span>
          <span className={styles.muted}>:~/blog $ </span>
          <span className={styles.text}>ls -la --sort=date</span>
        </p>
        <p className={styles.headerMeta}>
          <span className={styles.accent}>ok</span> {posts.length}{' '}
          {posts.length === 1 ? 'entry' : 'entries'} found
        </p>
      </motion.div>

      {/* Post listing */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TerminalCard title="INDEX : POSTS">
          <div className={styles.command}>
            <span className={styles.accent}>felix@zhang</span>
            <span className={styles.muted}>:~/blog $ </span>
            <span className={styles.text}>cat index.log</span>
          </div>

          {posts.length === 0 ? (
            <p className={styles.empty}>
              {'// no posts yet — check back soon'}
            </p>
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
                      {post.readingTime} min read
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
