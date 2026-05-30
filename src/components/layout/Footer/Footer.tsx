'use client';

import copy from '@/copy.json';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.group}>
        <span>{copy.footer.build}</span>
        <span className={styles.divider}>|</span>
        <span>
          {copy.footer.status}{' '}
          <span className={styles.accent}>{copy.footer.statusValue}</span>
        </span>
      </div>
      <div className={styles.group}>
        <span>
          &copy; {new Date().getFullYear()} {copy.footer.copyright}
        </span>
      </div>
    </footer>
  );
}
