import copy from '@/copy.json';
import { themes } from '@/lib/themes';

export interface OutputLine {
  text: string;
  className?: string;
}

export interface CommandResult {
  lines: OutputLine[];
  action?: 'navigate' | 'clear';
  navigateTo?: string;
}

const NAV_TARGETS: Record<string, string> = {
  about: '/about',
  stack: '/stack',
  work: '/work',
};

const PAGE_NAMES = Object.keys(NAV_TARGETS);

const AUTOCOMPLETE_ENTRIES = [
  'about', 'cat', 'cd', 'clear', 'exit', 'help',
  'ls', 'neofetch', 'rm -rf /', 'stack', 'sudo',
  'whoami', 'work',
];

export function getGhostText(input: string): string {
  const val = input.toLowerCase();
  if (!val) return '';

  if (val.startsWith('cd ')) {
    const arg = val.slice(3).replace(/^\//, '');
    if (!arg) return '';
    const match = PAGE_NAMES.find((p) => p.startsWith(arg) && p !== arg);
    if (match) {
      const prefix = val.slice(3);
      const isSlash = prefix.startsWith('/');
      return match.slice(arg.length) + (isSlash ? '' : '');
    }
    return '';
  }

  const match = AUTOCOMPLETE_ENTRIES.find((cmd) => cmd.startsWith(val) && cmd !== val);
  return match ? match.slice(val.length) : '';
}

function staticOutput(key: string): OutputLine[] {
  const lines = (copy.homeShell.commands as Record<string, string[]>)[key];
  if (!lines) return [];
  return lines.map((text) => ({ text }));
}

function buildNeofetch(context: { theme: string; viewport: string }): OutputLine[] {
  const { ascii, fields } = copy.homeShell.neofetch;
  const asciiWidth = ascii[0]?.length ?? 14;
  const pad = ' '.repeat(asciiWidth + 4);
  const result: OutputLine[] = [];

  const maxRows = Math.max(ascii.length, fields.length);
  for (let i = 0; i < maxRows; i++) {
    const artPart = ascii[i] ?? ' '.repeat(asciiWidth);
    const field = fields[i];

    let infoPart = '';
    if (field) {
      let value = field[2];
      if (value === '{theme}') {
        const t = themes.find((th) => th.id === context.theme);
        value = t ? `${t.label} (${t.description})` : context.theme;
      } else if (value === '{viewport}') {
        value = context.viewport;
      }
      infoPart = `${field[0]}${field[1]}${value}`;
    }

    if (i < ascii.length) {
      result.push({
        text: `${artPart}    ${infoPart}`,
        className: i === 0
          ? 'text-on-surface-variant whitespace-pre'
          : 'text-on-surface-variant whitespace-pre',
      });
    } else {
      result.push({ text: `${pad}${infoPart}` });
    }
  }

  return result;
}

export function executeCommand(
  raw: string,
  context: { theme: string; viewport: string },
): CommandResult {
  const trimmed = raw.trim();
  const cmd = trimmed.toLowerCase();

  if (cmd === 'clear') {
    return { lines: [], action: 'clear' };
  }

  if (cmd === 'help') return { lines: staticOutput('help') };
  if (cmd === 'whoami') return { lines: staticOutput('whoami') };
  if (cmd === 'ls') return { lines: staticOutput('ls') };
  if (cmd === 'exit') return { lines: staticOutput('exit') };
  if (cmd === 'neofetch') return { lines: buildNeofetch(context) };

  if (cmd.startsWith('sudo')) {
    return { lines: staticOutput('sudo') };
  }

  if (cmd === 'rm -rf /' || cmd === 'rm -rf' || cmd.startsWith('rm -rf /')) {
    return { lines: staticOutput('rm -rf /') };
  }

  if (cmd === 'cat') {
    return { lines: [{ text: 'cat: missing operand. Try: cat about.yml' }] };
  }

  // Navigation: bare name, cd <name>, cd /<name>, cd ~, cd /
  let target: string | null = null;

  if (NAV_TARGETS[cmd]) {
    target = cmd;
  } else if (cmd === 'home' || cmd === 'cd' || cmd === 'cd /' || cmd === 'cd ~') {
    return { lines: [{ text: 'Already home.' }] };
  } else if (cmd.startsWith('cd ')) {
    const arg = cmd.slice(3).replace(/^\//, '').trim();
    if (NAV_TARGETS[arg]) {
      target = arg;
    }
  }

  if (target) {
    const path = NAV_TARGETS[target];
    const feedback = copy.homeShell.navigationFeedback.replace('{page}', path);
    return {
      lines: [{ text: feedback, className: 'text-primary whitespace-pre' }],
      action: 'navigate',
      navigateTo: path,
    };
  }

  return {
    lines: [
      { text: `${copy.homeShell.notFoundPrefix} ${trimmed}` },
      { text: copy.homeShell.notFoundHint },
    ],
  };
}
