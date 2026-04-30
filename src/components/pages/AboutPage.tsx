'use client';

import { motion } from 'framer-motion';
import copy from '@/copy.json';
import TerminalCard from '@/components/shared/TerminalCard';
import InteractiveTerminal from '@/components/InteractiveTerminal';

const LEVEL_STYLES: Record<string, string> = {
  INF: 'text-primary',
  WRN: 'text-secondary',
  ERR: 'text-error',
};

const BAR_COLORS = [
  'bg-primary',
  'bg-secondary',
  'bg-error',
];

export default function AboutPage() {
  const { sysSpecs, historyLog, terminalTitles } = copy.about;

  return (
    <div>
      {/* Visually hidden h1 for SEO and accessibility */}
      <h1 className="sr-only">About</h1>

      {/* SYSTEM_INFO : ABOUT.log — Interactive terminal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <TerminalCard title={terminalTitles.whoami}>
          <InteractiveTerminal embedded />
        </TerminalCard>
      </motion.div>

      {/* SYS_SPECS — full width */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <TerminalCard title={terminalTitles.sysSpecs}>
          <div className="space-y-4">
            {sysSpecs.map((spec, i) => (
              <div key={spec.label}>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-on-surface-variant tracking-wider">
                    {spec.label}
                  </span>
                  <span className="text-on-surface font-bold">{spec.value}%</span>
                </div>
                <div className="w-full h-4 bg-surface-high border border-outline">
                  <div
                    className={`h-full transition-all duration-700 ${BAR_COLORS[i] || BAR_COLORS[0]}`}
                    style={{ width: `${spec.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </TerminalCard>
      </motion.div>

      {/* TAIL -F HISTORY.LOG — table with clear grids */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <TerminalCard title={terminalTitles.history}>
          <div className="font-mono text-sm divide-y divide-outline">
            {historyLog.map((entry, i) => (
              <div key={i} className="py-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-on-surface-variant text-xs">
                    {entry.timestamp}
                  </span>
                  <span className={`font-bold text-xs ${LEVEL_STYLES[entry.level] || 'text-primary'}`}>
                    {entry.level}
                  </span>
                </div>
                <p className="text-on-surface">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </TerminalCard>
      </motion.div>

      {/* Terminal prompt */}
      {/* <div className="font-mono text-sm text-on-surface-variant">
        <span className="text-primary">&gt;</span> <BlockCursor />
      </div> */}
    </div>
  );
}
