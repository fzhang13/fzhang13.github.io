import { ReactNode } from 'react';

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Render a copy string, turning markdown-style `[label](url)` spans into
 * external anchors. Plain text is returned verbatim. Used by terminal output
 * lines where most content is plain but a few lines link out.
 */
export function renderCopyLinks(text: string): ReactNode {
  if (!text.includes('](')) return text;

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    const [full, label, href] = match;
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <a
        key={match.index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
