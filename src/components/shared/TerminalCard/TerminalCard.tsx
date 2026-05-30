import styles from './TerminalCard.module.scss';

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
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      {title && (
        <div className={styles.header}>
          <HeadingTag>{title}</HeadingTag>
          {showControls && <span className={styles.controls}>[X] [_] [^]</span>}
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
