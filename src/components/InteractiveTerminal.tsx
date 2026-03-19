"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import copy from "@/copy.json";

const COMMANDS: Record<string, string[]> = copy.terminal.commands;

interface Line {
  type: "input" | "output";
  text: string;
}

const INITIAL_LINES: Line[] = [
  { type: "input", text: copy.terminal.initialCommand },
  ...copy.terminal.initialOutput.map((text) => ({ type: "output" as const, text })),
];

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines: Line[] = [...lines, { type: "input", text: cmd }];

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const response = COMMANDS[cmd];
    if (response) {
      response.forEach((line) => newLines.push({ type: "output", text: line }));
    } else {
      newLines.push(
        { type: "output", text: `${copy.terminal.notFoundPrefix} ${cmd}` },
        { type: "output", text: copy.terminal.notFoundHint },
      );
    }

    setLines(newLines);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      className="glass-card p-6 font-mono text-sm cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-dark-500 text-xs">{copy.terminal.filename}</span>
        <span className="ml-auto text-dark-600 text-xs">{copy.terminal.hint}</span>
      </div>

      {/* Scrollable output */}
      <div
        ref={scrollRef}
        className="space-y-1 text-dark-300 max-h-96 overflow-y-auto scrollbar-thin"
      >
        {lines.map((line, i) =>
          line.type === "input" ? (
            <p key={i}>
              <span className="text-primary-400">$</span> {line.text}
            </p>
          ) : (
            <p key={i} className="text-dark-400 whitespace-pre">
              {line.text}
            </p>
          )
        )}

        {/* Command hint */}
        <p className="text-dark-600 text-xs mt-2">
          {copy.terminal.commandHint}
        </p>

        {/* Active input line */}
        <div className="flex items-center">
          <span className="text-primary-400 mr-1">$</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white w-full caret-transparent"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
            {/* Block cursor */}
            <span
              className="absolute top-0 pointer-events-none text-white"
              style={{ left: `${input.length}ch` }}
            >
              <span className="inline-block w-2 h-[1.2em] bg-primary-400 animate-[blink_1s_step-end_infinite]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
