'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/themes';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navContent = (
    <nav className="flex flex-col gap-1">
      <div className="px-4 py-3 border-b border-outline mb-2">
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-on-surface-variant">
          DIRECTORY_LISTING
        </div>
        <div className="font-mono text-[10px] text-outline-bright mt-1">
          v0.2.4 // felix.zhang
        </div>
      </div>
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`
              group flex items-center gap-2 px-4 py-2 font-mono text-sm transition-colors
              ${active
                ? 'text-primary border-r-2 border-primary bg-primary/5'
                : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
              }
            `}
          >
            <span className={`text-primary transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
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
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-3 left-3 z-[100] p-2 border border-outline bg-surface text-primary"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-bg/80 z-[90]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-sidebar bg-bg border-r border-outline z-[95]
          flex flex-col
          transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        <div className="flex-1 py-4 overflow-y-auto">
          {navContent}
        </div>

        <div className="border-t border-outline px-4 py-3">
          <div className="font-mono text-[10px] text-outline-bright">
            ~/home/dev
          </div>
        </div>
      </aside>
    </>
  );
}
