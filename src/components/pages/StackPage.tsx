'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import copy from '@/copy.json';
import TerminalCard from '@/components/shared/TerminalCard';
import BracketChip from '@/components/shared/BracketChip';
import BlockCursor from '@/components/shared/BlockCursor';

interface InstallLine {
  text: string;
  delay: number;
  type: 'cmd' | 'info' | 'pkg' | 'ok';
}

export default function StackPage() {
  const { techStack, installSequence, installDuration, stackTerminal } = copy.expertise;
  const categories = Array.from(new Set(techStack.map(t => t.category)));

  const [phase, setPhase] = useState<'idle' | 'installing' | 'complete'>('idle');
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

    installSequence.forEach((line) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line as InstallLine]);
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
          className="min-h-[60vh] flex flex-col items-center justify-center cursor-pointer outline-none"
          onClick={startInstall}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              startInstall();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Run npm install stack"
        >
          <div className="font-mono text-sm">
            <span className="text-primary">{stackTerminal.prompt}</span>{' '}
            <span className="text-on-surface">{stackTerminal.command}</span>
            <BlockCursor />
          </div>
          <p className="text-outline-bright text-xs font-mono mt-6 animate-pulse">
            {stackTerminal.pressEnter}
          </p>
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
          <div
            ref={scrollRef}
            className="max-h-[50vh] overflow-y-auto font-mono text-sm leading-relaxed"
          >
            {visibleLines.map((line, i) => {
              if (line.text === '') return <div key={i} className="h-3" />;

              let className = 'text-on-surface-variant';
              if (line.type === 'cmd') className = 'text-on-surface';
              if (line.type === 'pkg') className = 'text-on-surface';
              if (line.type === 'ok') className = 'text-primary';

              return (
                <div key={i} className={className}>
                  {line.type === 'pkg' ? (
                    <span>
                      {line.text.split(/(\+\s\S+)/g).map((part, j) =>
                        part.startsWith('+ ') ? (
                          <span key={j}>
                            <span className="text-primary">+</span>
                            <span className="text-on-surface">{part.slice(1)}</span>
                          </span>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </span>
                  ) : line.type === 'ok' ? (
                    <span>
                      <span className="text-primary">✓</span>{' '}
                      <span className="text-primary">{line.text}</span>
                    </span>
                  ) : (
                    line.text
                  )}
                </div>
              );
            })}
            {phase === 'installing' && (
              <BlockCursor />
            )}
          </div>
        </TerminalCard>
      </motion.div>

      {/* Installed packages log — appears after animation */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-6"
        >
          <TerminalCard title={stackTerminal.packagesTitle}>
            <div className="space-y-5">
              {categories.map((cat, catIndex) => {
                const variants: Array<'default' | 'success' | 'error'> = ['default', 'success', 'error'];
                const variant = variants[catIndex % variants.length];

                return (
                  <div key={cat}>
                    <div className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">
                      {cat}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {techStack
                        .filter(t => t.category === cat)
                        .map(t => (
                          <BracketChip key={t.name} label={t.name} variant={variant} />
                        ))
                      }
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
