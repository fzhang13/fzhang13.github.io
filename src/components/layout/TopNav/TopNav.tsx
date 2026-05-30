'use client';

import { useTheme } from '@/context/ThemeContext';
import { themes, type ThemeId } from '@/lib/themes';
import Link from 'next/link';
import styles from './TopNav.module.scss';

export default function TopNav() {
  const { theme, setTheme } = useTheme();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        <span className={styles.accent}>$</span>
        <span className={styles.brandShort}> f.zhang</span>
        <span className={styles.brandFull}> felix.zhang</span>
      </Link>

      <div className={styles.themes}>
        {themes.map(t => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id as ThemeId)}
            className={[
              styles.themeButton,
              theme === t.id && styles.themeButtonActive,
            ]
              .filter(Boolean)
              .join(' ')}
            title={t.description}
          >
            {t.label}
          </button>
        ))}
      </div>
    </header>
  );
}
