import styles from './BracketChip.module.scss';

interface BracketChipProps {
  label: string;
  variant?: 'default' | 'error' | 'success';
  className?: string;
}

export default function BracketChip({
  label,
  variant = 'default',
  className = '',
}: BracketChipProps) {
  return (
    <span
      className={[styles.chip, styles[variant], className]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
    </span>
  );
}
