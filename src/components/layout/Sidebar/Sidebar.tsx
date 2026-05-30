'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/themes';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navContent = (
    <nav className={styles.nav}>
      <div className={styles.heading}>
        <div className={styles.headingTitle}>DIRECTORY_LISTING</div>
        <div className={styles.headingMeta}>v0.2.4 // felix.zhang</div>
      </div>
      {NAV_ITEMS.map(item => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={[styles.link, active && styles.linkActive]
              .filter(Boolean)
              .join(' ')}
          >
            <span
              className={[styles.caret, active && styles.caretActive]
                .filter(Boolean)
                .join(' ')}
            >
              &gt;
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile hamburger (only shown when closed) */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className={styles.hamburger}
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={styles.scrim} onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={[styles.sidebar, mobileOpen && styles.sidebarOpen]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Mobile close button (inside sidebar) */}
        {mobileOpen && (
          <div className={styles.closeRow}>
            <button
              onClick={() => setMobileOpen(false)}
              className={styles.closeButton}
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className={styles.body}>{navContent}</div>

        <div className={styles.footer}>
          <div className={styles.footerPath}>~/home/dev</div>
        </div>
      </aside>
    </>
  );
}
