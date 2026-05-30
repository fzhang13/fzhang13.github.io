'use client';

import { motion } from 'framer-motion';
import copy from '@/copy.json';
import TerminalCard from '@/components/shared/TerminalCard';
import BracketChip from '@/components/shared/BracketChip';
import GitHubActivity from '@/components/GitHubActivity';
import styles from './WorkPage.module.scss';

const COMMIT_HASHES = ['0x7F8A9B', '0x3C4D5E'];

const TAG_VARIANTS: Array<'default' | 'success' | 'error'> = [
  'default',
  'success',
  'error',
];

function getTagVariant(index: number): 'default' | 'success' | 'error' {
  return TAG_VARIANTS[index % TAG_VARIANTS.length];
}

// Deterministic hash generation from string input
function generateDeterministicHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Ensure positive and convert to hex, clamped to 6 digits
  const hex = (Math.abs(hash) % 0xffffff)
    .toString(16)
    .toUpperCase()
    .padStart(6, '0');
  return `0x${hex}`;
}

export default function WorkPage() {
  const { items, terminal } = copy.experience;

  return (
    <div>
      {/* Visually hidden h1 for SEO and accessibility */}
      <h1 className="sr-only">Work Experience</h1>

      {/* Extraction header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={styles.header}
      >
        <p className={styles.muted}>
          <span className={styles.accent}>{terminal.user}</span>
          <span className={styles.muted}>{terminal.workDir}</span>
          <span className={styles.text}>{terminal.extractCommand}</span>
        </p>
        <p className={styles.headerExtracting}>{terminal.extracting}</p>
        <p className={styles.muted}>
          <span className={styles.accent}>{terminal.extractOk}</span>{' '}
          {items.length} {terminal.volumesMounted}
        </p>
      </motion.div>

      {/* SYS_LOG : EXPERIENCE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TerminalCard title={terminal.terminalTitle}>
          {/* Git log command */}
          <div className={styles.gitCommand}>
            <span className={styles.accent}>{terminal.user}</span>
            <span className={styles.muted}>{terminal.historyDir}</span>
            <span className={styles.text}>{terminal.gitCommand}</span>
          </div>

          {/* Git log entries */}
          <div className={styles.log}>
            {items.map((exp, i) => {
              const hash =
                COMMIT_HASHES[i] ||
                generateDeterministicHash(`${exp.company}-${exp.period}`);
              const isHead = i === 0;
              const gutter = isHead ? styles.gutterHead : styles.gutterNormal;
              const isLast = i === items.length - 1;

              return (
                <div key={i} className={styles.commit}>
                  {/* Commit line */}
                  <div className={styles.commitLine}>
                    <div className={styles.commitMarker}>
                      <span className={styles.secondary}>*</span>
                    </div>
                    <div className={styles.commitBody}>
                      <span className={styles.commitHash}>commit {hash} </span>
                      {isHead && (
                        <>
                          (
                          <span className={styles.accent}>
                            {terminal.headLabel}
                          </span>
                          ,
                          <span className={styles.error}>
                            {terminal.originLabel}
                          </span>
                          )
                        </>
                      )}
                    </div>
                  </div>

                  {/* Author & Date */}
                  <div className={styles.indent}>
                    <div className={styles.row}>
                      <span className={gutter}>|</span>
                      <span className={styles.rowText}>{terminal.author}</span>
                    </div>
                    <div className={styles.row}>
                      <span className={gutter}>|</span>
                      <span className={styles.rowText}>
                        {terminal.datePrefix}
                        <span className={styles.periodValue}>{exp.period}</span>
                      </span>
                    </div>
                    <div className={gutter}>|</div>
                  </div>

                  {/* Role */}
                  <div className={styles.roleBlock}>
                    <div className={styles.row}>
                      <span className={gutter}>|</span>
                      <span className={styles.rowFill}>
                        <span className={styles.roleLabel}>
                          {terminal.roleLabel}
                        </span>
                        <span className={styles.roleTitle}>
                          {' '}
                          {exp.title}
                          {terminal.roleConnector}
                        </span>
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.companyLink}
                        >
                          {exp.company}
                        </a>
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className={styles.highlights}>
                    {exp.highlights.map((h, j) => (
                      <div key={j} className={styles.row}>
                        <span className={gutter}>|</span>
                        <span className={styles.rowFill}>
                          <span className={styles.dash}>-</span> {h}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className={styles.tags}>
                    <div className={styles.row}>
                      <span className={gutter}>|</span>
                      <span className={styles.tagChips}>
                        {exp.tags.map((tag, ti) => (
                          <BracketChip
                            key={tag}
                            label={tag}
                            variant={getTagVariant(ti)}
                          />
                        ))}
                      </span>
                    </div>
                  </div>

                  {/* Connecting line to next commit */}
                  {!isLast && (
                    <div className={`${styles.connector} ${gutter}`}>|</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Terminal prompt at bottom */}
          {/* <div className="font-mono text-sm mt-4 border-t border-outline pt-4">
            <span className="text-primary">user@system</span>
            <span className="text-on-surface-variant"> : ~/work/history $ </span>
            <BlockCursor />
          </div> */}
        </TerminalCard>
      </motion.div>

      {/* GitHub Commit Activity */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={styles.activitySection}
      >
        <GitHubActivity />
      </motion.div>
    </div>
  );
}
