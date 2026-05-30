'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './GitHubActivity.module.scss';

interface DayData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionData {
  total: Record<string, number>;
  contributions: DayData[];
}

const GITHUB_USERNAME = 'fzhang13';
const WEEKS_TO_SHOW = 52;
const CELL_GAP = 3;

const LEVEL_STYLES: Record<number, string> = {
  0: styles.level0,
  1: styles.level1,
  2: styles.level2,
  3: styles.level3,
  4: styles.level4,
};

function buildWeeks(contributions: DayData[]): DayData[][] {
  const weeks: DayData[][] = [];
  let currentWeek: DayData[] = [];

  for (const day of contributions) {
    const d = new Date(day.date);
    const dayOfWeek = d.getDay();

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks.slice(-WEEKS_TO_SHOW);
}

export default function GitHubActivity() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
    )
      .then(r => (r.ok ? r.json() : null))
      .then((d: ContributionData | null) => {
        if (d) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const weeks = useMemo(() => {
    if (!data) return [];
    return buildWeeks(data.contributions);
  }, [data]);

  const totalContributions = data
    ? Object.values(data.total).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div ref={ref} className={styles.root}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.card} data-card>
          {/* Header row */}
          <div className={styles.header}>
            <span className={styles.headerTitle}>GITHUB_COMMIT_ACTIVITY</span>
            <span className={styles.headerMeta}>SYS_LOG &mdash;METRICS</span>
          </div>

          <div className={styles.body}>
            {/* Subheader */}
            <div className={styles.subheader}>
              <div className={styles.meta}>
                <p>
                  <span className={styles.muted}>REPOSITORY: </span>
                  <span className={styles.repo}>MASTER_BRANCH_CORE</span>
                </p>
                <p className={styles.muted}>
                  ARCHIVE_PATH: /usr/local/git/logs
                </p>
              </div>
              <div className={styles.telemetry}>
                <span className={styles.telemetryDot} />
                <span className={styles.muted}>LIVE_TELEMETRY</span>
              </div>
            </div>

            {loading ? (
              <div className={styles.status}>Loading contributions...</div>
            ) : !data ? (
              <div className={styles.status}>
                Unable to load contribution data
              </div>
            ) : (
              <div className={styles.gridWrap}>
                {/* Grid — fluid columns fill the container */}
                <div
                  className={styles.grid}
                  style={{
                    gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
                    gap: CELL_GAP,
                  }}
                >
                  {weeks.map((week, wi) => (
                    <div
                      key={wi}
                      className={styles.week}
                      style={{ gap: CELL_GAP }}
                    >
                      {wi === 0 &&
                        week.length < 7 &&
                        Array.from({
                          length: 7 - week.length,
                        }).map((_, pi) => (
                          <div key={`pad-${pi}`} className={styles.pad} />
                        ))}
                      {week.map(day => (
                        <div
                          key={day.date}
                          className={`${styles.cell} ${LEVEL_STYLES[day.level]}`}
                          style={{
                            backgroundColor:
                              day.level === 0
                                ? 'var(--surface-high)'
                                : 'var(--primary)',
                          }}
                          onMouseEnter={e => {
                            setHoveredDay(day);
                            const rect = (
                              e.target as HTMLElement
                            ).getBoundingClientRect();
                            const parent = (e.target as HTMLElement)
                              .closest('[data-card]')
                              ?.getBoundingClientRect();
                            if (parent) {
                              setHoverPos({
                                x: rect.left - parent.left + rect.width / 2,
                                y: rect.top - parent.top - 8,
                              });
                            }
                          }}
                          onMouseLeave={() => setHoveredDay(null)}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Footer row */}
                <div className={styles.footer}>
                  {/* Legend */}
                  <div className={styles.legend}>
                    <span className={styles.muted}>LOAD_INTENSITY:</span>
                    {Object.entries(LEVEL_STYLES).map(([level, style]) => (
                      <div
                        key={level}
                        className={`${styles.legendSwatch} ${style}`}
                        style={{
                          backgroundColor:
                            Number(level) === 0
                              ? 'var(--surface-high)'
                              : 'var(--primary)',
                        }}
                      />
                    ))}
                    <span className={styles.legendScale}>SCALE [0-100%]</span>
                  </div>

                  {/* Stats */}
                  <div className={styles.stats}>
                    <span className={styles.statsIcon}>&#9632;</span>
                    <span>
                      STAT_SUM: {totalContributions.toLocaleString()} COMMITS //
                      AVG_UPTIME: 99.98%
                    </span>
                  </div>
                </div>

                {/* Hover tooltip */}
                {hoveredDay && (
                  <div
                    className={styles.tooltip}
                    style={{ left: hoverPos.x, top: hoverPos.y }}
                  >
                    <span className={styles.muted}>
                      {hoveredDay.count} contribution
                      {hoveredDay.count !== 1 ? 's' : ''}
                    </span>{' '}
                    on{' '}
                    {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
