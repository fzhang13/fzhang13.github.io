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
  const { sysSpecs, historyLog } = copy.about;

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
        <TerminalCard title="&gt; EXECUTE WHOAMI.SH">
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
        <TerminalCard title="SYS_SPECS">
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
        <TerminalCard title="TAIL -F HISTORY.LOG">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-mono text-sm">
              <tbody>
                {historyLog.map((entry, i) => (
                  <tr
                    key={i}
                    className="border-b border-outline last:border-b-0"
                  >
                    <td className="py-4 pr-4 text-on-surface-variant whitespace-nowrap align-top">
                      {entry.timestamp}
                    </td>
                    <td className={`py-4 pr-4 font-bold whitespace-nowrap align-top ${LEVEL_STYLES[entry.level] || 'text-primary'}`}>
                      {entry.level}
                    </td>
                    <td className="py-4 text-on-surface align-top">
                      {entry.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
