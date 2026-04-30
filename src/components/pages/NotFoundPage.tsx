'use client';

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BlockCursor from '@/components/shared/BlockCursor';
import TerminalCard from '@/components/shared/TerminalCard';

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

const CRASH_LINES: CrashLine[] = [
  { text: 'Segmentation fault (core dumped)', delay: 0, type: 'err' },
  { text: '', delay: 200, type: 'info' },
  { text: '--- [ cut here ] ---', delay: 400, type: 'info' },
  { text: 'kernel panic — not syncing: page not found', delay: 600, type: 'err' },
  { text: '', delay: 800, type: 'info' },
  { text: 'Call Trace:', delay: 1000, type: 'info' },
  { text: '  [<0x00000404>] resolve_route+0x404/0x808', delay: 1150, type: 'trace' },
  { text: '  [<0xDEADBEEF>] handle_request+0x42/0x200', delay: 1300, type: 'trace' },
  { text: '  [<0xCAFEBABE>] page_lookup+0x13/0x37', delay: 1450, type: 'trace' },
  { text: '  [<0x8BADF00D>] render_tree+0x0/0x100', delay: 1600, type: 'trace' },
  { text: '  [<0xFEEDFACE>] next_handler+0x14/0x28', delay: 1750, type: 'trace' },
  { text: '', delay: 1900, type: 'info' },
  { text: 'Code: 04 04 00 00 de ad be ef ca fe ba be', delay: 2000, type: 'addr' },
  { text: 'RIP: 0x0000000000000404', delay: 2150, type: 'addr' },
  { text: 'RSP: 0x00007fff00000000', delay: 2250, type: 'addr' },
  { text: '', delay: 2400, type: 'info' },
  { text: 'System halted.', delay: 2600, type: 'err' },
  { text: '', delay: 2800, type: 'info' },
  { text: 'Rebooting into recovery shell...', delay: 3000, type: 'info' },
];

const CRASH_TOTAL = 3600;

const NAV_TARGETS: Record<string, string> = {
  home: '/',
  about: '/about',
  stack: '/stack',
  work: '/work',
};

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const SECRETS: Record<string, string[]> = {
  'sudo reboot': [
    'Permission denied. Nice try though.',
    'visitor is not in the sudoers file. This incident will be reported.',
  ],
  'rm -rf /': [
    'rm: refusing to remove \'/\' recursively',
    'The site is already broken. How much worse can it get?',
  ],
  'cat /var/log/syslog': [
    '[2026.04.30] ERR  route_resolver: no matching path for requested URL',
    '[2026.04.30] WRN  page_cache: cache miss — entry evicted',
    '[2026.04.30] INF  recovery_shell: interactive terminal spawned',
    '[2026.04.30] DBG  easter_egg: you found the logs. try more commands.',
  ],
  'cat /etc/passwd': [
    'root:x:0:0:Felix Zhang:/home/felix:/bin/zsh',
    'visitor:x:1000:1000:Anonymous:/tmp:/usr/bin/nologin',
    '',
    'Nice try. No passwords here.',
  ],
  blame: [
    'git blame 404.tsx:',
    '  fzhang13  (2026-04-30)  — "it works on my machine"',
  ],
  'git log': [
    'commit 0x404DEAD (HEAD -> nowhere)',
    'Author: Felix Zhang <felix.zhang.dev@gmail.com>',
    'Date:   Wed Apr 30 2026',
    '',
    '    fix: accidentally deleted this page',
  ],
  cowsay: [
    ' _______________',
    '< 404 not found >',
    ' ---------------',
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||',
  ],
  matrix: ['FOLLOW_THE_WHITE_RABBIT'],
  'make coffee': [
    'make: *** No rule to make target \'coffee\'.',
    'Try: make tea',
    '',
    '418 I\'m a teapot.',
  ],
  ping: [
    'PING localhost (127.0.0.1): 56 data bytes',
    '64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms',
    '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=404.000 ms',
    '',
    '--- localhost ping statistics ---',
    '2 packets transmitted, 1 packets received, 50% packet loss',
    'Suspicious latency detected.',
  ],
  uptime: [
    ' 00:04:04 up 404 days, 4:04, 1 user, load average: 4.04, 0.04, 4.04',
  ],
  fortune: [
    '',
    '"The best error message is the one that never shows up."',
    '  — Thomas Fuchs',
    '',
    '...oops.',
  ],
  whoami: [
    'visitor — lost in the void',
    'You took a wrong turn somewhere.',
    'Type \'help\' for a way out.',
  ],
};

