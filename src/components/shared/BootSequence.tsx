'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: 'BIOS v0.2.4 — felix.zhang kernel', delay: 0 },
  { text: 'Loading kernel modules...', delay: 200 },
  { text: '  [OK] fs/portfolio', delay: 400 },
  { text: '  [OK] net/social', delay: 550 },
  { text: '  [OK] dev/terminal', delay: 700 },
  { text: 'Mounting skill partitions...', delay: 900 },
  { text: '  [OK] /bin/experience', delay: 1050 },
  { text: '  [OK] /usr/projects', delay: 1200 },
  { text: 'Initializing environment... READY', delay: 1600 },
];

const TOTAL_DURATION = 2200;

export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem('booted')) return;

    setVisible(true);
    sessionStorage.setItem('booted', '1');

    const timers: NodeJS.Timeout[] = [];

    BOOT_LINES.forEach(line => {
      timers.push(
        setTimeout(() => {
          setLines(prev => [...prev, line.text]);
        }, line.delay)
      );
    });

    timers.push(
      setTimeout(() => {
        setVisible(false);
      }, TOTAL_DURATION)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] bg-bg flex items-center justify-center"
        >
          <div className="font-mono text-xs text-primary max-w-lg w-full px-8">
            {lines.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.includes('[OK]') ? (
                  <>
                    <span className="text-on-surface-variant">
                      {line.replace('[OK]', '')}
                    </span>
                    <span className="text-primary">[OK]</span>
                  </>
                ) : (
                  <span
                    className={
                      i === lines.length - 1 && line.includes('READY')
                        ? 'text-primary phosphor-glow'
                        : 'text-on-surface'
                    }
                  >
                    {line}
                  </span>
                )}
              </div>
            ))}
            <span className="block-cursor">&#x2588;</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
