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

const INSTALL_LINES: InstallLine[] = [
  { text: '$ npm install stack', delay: 0, type: 'cmd' },
  { text: '', delay: 300, type: 'info' },
  { text: 'resolving dependencies...', delay: 500, type: 'info' },
  { text: 'fetching packages from registry...', delay: 900, type: 'info' },
  { text: '', delay: 1100, type: 'info' },
  { text: '+ typescript@6.4       + javascript@es2026', delay: 1300, type: 'pkg' },
  { text: '+ python@3.14.4        + php@8.5', delay: 1450, type: 'pkg' },
  { text: '+ sql@ansi:2023        + html-css-scss@latest', delay: 1600, type: 'pkg' },
  { text: '', delay: 1700, type: 'info' },
  { text: 'installing frontend frameworks...', delay: 1800, type: 'info' },
  { text: '+ react@19.2.0         + next@16.2.0', delay: 1950, type: 'pkg' },
  { text: '+ vite@7.0.4           + react-native@0.78.0', delay: 2100, type: 'pkg' },
  { text: '', delay: 2200, type: 'info' },
  { text: 'installing backend modules...', delay: 2300, type: 'info' },
  { text: '+ node@26.0.0          + nestjs@11.0.2', delay: 2450, type: 'pkg' },
  { text: '+ graphql@17.x', delay: 2600, type: 'pkg' },
  { text: '', delay: 2700, type: 'info' },
  { text: 'linking databases...', delay: 2800, type: 'info' },
  { text: '+ postgresql@18.2      + mysql@9.0.1', delay: 2950, type: 'pkg' },
  { text: '+ mongodb@9.0.0        + redis@8.0.0', delay: 3100, type: 'pkg' },
  { text: '', delay: 3200, type: 'info' },
  { text: 'provisioning cloud infra...', delay: 3300, type: 'info' },
  { text: '+ aws-sdk@3.x          + gcp@512.0.0', delay: 3450, type: 'pkg' },
  { text: '+ docker@27.1.0        + terraform@1.8.5', delay: 3600, type: 'pkg' },
  { text: '+ serverless@4.0.0', delay: 3750, type: 'pkg' },
  { text: '', delay: 3850, type: 'info' },
  { text: 'loading AI modules...', delay: 3950, type: 'info' },
  { text: '+ openai-gpt@4o        + anthropic-claude@4.7', delay: 4100, type: 'pkg' },
  { text: '+ google-gemini@2.1    + github-copilot@2.12.0', delay: 4250, type: 'pkg' },
  { text: '+ claude-code@latest    + openai-codex@latest', delay: 4400, type: 'pkg' },
  { text: '', delay: 4500, type: 'info' },
  { text: 'configuring toolchain...', delay: 4600, type: 'info' },
  { text: '+ git@2.52.0           + github-cli@2.60.0', delay: 4750, type: 'pkg' },
  { text: '+ jira@cloud           + postman@11.5.0', delay: 4900, type: 'pkg' },
  { text: '+ figma@124            + vscode@1.117.0', delay: 5050, type: 'pkg' },
  { text: '+ cursor@0.62.1', delay: 5200, type: 'pkg' },
  { text: '', delay: 5300, type: 'info' },
  { text: 'verifying integrity... checksum OK', delay: 5400, type: 'ok' },
  { text: '', delay: 5500, type: 'info' },
  { text: 'added 38 packages in 4.20s', delay: 5600, type: 'ok' },
  { text: 'stack environment ready.', delay: 5800, type: 'ok' },
];

const TOTAL_INSTALL_DURATION = 6400;

export default function StackPage() {
  const { techStack } = copy.expertise;
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

    INSTALL_LINES.forEach((line) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
        }, line.delay)
      );
    });

    timers.push(
      setTimeout(() => {
        setPhase('complete');
      }, TOTAL_INSTALL_DURATION)
    );

    return () => timers.forEach(clearTimeout);
  }, [phase]);

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
            <span className="text-primary">root@sys:~#</span>{' '}
            <span className="text-on-surface">npm install stack</span>
            <BlockCursor />
          </div>
          <p className="text-outline-bright text-xs font-mono mt-6 animate-pulse">
            press enter or click to install
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
        <TerminalCard title="NPM_INSTALL">
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
          <TerminalCard title="INSTALLED_PACKAGES.log">
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
