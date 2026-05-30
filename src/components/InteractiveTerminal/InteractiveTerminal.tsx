'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import copy from '@/copy.json';
import { getTerminalGhostText } from '@/lib/terminalAutocomplete';
import styles from './InteractiveTerminal.module.scss';

const COMMANDS: Record<string, string[]> = copy.terminal.commands;

const AUTOCOMPLETE_ENTRIES = [...Object.keys(COMMANDS), 'clear'].sort();

interface Line {
  type: 'input' | 'output';
  text: string;
}

const INITIAL_LINES: Line[] = [
  { type: 'input', text: copy.terminal.initialCommand },
  ...copy.terminal.initialOutput.map(text => ({
    type: 'output' as const,
    text,
  })),
];

interface InteractiveTerminalProps {
  embedded?: boolean;
}

export default function InteractiveTerminal({
  embedded = false,
}: InteractiveTerminalProps) {
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES);
  const [input, setInput] = useState('');
  const [ghostText, setGhost] = useState('');
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedInput, setSavedInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setGhost(getTerminalGhostText(val, AUTOCOMPLETE_ENTRIES));
    setHistoryIndex(-1);
  };

  const handleSubmit = () => {
    const raw = input.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();

    setHistoryStack(prev => [...prev, raw]);
    setHistoryIndex(-1);
    setGhost('');

    if (cmd === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    const newLines: Line[] = [...lines, { type: 'input', text: cmd }];

    const response = COMMANDS[cmd];
    if (response) {
      response.forEach(line => newLines.push({ type: 'output', text: line }));
    } else {
      newLines.push(
        { type: 'output', text: `${copy.terminal.notFoundPrefix} ${cmd}` },
        { type: 'output', text: copy.terminal.notFoundHint }
      );
    }

    setLines(newLines);
    setInput('');
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
      setGhost(getTerminalGhostText(completed, AUTOCOMPLETE_ENTRIES));
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
      setGhost(getTerminalGhostText(cmd, AUTOCOMPLETE_ENTRIES));
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput(savedInput);
        setGhost(getTerminalGhostText(savedInput, AUTOCOMPLETE_ENTRIES));
        return;
      }
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const cmd = historyStack[historyStack.length - 1 - newIndex];
      setInput(cmd);
      setGhost(getTerminalGhostText(cmd, AUTOCOMPLETE_ENTRIES));
    }
  };

  const terminalContent = (
    <div className={styles.viewport}>
      <div ref={scrollRef} className={styles.scroll}>
        {lines.map((line, i) =>
          line.type === 'input' ? (
            <p key={i} className={styles.inputLine}>
              <span className={styles.accent}>$</span> {line.text}
            </p>
          ) : (
            <p key={i} className={styles.output}>
              {line.text}
            </p>
          )
        )}

        <p className={styles.commandHint}>{copy.terminal.commandHint}</p>

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
              spellCheck={false}
              aria-label="Terminal input"
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
              style={{ left: `${input.length}ch` }}
            >
              <span className="block-cursor">&#x2588;</span>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.fade} />
    </div>
  );

  if (embedded) {
    return (
      <div
        className={styles.embedded}
        onClick={() => inputRef.current?.focus()}
      >
        {terminalContent}
      </div>
    );
  }

  return (
    <div className={styles.card} onClick={() => inputRef.current?.focus()}>
      <div className={styles.header}>
        <span>{copy.terminal.filename}</span>
        <div className={styles.headerRight}>
          <span className={styles.hint}>{copy.terminal.hint}</span>
          <span className={styles.controls}>[X] [_] [^]</span>
        </div>
      </div>

      <div className={styles.body}>{terminalContent}</div>
    </div>
  );
}
