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
  const variantClasses = {
    default: 'text-primary',
    error: 'text-error',
    success: 'text-secondary',
  };

  return (
    <span className={`bracket-chip ${variantClasses[variant]} ${className}`}>
      {label}
    </span>
  );
}
