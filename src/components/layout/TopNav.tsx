'use client';

import { useTheme } from '@/context/ThemeContext';
import { themes, type ThemeId } from '@/lib/themes';
import Link from 'next/link';

export default function TopNav() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-topnav border-b border-outline bg-surface flex items-center justify-between pl-14 pr-4 md:px-6">
      <Link href="/" className="font-mono text-sm text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap">
        <span className="text-primary">$</span>
        <span className="md:hidden"> f.zhang</span>
        <span className="hidden md:inline"> felix.zhang</span>
      </Link>

      <div className="flex items-center gap-1">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id as ThemeId)}
            className={`
              px-3 py-1 font-mono text-xs uppercase tracking-wider transition-colors
              border
              ${theme === t.id
                ? 'bg-primary text-bg border-primary'
                : 'bg-transparent text-on-surface-variant border-outline hover:border-primary hover:text-primary'
              }
            `}
            title={t.description}
          >
            {t.label}
          </button>
        ))}
      </div>
    </header>
  );
}
