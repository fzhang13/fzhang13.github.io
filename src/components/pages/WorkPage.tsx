'use client';

import { motion } from 'framer-motion';
import copy from '@/copy.json';
import TerminalCard from '@/components/shared/TerminalCard';
import BracketChip from '@/components/shared/BracketChip';
import GitHubActivity from '@/components/GitHubActivity';

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
        className="font-mono text-sm mb-8 space-y-1"
      >
        <p className="text-on-surface-variant">
          <span className="text-primary">{terminal.user}</span>
          <span className="text-on-surface-variant">{terminal.workDir}</span>
          <span className="text-on-surface">{terminal.extractCommand}</span>
        </p>
        <p className="text-on-surface-variant mt-4">{terminal.extracting}</p>
        <p className="text-on-surface-variant">
          <span className="text-primary">{terminal.extractOk}</span>{' '}
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
          <div className="font-mono text-sm mb-6">
            <span className="text-primary">{terminal.user}</span>
            <span className="text-on-surface-variant">
              {terminal.historyDir}
            </span>
            <span className="text-on-surface">{terminal.gitCommand}</span>
          </div>

          {/* Git log entries */}
          <div className="font-mono text-sm space-y-0">
            {items.map((exp, i) => {
              const hash =
                COMMIT_HASHES[i] ||
                generateDeterministicHash(`${exp.company}-${exp.period}`);
              const isHead = i === 0;
              const lineColor = isHead ? 'text-error' : 'text-outline-bright';
              const isLast = i === items.length - 1;

              return (
                <div key={i} className="relative">
                  {/* Commit line */}
                  <div className="flex items-start gap-0">
                    <div className="flex flex-col items-center w-6 flex-shrink-0 mr-2">
                      <span className="text-secondary font-bold">*</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-secondary">commit {hash} </span>
                      {isHead && (
                        <>
                          (
                          <span className="text-primary">
                            {terminal.headLabel}
                          </span>
                          ,
                          <span className="text-error">
                            {terminal.originLabel}
                          </span>
                          )
                        </>
                      )}
                    </div>
                  </div>

                  {/* Author & Date */}
                  <div className="ml-8 text-on-surface-variant">
                    <div className="flex items-start">
                      <span className={`${lineColor} flex-shrink-0`}>|</span>
                      <span className="ml-1">{terminal.author}</span>
                    </div>
                    <div className="flex items-start">
                      <span className={`${lineColor} flex-shrink-0`}>|</span>
                      <span className="ml-1">
                        {terminal.datePrefix}
                        <span className="text-secondary">{exp.period}</span>
                      </span>
                    </div>
                    <div className={lineColor}>|</div>
                  </div>

                  {/* Role */}
                  <div className="ml-8">
                    <div className="flex items-start">
                      <span className={`${lineColor} flex-shrink-0`}>|</span>
                      <span className="ml-1 flex-1 min-w-0">
                        <span className="text-secondary font-bold">
                          {terminal.roleLabel}
                        </span>
                        <span className="text-on-surface font-bold">
                          {' '}
                          {exp.title}
                          {terminal.roleConnector}
                        </span>
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-bold break-words"
                        >
                          {exp.company}
                        </a>
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="ml-8 text-on-surface-variant">
                    {exp.highlights.map((h, j) => (
                      <div key={j} className="flex items-start">
                        <span className={`${lineColor} flex-shrink-0`}>|</span>
                        <span className="ml-1 flex-1 min-w-0">
                          <span className="text-secondary">-</span> {h}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="ml-8 mt-2 mb-1">
                    <div className="flex items-start">
                      <span className={`${lineColor} flex-shrink-0`}>|</span>
                      <span className="ml-1 inline-flex flex-wrap gap-2">
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
                  {!isLast && <div className={`ml-8 ${lineColor}`}>|</div>}
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
        className="mt-8"
      >
        <GitHubActivity />
      </motion.div>
    </div>
  );
}