function executeRecoveryCommand(raw: string, router: ReturnType<typeof useRouter>): { lines: Line[]; action?: 'clear' | 'navigate'; navigateTo?: string } {
  const cmd = raw.trim().toLowerCase();

  if (cmd === 'clear') {
    return { lines: [], action: 'clear' };
  }

  if (cmd === 'help') {
    return {
      lines: [
        { type: 'output', text: 'Recovery shell — available commands:' },
        { type: 'output', text: '' },
        { type: 'output', text: '  Navigation:' },
        { type: 'output', text: '    home               go to homepage' },
        { type: 'output', text: '    about              go to about page' },
        { type: 'output', text: '    stack              view tech stack' },
        { type: 'output', text: '    work               see experience' },
        { type: 'output', text: '    cd <page>          navigate to a page' },
        { type: 'output', text: '' },
        { type: 'output', text: '  Diagnostics:' },
        { type: 'output', text: '    cat /var/log/syslog view error logs' },
        { type: 'output', text: '    blame              who did this?' },
        { type: 'output', text: '    git log            recent changes' },
        { type: 'output', text: '    whoami             identify yourself' },
        { type: 'output', text: '    clear              clear terminal' },
        { type: 'output', text: '' },
        { type: 'output', text: '  ...there might be other commands too.' },
      ],
    };
  }

  if (cmd === 'ls') {
    return {
      lines: [
        { type: 'output', text: '-rw-r--r--  core.dump' },
        { type: 'output', text: '-rw-r--r--  panic.log' },
        { type: 'output', text: 'drwxr-xr-x  lost+found/' },
        { type: 'output', text: 'drwxr-xr-x  /home/' },
        { type: 'output', text: '' },
        { type: 'output', text: '3 items. The page you wanted isn\'t here.' },
      ],
    };
  }

  const secret = SECRETS[cmd];
  if (secret) {
    return {
      lines: secret.map((text) => ({ type: 'output' as const, text })),
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
      lines: [{ type: 'output', text: `Navigating to ${path}...`, className: 'text-primary whitespace-pre' }],
      action: 'navigate',
      navigateTo: path,
    };
  }

  return {
    lines: [
      { type: 'output', text: `recovery-sh: command not found: ${raw.trim()}` },
      { type: 'output', text: 'Type \'help\' for available commands.' },
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

  const inputRef = useRef<HTMLInputElement>(null);
  const crashScrollRef = useRef<HTMLDivElement>(null);
  const shellScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    CRASH_LINES.forEach((line) => {
      timers.push(
        setTimeout(() => {
          setCrashLines((prev) => [...prev, line]);
        }, line.delay),
      );
    });

    timers.push(
      setTimeout(() => {
        setPhase('shell');
      }, CRASH_TOTAL),
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
          { type: 'output', text: '  ★ ★ ★  KONAMI CODE ACTIVATED  ★ ★ ★', className: 'text-primary phosphor-glow-strong whitespace-pre' },
          { type: 'output', text: '' },
          { type: 'output', text: '  +30 lives granted. Not that you needed them.' },
          { type: 'output', text: '  You\'re already immortalized in this 404.' },
          { type: 'output', text: '  Achievement unlocked: LOST_AND_FOUND' },
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
      <h1 className="sr-only">404 — Page Not Found</h1>

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
              [ FAULT ] SEGV — page not mapped
            </div>
            <div className="font-heading text-5xl md:text-7xl font-bold text-on-surface tracking-tight leading-none phosphor-glow">
              404
            </div>
            <div className="font-mono text-sm text-on-surface-variant mt-3">
              The page you&apos;re looking for doesn&apos;t exist, was moved, or was never here to begin with.
            </div>
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => router.push('/')}
              className="px-5 py-2 border border-primary bg-primary text-bg font-mono text-sm uppercase tracking-wider hover:bg-transparent hover:text-primary transition-colors"
            >
              Go Home
            </button>
            <button
              onClick={() => router.back()}
              className="px-5 py-2 border border-outline text-on-surface-variant font-mono text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
            >
              Go Back
            </button>
          </div>

          {/* Recovery terminal */}
          <TerminalCard title="RECOVERY_SHELL">
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
                        <span className="text-error">$</span> {line.text}
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
                <span className="text-error mr-1">$</span>
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
                <p className="font-mono text-xs text-outline-bright mt-2">
                  recovery mode — type &apos;help&apos; for commands
                </p>
              )}
            </div>
          </TerminalCard>

          {konamiActivated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 font-mono text-xs text-center text-primary opacity-60"
            >
              ↑↑↓↓←→←→BA — you found it.
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
