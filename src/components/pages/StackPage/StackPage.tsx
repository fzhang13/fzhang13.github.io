'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import copy from '@/copy.json';
import TerminalCard from '@/components/shared/TerminalCard';
import BracketChip from '@/components/shared/BracketChip';
import BlockCursor from '@/components/shared/BlockCursor';
import styles from './StackPage.module.scss';

interface InstallLine {
  text: string;
  delay: number;
  type: 'cmd' | 'info' | 'pkg' | 'ok';
}

export default function StackPage() {
  const { techStack, installSequence, installDuration, stackTerminal } =
    copy.expertise;
  const categories = Array.from(new Set(techStack.map(t => t.category)));

  const [phase, setPhase] = useState<'idle' | 'installing' | 'complete'>(
    'idle'
  );
  const [visibleLines, setVisibleLines] = useState<InstallLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === 'idle' && promptRef.current) {
      promptRef.current.focus();
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'installing') return;

    const timers: NodeJS.Timeout[] = [];

    installSequence.forEach(line => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(prev => [...prev, line as InstallLine]);
        }, line.delay)
      );
    });

    timers.push(
      setTimeout(() => {
        setPhase('complete');
      }, installDuration)
    );

    return () => timers.forEach(clearTimeout);
  }, [phase, installSequence, installDuration]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const startInstall = () => {
    if (phase !== 'idle') return;
    setVisibleLines([]);
    setPhase('installing');
  };

  if (phase === 'idle') {
    return (
      <>
        {/* Visually hidden h1 for SEO and accessibility */}
        <h1 className="sr-only">Tech Stack</h1>

        <div
          ref={promptRef}
          className={styles.launcher}
          onClick={startInstall}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              startInstall();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Run npm install stack"
        >
          <div className={styles.command}>
            <span className={styles.accent}>{stackTerminal.prompt}</span>{' '}
            <span className={styles.commandText}>{stackTerminal.command}</span>
            <BlockCursor />
          </div>
          <p className={styles.pressEnter}>{stackTerminal.pressEnter}</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Visually hidden h1 for SEO and accessibility */}
      <h1 className="sr-only">Tech Stack</h1>

      <div>
        {/* Install animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <TerminalCard title={stackTerminal.installTitle}>
            <div ref={scrollRef} className={styles.console}>
              {visibleLines.map((line, i) => {
                if (line.text === '')
                  return <div key={i} className={styles.spacer} />;

                let className = styles.lineVariant;
                if (line.type === 'cmd') className = styles.lineDefault;
                if (line.type === 'pkg') className = styles.lineDefault;
                if (line.type === 'ok') className = styles.lineOk;

                return (
                  <div key={i} className={className}>
                    {line.type === 'pkg' ? (
                      <span>
                        {line.text.split(/(\+\s\S+)/g).map((part, j) =>
                          part.startsWith('+ ') ? (
                            <span key={j}>
                              <span className={styles.accent}>+</span>
                              <span className={styles.lineDefault}>
                                {part.slice(1)}
                              </span>
                            </span>
                          ) : (
                            <span key={j}>{part}</span>
                          )
                        )}
                      </span>
                    ) : line.type === 'ok' ? (
                      <span>
                        <span className={styles.accent}>✓</span>{' '}
                        <span className={styles.accent}>{line.text}</span>
                      </span>
                    ) : (
                      line.text
                    )}
                  </div>
                );
              })}
              {phase === 'installing' && <BlockCursor />}
            </div>
          </TerminalCard>
        </motion.div>

        {/* Installed packages log — appears after animation */}
        {phase === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={styles.packagesSection}
          >
            <TerminalCard title={stackTerminal.packagesTitle}>
              <div className={styles.categoryList}>
                {categories.map((cat, catIndex) => {
                  const variants: Array<'default' | 'success' | 'error'> = [
                    'default',
                    'success',
                    'error',
                  ];
                  const variant = variants[catIndex % variants.length];

                  return (
                    <div key={cat}>
                      <div className={styles.categoryLabel}>{cat}</div>
                      <div className={styles.chips}>
                        {techStack
                          .filter(t => t.category === cat)
                          .map(t => (
                            <BracketChip
                              key={t.name}
                              label={t.name}
                              variant={variant}
                            />
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TerminalCard>
          </motion.div>
        )}
      </div>
    </>
  );
}
