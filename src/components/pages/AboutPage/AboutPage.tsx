'use client';

import { motion } from 'framer-motion';
import copy from '@/copy.json';
import TerminalCard from '@/components/shared/TerminalCard';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import styles from './AboutPage.module.scss';

const LEVEL_STYLES: Record<string, string> = {
  INF: styles.levelInf,
  WRN: styles.levelWrn,
  ERR: styles.levelErr,
};

const BAR_COLORS = [styles.barPrimary, styles.barSecondary, styles.barError];

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
        className={styles.section}
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
        className={styles.section}
      >
        <TerminalCard title={terminalTitles.sysSpecs}>
          <div className={styles.specList}>
            {sysSpecs.map((spec, i) => (
              <div key={spec.label}>
                <div className={styles.specHeader}>
                  <span className={styles.specLabel}>{spec.label}</span>
                  <span className={styles.specValue}>{spec.value}%</span>
                </div>
                <div className={styles.specTrack}>
                  <div
                    className={`${styles.specBar} ${BAR_COLORS[i] || BAR_COLORS[0]}`}
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
        className={styles.section}
      >
        <TerminalCard title={terminalTitles.history}>
          <div className={styles.log}>
            {historyLog.map((entry, i) => (
              <div key={i} className={styles.logEntry}>
                <div className={styles.logMeta}>
                  <span className={styles.logTimestamp}>{entry.timestamp}</span>
                  <span
                    className={`${styles.logLevel} ${
                      LEVEL_STYLES[entry.level] || styles.levelInf
                    }`}
                  >
                    {entry.level}
                  </span>
                </div>
                <p className={styles.logDescription}>{entry.description}</p>
              </div>
            ))}
          </div>
        </TerminalCard>
      </motion.div>
    </div>
  );
}
