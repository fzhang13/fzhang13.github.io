'use client';

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BlockCursor from '@/components/shared/BlockCursor';
import TerminalCard from '@/components/shared/TerminalCard';
import copy from '@/copy.json';

interface Line {
  type: 'input' | 'output';
  text: string;
  className?: string;
}

interface CrashLine {
  text: string;
  delay: number;
  type: 'addr' | 'info' | 'err' | 'trace';
}

const NAV_TARGETS: Record<string, string> = {
  home: '/',
  about: '/about',
  stack: '/stack',
  work: '/work',
};

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function executeRecoveryCommand(raw: string, router: ReturnType<typeof useRouter>): { lines: Line[]; action?: 'clear' | 'navigate'; navigateTo?: string } {
  const cmd = raw.trim().toLowerCase();

  if (cmd === 'clear') {
    return { lines: [], action: 'clear' };
  }

  // Special handling for sudo commands
  if (cmd.startsWith('sudo')) {
    const sudoOutput = (copy.notFound.commands as Record<string, string[]>)['sudo reboot'];
    if (sudoOutput) {
      return {
        lines: sudoOutput.map((text) => ({ type: 'output' as const, text })),
      };
    }
  }

  // Special handling for rm -rf variations
  if (cmd === 'rm -rf /' || cmd === 'rm -rf' || cmd.startsWith('rm -rf /')) {
    const rmOutput = (copy.notFound.commands as Record<string, string[]>)['rm -rf /'];
    if (rmOutput) {
      return {
        lines: rmOutput.map((text) => ({ type: 'output' as const, text })),
      };
    }
  }

  // Check if command exists in copy.notFound.commands
  const commands = copy.notFound.commands as Record<string, string[]>;

  // Try exact match first
  if (commands[cmd]) {
    return {
      lines: commands[cmd].map((text) => ({ type: 'output' as const, text })),
    };
  }

  // Try case-insensitive match
  const commandKey = Object.keys(commands).find(k => k.toLowerCase() === cmd);
  if (commandKey && commands[commandKey]) {
    return {
      lines: commands[commandKey].map((text) => ({ type: 'output' as const, text })),
    };
  }

  let target: string | null = null;
  if (NAV_TARGETS[cmd]) {
    target = cmd;
  } else if (cmd === 'cd' || cmd === 'cd /' || cmd === 'cd ~') {
    target = 'home';
  } else if (cmd.startsWith('cd ')) {
    const arg = cmd.slice(3).replace(/^\//, '').trim();
    if (NAV_TARGETS[arg]) target = arg;
  }

  if (target) {
    const path = NAV_TARGETS[target];
    return {
      lines: [{ type: 'output', text: copy.notFound.navigating.replace('{path}', path), className: 'text-primary whitespace-pre' }],
      action: 'navigate',
      navigateTo: path,
    };
  }

  return {
    lines: [
      { type: 'output', text: copy.notFound.commandNotFound.replace('{cmd}', raw.trim()) },
      { type: 'output', text: copy.notFound.commandNotFoundHint },
    ],
  };
}

export default function NotFoundPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<'crash' | 'shell'>('crash');
  const [crashLines, setCrashLines] = useState<CrashLine[]>([]);
  const [shellLines, setShellLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const crashScrollRef = useRef<HTMLDivElement>(null);
  const shellScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    copy.notFound.crashSequence.forEach((line) => {
      timers.push(
        setTimeout(() => {
          setCrashLines((prev) => [...prev, line as CrashLine]);
        }, line.delay),
      );
    });

    timers.push(
      setTimeout(() => {
        setPhase('shell');
      }, copy.notFound.crashDuration),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 'shell') {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [phase]);

  useEffect(() => {
    if (crashScrollRef.current) {
      crashScrollRef.current.scrollTop = crashScrollRef.current.scrollHeight;
    }
  }, [crashLines]);

  useEffect(() => {
    if (shellScrollRef.current) {
      shellScrollRef.current.scrollTop = shellScrollRef.current.scrollHeight;
    }
  }, [shellLines]);

  const handleKonami = useCallback((e: globalThis.KeyboardEvent) => {
    if (konamiActivated) return;
    if (e.key === KONAMI[konamiIndex]) {
      const next = konamiIndex + 1;
      if (next === KONAMI.length) {
        setKonamiActivated(true);
        setKonamiIndex(0);
        setGlitch(true);
        setShellLines((prev) => [
          ...prev,
          { type: 'output', text: '' },
          { type: 'output', text: copy.notFound.konamiMessage, className: 'text-primary phosphor-glow-strong whitespace-pre' },
          { type: 'output', text: '' },
          { type: 'output', text: copy.notFound.konamiLives },
          { type: 'output', text: copy.notFound.konamiImmortalized },
          { type: 'output', text: copy.notFound.konamiAchievement },
          { type: 'output', text: '' },
        ]);
        setTimeout(() => setGlitch(false), 2000);
      } else {
        setKonamiIndex(next);
      }
    } else {
      setKonamiIndex(0);
    }
  }, [konamiIndex, konamiActivated]);

  useEffect(() => {
    window.addEventListener('keydown', handleKonami);
    return () => window.removeEventListener('keydown', handleKonami);
  }, [handleKonami]);

  // Rotate hints every 4 seconds
  useEffect(() => {
    if (phase !== 'shell' || shellLines.length > 0) return;

    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % copy.notFound.easterEggHints.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [phase, shellLines.length]);

  const handleSubmit = () => {
    const raw = input.trim();
    if (!raw) return;

    const result = executeRecoveryCommand(raw, router);

    if (result.action === 'clear') {
      setShellLines([]);
      setInput('');
      return;
    }

    const newLines: Line[] = [
      ...shellLines,
      { type: 'input', text: raw },
      ...result.lines,
    ];

    setShellLines(newLines);
    setInput('');

    if (result.action === 'navigate' && result.navigateTo) {
      const dest = result.navigateTo;
      setTimeout(() => router.push(dest), 400);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={glitch ? 'animate-glitch' : ''}>
      <h1 className="sr-only">{copy.notFound.pageTitle}</h1>

      {/* Crash sequence */}
      <AnimatePresence>
        {phase === 'crash' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              ref={crashScrollRef}
              className="font-mono text-sm leading-relaxed max-h-[60vh] overflow-y-auto"
            >
              {crashLines.map((line, i) => {
                if (line.text === '') return <div key={i} className="h-3" />;

                let className = 'text-on-surface-variant';
                if (line.type === 'err') className = 'text-error';
                if (line.type === 'trace') className = 'text-on-surface-variant opacity-70';
                if (line.type === 'addr') className = 'text-on-surface-variant opacity-50';

                return (
                  <div key={i} className={className}>
                    {line.text}
                  </div>
                );
              })}
              <BlockCursor />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recovery shell */}
      {phase === 'shell' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Error heading */}
          <div className="mb-8">
            <div className="font-mono text-xs text-error uppercase tracking-wider mb-3">
              {copy.notFound.faultLabel}
            </div>
            <div className="font-heading text-5xl md:text-7xl font-bold text-on-surface tracking-tight leading-none phosphor-glow">
              {copy.notFound.heading}
            </div>
            <div className="font-mono text-sm text-on-surface-variant mt-3">
              {copy.notFound.description}
            </div>
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => router.push('/')}
              className="px-5 py-2 border border-primary bg-primary text-bg font-mono text-sm uppercase tracking-wider hover:bg-transparent hover:text-primary transition-colors"
            >
              {copy.notFound.goHomeLabel}
            </button>
            <button
              onClick={() => router.back()}
              className="px-5 py-2 border border-outline text-on-surface-variant font-mono text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
            >
              {copy.notFound.goBackLabel}
            </button>
          </div>

          {/* Recovery terminal */}
          <TerminalCard title={copy.notFound.recoveryTitle}>
            <div
              className="cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Previous output */}
              {shellLines.length > 0 && (
                <div
                  ref={shellScrollRef}
                  className="font-mono text-sm max-h-64 overflow-y-auto space-y-0.5 mb-2"
                >
                  {shellLines.map((line, i) =>
                    line.type === 'input' ? (
                      <p key={i} className="text-on-surface">
                        <span className="text-error">{copy.notFound.recoveryPrompt}</span> {line.text}
                      </p>
                    ) : (
                      <p
                        key={i}
                        className={line.className || 'text-on-surface-variant whitespace-pre'}
                      >
                        {line.text}
                      </p>
                    ),
                  )}
                </div>
              )}

              {/* Input */}
              <div className="flex items-center font-mono text-sm">
                <span className="text-error mr-1">{copy.notFound.recoveryPrompt}</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-on-surface w-full caret-transparent"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-label="Recovery shell input"
                  />
                  <span
                    className="absolute top-0 pointer-events-none"
                    style={{ left: `${input.length}ch` }}
                  >
                    <span className="block-cursor">&#x2588;</span>
                  </span>
                </div>
              </div>

              {shellLines.length === 0 && (
                <>
                  <p className="font-mono text-xs text-outline-bright mt-2">
                    {copy.notFound.recoveryHint}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={hintIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 0.6, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.4 }}
                      className="font-mono text-xs text-secondary mt-1 italic"
                    >
                      {copy.notFound.easterEggHints[hintIndex]}
                    </motion.p>
                  </AnimatePresence>
                </>
              )}
            </div>
          </TerminalCard>

          {konamiActivated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 font-mono text-xs text-center text-primary opacity-60"
            >
              {copy.notFound.konamiIndicator}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
