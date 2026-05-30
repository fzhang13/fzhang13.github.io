'use client';

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BlockCursor from '@/components/shared/BlockCursor';
import TerminalCard from '@/components/shared/TerminalCard';
import copy from '@/copy.json';
import { getTerminalGhostText } from '@/lib/terminalAutocomplete';
import { buildCopyTokens, interpolate } from '@/lib/copyInterpolate';
import styles from './NotFoundPage.module.scss';

interface Line {
  type: 'input' | 'output';
  text: string;
  variant?: 'primary' | 'konami';
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

const NAV_PAGES = Object.keys(NAV_TARGETS);

const AUTOCOMPLETE_ENTRIES = [
  ...Object.keys(copy.notFound.commands),
  ...NAV_PAGES,
  'clear',
].sort();

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

function executeRecoveryCommand(
  raw: string,
  router: ReturnType<typeof useRouter>
): { lines: Line[]; action?: 'clear' | 'navigate'; navigateTo?: string } {
  const cmd = raw.trim().toLowerCase();
  const tokens = buildCopyTokens();

  if (cmd === 'clear') {
    return { lines: [], action: 'clear' };
  }

  // Special handling for sudo commands
  if (cmd.startsWith('sudo')) {
    const sudoOutput = (copy.notFound.commands as Record<string, string[]>)[
      'sudo reboot'
    ];
    if (sudoOutput) {
      return {
        lines: sudoOutput.map(text => ({
          type: 'output' as const,
          text: interpolate(text, tokens),
        })),
      };
    }
  }

  // Special handling for rm -rf variations
  if (cmd === 'rm -rf /' || cmd === 'rm -rf' || cmd.startsWith('rm -rf /')) {
    const rmOutput = (copy.notFound.commands as Record<string, string[]>)[
      'rm -rf /'
    ];
    if (rmOutput) {
      return {
        lines: rmOutput.map(text => ({
          type: 'output' as const,
          text: interpolate(text, tokens),
        })),
      };
    }
  }

  // Check if command exists in copy.notFound.commands
  const commands = copy.notFound.commands as Record<string, string[]>;

  // Try exact match first
  if (commands[cmd]) {
    return {
      lines: commands[cmd].map(text => ({
        type: 'output' as const,
        text: interpolate(text, tokens),
      })),
    };
  }

  // Try case-insensitive match
  const commandKey = Object.keys(commands).find(k => k.toLowerCase() === cmd);
  if (commandKey && commands[commandKey]) {
    return {
      lines: commands[commandKey].map(text => ({
        type: 'output' as const,
        text: interpolate(text, tokens),
      })),
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
      lines: [
        {
          type: 'output',
          text: copy.notFound.navigating.replace('{path}', path),
          variant: 'primary',
        },
      ],
      action: 'navigate',
      navigateTo: path,
    };
  }

  return {
    lines: [
      {
        type: 'output',
        text: copy.notFound.commandNotFound.replace('{cmd}', raw.trim()),
      },
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
  const [caret, setCaret] = useState(0);
  const [ghostText, setGhost] = useState('');
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedInput, setSavedInput] = useState('');
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const crashScrollRef = useRef<HTMLDivElement>(null);
  const shellScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    copy.notFound.crashSequence.forEach(line => {
      timers.push(
        setTimeout(() => {
          setCrashLines(prev => [...prev, line as CrashLine]);
        }, line.delay)
      );
    });

    timers.push(
      setTimeout(() => {
        setPhase('shell');
      }, copy.notFound.crashDuration)
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

  const handleKonami = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (konamiActivated) return;
      if (e.key === KONAMI[konamiIndex]) {
        const next = konamiIndex + 1;
        if (next === KONAMI.length) {
          setKonamiActivated(true);
          setKonamiIndex(0);
          setGlitch(true);
          setShellLines(prev => [
            ...prev,
            { type: 'output', text: '' },
            {
              type: 'output',
              text: copy.notFound.konamiMessage,
              variant: 'konami',
            },
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
    },
    [konamiIndex, konamiActivated]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKonami);
    return () => window.removeEventListener('keydown', handleKonami);
  }, [handleKonami]);

  // Rotate hints every 4 seconds
  useEffect(() => {
    if (phase !== 'shell' || shellLines.length > 0) return;

    const interval = setInterval(() => {
      setHintIndex(prev => (prev + 1) % copy.notFound.easterEggHints.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [phase, shellLines.length]);

  // Keep the fake block cursor in sync with the real (transparent) caret.
  const syncCaret = () => setCaret(inputRef.current?.selectionStart ?? 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setCaret(e.target.selectionStart ?? val.length);
    setGhost(getTerminalGhostText(val, AUTOCOMPLETE_ENTRIES, NAV_PAGES));
    setHistoryIndex(-1);
  };

  const handleSubmit = () => {
    const raw = input.trim();
    if (!raw) return;

    setHistoryStack(prev => [...prev, raw]);
    setHistoryIndex(-1);
    setGhost('');

    const result = executeRecoveryCommand(raw, router);

    if (result.action === 'clear') {
      setShellLines([]);
      setInput('');
      setCaret(0);
      return;
    }

    const newLines: Line[] = [
      ...shellLines,
      { type: 'input', text: raw },
      ...result.lines,
    ];

    setShellLines(newLines);
    setInput('');
    setCaret(0);

    if (result.action === 'navigate' && result.navigateTo) {
      const dest = result.navigateTo;
      setTimeout(() => router.push(dest), 400);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
      return;
    }

    if (
      (e.key === 'Tab' ||
        (e.key === 'ArrowRight' &&
          inputRef.current?.selectionStart === input.length)) &&
      ghostText
    ) {
      e.preventDefault();
      const completed = input + ghostText;
      setInput(completed);
      setCaret(completed.length);
      setGhost(
        getTerminalGhostText(completed, AUTOCOMPLETE_ENTRIES, NAV_PAGES)
      );
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyStack.length === 0) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= historyStack.length) return;
      if (historyIndex === -1) setSavedInput(input);
      setHistoryIndex(newIndex);
      const cmd = historyStack[historyStack.length - 1 - newIndex];
      setInput(cmd);
      setCaret(cmd.length);
      setGhost(getTerminalGhostText(cmd, AUTOCOMPLETE_ENTRIES, NAV_PAGES));
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput(savedInput);
        setCaret(savedInput.length);
        setGhost(
          getTerminalGhostText(savedInput, AUTOCOMPLETE_ENTRIES, NAV_PAGES)
        );
        return;
      }
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const cmd = historyStack[historyStack.length - 1 - newIndex];
      setInput(cmd);
      setCaret(cmd.length);
      setGhost(getTerminalGhostText(cmd, AUTOCOMPLETE_ENTRIES, NAV_PAGES));
    }
  };

  return (
    <div className={glitch ? 'animate-glitch' : undefined}>
      <h1 className="sr-only">{copy.notFound.pageTitle}</h1>

      {/* Crash sequence */}
      <AnimatePresence>
        {phase === 'crash' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div ref={crashScrollRef} className={styles.crash}>
              {crashLines.map((line, i) => {
                if (line.text === '')
                  return <div key={i} className={styles.spacer} />;

                let className = styles.crashInfo;
                if (line.type === 'err') className = styles.crashErr;
                if (line.type === 'trace') className = styles.crashTrace;
                if (line.type === 'addr') className = styles.crashAddr;

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
          <div className={styles.heading}>
            <div className={styles.faultLabel}>{copy.notFound.faultLabel}</div>
            <div className={`${styles.title} phosphor-glow`}>
              {copy.notFound.heading}
            </div>
            <div className={styles.description}>
              {copy.notFound.description}
            </div>
          </div>

          {/* Quick nav */}
          <div className={styles.nav}>
            <button
              onClick={() => router.push('/')}
              className={`${styles.btnBase} ${styles.btnPrimary}`}
            >
              {copy.notFound.goHomeLabel}
            </button>
            <button
              onClick={() => router.back()}
              className={`${styles.btnBase} ${styles.btnSecondary}`}
            >
              {copy.notFound.goBackLabel}
            </button>
          </div>

          {/* Recovery terminal */}
          <TerminalCard title={copy.notFound.recoveryTitle}>
            <div
              className={styles.shell}
              onClick={() => inputRef.current?.focus()}
            >
              {/* Previous output */}
              {shellLines.length > 0 && (
                <div ref={shellScrollRef} className={styles.shellScroll}>
                  {shellLines.map((line, i) =>
                    line.type === 'input' ? (
                      <p key={i} className={styles.inputLine}>
                        <span className={styles.recoveryPrompt}>
                          {copy.notFound.recoveryPrompt}
                        </span>{' '}
                        {line.text}
                      </p>
                    ) : (
                      <p
                        key={i}
                        className={
                          line.variant === 'konami'
                            ? `${styles.outputKonami} phosphor-glow-strong`
                            : line.variant === 'primary'
                              ? styles.outputPrimary
                              : styles.outputVariant
                        }
                      >
                        {line.text}
                      </p>
                    )
                  )}
                </div>
              )}

              {/* Input */}
              <div className={styles.promptRow}>
                <span className={styles.promptSign}>
                  {copy.notFound.recoveryPrompt}
                </span>
                <div className={styles.inputWrap}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onKeyUp={syncCaret}
                    onSelect={syncCaret}
                    onClick={syncCaret}
                    className={styles.input}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-label="Recovery shell input"
                  />
                  {ghostText && (
                    <span
                      className={styles.ghost}
                      style={{ left: `${input.length}ch` }}
                    >
                      {ghostText}
                    </span>
                  )}
                  <span
                    className={styles.cursor}
                    style={{ left: `${caret}ch` }}
                  >
                    <span key={caret} className="block-cursor">
                      &#x2588;
                    </span>
                  </span>
                </div>
              </div>

              {shellLines.length === 0 && (
                <>
                  <p className={styles.recoveryHint}>
                    {copy.notFound.recoveryHint}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={hintIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 0.6, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.4 }}
                      className={styles.easterEggHint}
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
              className={styles.konamiIndicator}
            >
              {copy.notFound.konamiIndicator}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
