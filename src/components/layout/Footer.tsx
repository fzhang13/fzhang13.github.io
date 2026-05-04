'use client';

import copy from '@/copy.json';

export default function Footer() {
  return (
    <footer className="h-8 border-t border-outline bg-surface flex items-center justify-between px-4 font-mono text-[10px] text-on-surface-variant shrink-0">
      <div className="flex items-center gap-4">
        <span>{copy.footer.build}</span>
        <span className="text-outline">|</span>
        <span>
          {copy.footer.status}{' '}
          <span className="text-primary">{copy.footer.statusValue}</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span>
          &copy; {new Date().getFullYear()} {copy.footer.copyright}
        </span>
      </div>
    </footer>
  );
}
