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

interface Line {
  type: 'input' | 'output';
  text: string;
  className?: string;
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
        className: l.className,
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
    <div className="cursor-text" onClick={() => inputRef.current?.focus()}>
      {lines.length > 0 && (
        <div className="relative mb-2">
          <div
            ref={scrollRef}
            className="font-mono text-sm max-h-48 overflow-y-auto overflow-x-auto space-y-0.5 scrollbar-thin"
          >
            {lines.map((line, i) =>
              line.type === 'input' ? (
                <p key={i} className="text-on-surface">
                  <span className="text-primary">$</span> {line.text}
                </p>
              ) : (
                <p
                  key={i}
                  className={
                    line.className || 'text-on-surface-variant whitespace-pre'
                  }
                >
                  {line.text}
                </p>
              )
            )}
          </div>
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
        </div>
      )}

      <div className="flex items-center font-mono text-base">
        <span className="text-primary mr-1">$</span>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-on-surface w-full caret-transparent text-base"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Shell input"
          />
          {ghostText && (
            <span
              className="absolute top-0 pointer-events-none text-outline-bright opacity-40"
              style={{ left: `${input.length}ch` }}
            >
              {ghostText}
            </span>
          )}
          <span
            className="absolute top-0 pointer-events-none"
            style={{ left: `${input.length}ch` }}
          >
            <span className="block-cursor">&#x2588;</span>
          </span>
        </div>
      </div>

      {lines.length === 0 && (
        <p className="font-mono text-xs text-outline-bright mt-2">
          {copy.homeShell.commandHint}
        </p>
      )}
    </div>
  );
}
