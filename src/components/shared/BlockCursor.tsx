interface BlockCursorProps {
  className?: string;
}

export default function BlockCursor({ className = '' }: BlockCursorProps) {
  return (
    <span className={`block-cursor ${className}`} aria-hidden="true">
      &#x2588;
    </span>
  );
}
