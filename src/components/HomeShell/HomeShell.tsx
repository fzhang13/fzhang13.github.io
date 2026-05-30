'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import copy from '@/copy.json';
import {
  getGhostText,
  executeCommand,
  OutputLine,
} from '@/lib/homeShellCommands';
import styles from './HomeShell.module.scss';

interface Line {
  type: 'input' | 'output';
  text: string;
  variant?: OutputLine['variant'];
}

export default function HomeShell() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [ghostText, setGhost] = useState('');
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedInput, setSavedInput] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setGhost(getGhostText(val));
    setHistoryIndex(-1);
  };

  const handleSubmit = () => {
    const raw = input.trim();
    if (!raw) return;

    const viewport =
      typeof window !== 'undefined'
        ? `${window.innerWidth}x${window.innerHeight}`
        : 'unknown';

    const result = executeCommand(raw, { theme, viewport });

    if (result.action === 'clear') {
      setLines([]);
      setInput('');
      setGhost('');
      setHistoryStack(prev => [...prev, raw]);
      setHistoryIndex(-1);
      return;
    }

    const newLines: Line[] = [
      ...lines,
      { type: 'input', text: raw },
      ...result.lines.map((l: OutputLine) => ({
        type: 'output' as const,
        text: l.text,
        variant: l.variant,
      })),
    ];

    setLines(newLines);
    setInput('');
    setGhost('');
    setHistoryStack(prev => [...prev, raw]);
    setHistoryIndex(-1);

    if (result.action === 'navigate' && result.navigateTo) {
      const dest = result.navigateTo;
      setTimeout(() => router.push(dest), 300);
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
      setGhost(getGhostText(completed));
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
      setGhost(getGhostText(cmd));
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput(savedInput);
        setGhost(getGhostText(savedInput));
        return;
      }
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const cmd = historyStack[historyStack.length - 1 - newIndex];
      setInput(cmd);
      setGhost(getGhostText(cmd));
    }
  };

  return (
    <div className={styles.root} onClick={() => inputRef.current?.focus()}>
      {lines.length > 0 && (
        <div className={styles.history}>
          <div ref={scrollRef} className={styles.scroll}>
            {lines.map((line, i) =>
              line.type === 'input' ? (
                <p key={i} className={styles.inputLine}>
                  <span className={styles.accent}>$</span> {line.text}
                </p>
              ) : (
                <p
                  key={i}
                  className={
                    line.variant === 'primary'
                      ? styles.outputPrimary
                      : styles.outputVariant
                  }
                >
                  {line.text}
                </p>
              )
            )}
          </div>
          <div className={styles.fade} />
        </div>
      )}

      <div className={styles.promptRow}>
        <span className={styles.promptSign}>$</span>
        <div className={styles.inputWrap}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={styles.input}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Shell input"
          />
          {ghostText && (
            <span
              className={styles.ghost}
              style={{ left: `${input.length}ch` }}
            >
              {ghostText}
            </span>
          )}
          <span className={styles.cursor} style={{ left: `${input.length}ch` }}>
            <span className="block-cursor">&#x2588;</span>
          </span>
        </div>
      </div>

      {lines.length === 0 && (
        <p className={styles.hint}>{copy.homeShell.commandHint}</p>
      )}
    </div>
  );
}
