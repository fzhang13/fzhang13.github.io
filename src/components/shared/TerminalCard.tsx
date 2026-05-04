interface TerminalCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  showControls?: boolean;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
}

export default function TerminalCard({
  title,
  children,
  className = '',
  showControls = true,
  headingLevel = 'span',
}: TerminalCardProps) {
  const HeadingTag = headingLevel as keyof JSX.IntrinsicElements;

  return (
    <div className={`terminal-card ${className}`}>
      {title && (
        <div className="terminal-card-header">
          <HeadingTag>{title}</HeadingTag>
          {showControls && (
            <span className="text-outline-bright font-mono text-[10px]">
              [X] [_] [^]
            </span>
          )}
        </div>
      )}
      <div className="terminal-card-body">{children}</div>
    </div>
  );
}
