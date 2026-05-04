'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  0: 'opacity-10',
  1: 'opacity-30',
  2: 'opacity-50',
  3: 'opacity-75',
  4: 'opacity-100',
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
    <div ref={ref} className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="terminal-card">
          {/* Header row */}
          <div className="terminal-card-header">
            <span className="font-mono font-bold tracking-wider">
              GITHUB_COMMIT_ACTIVITY
            </span>
            <span className="text-on-surface-variant font-mono text-[10px] tracking-wider">
              SYS_LOG &mdash;METRICS
            </span>
          </div>

          <div className="terminal-card-body">
            {/* Subheader */}
            <div className="flex items-start justify-between mb-6">
              <div className="font-mono text-xs space-y-0.5">
                <p>
                  <span className="text-on-surface-variant">REPOSITORY: </span>
                  <span className="text-primary font-bold">
                    MASTER_BRANCH_CORE
                  </span>
                </p>
                <p className="text-on-surface-variant">
                  ARCHIVE_PATH: /usr/local/git/logs
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider">
                <span
                  className="inline-block w-2 h-2"
                  style={{ backgroundColor: 'var(--primary)' }}
                />
                <span className="text-on-surface-variant">LIVE_TELEMETRY</span>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-32 text-on-surface-variant font-mono text-sm">
                Loading contributions...
              </div>
            ) : !data ? (
              <div className="flex items-center justify-center h-32 text-on-surface-variant font-mono text-sm">
                Unable to load contribution data
              </div>
            ) : (
              <div className="relative">
                {/* Grid — fluid columns fill the container */}
                <div
                  className="grid w-full"
                  style={{
                    gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
                    gap: CELL_GAP,
                  }}
                >
                  {weeks.map((week, wi) => (
                    <div
                      key={wi}
                      className="flex flex-col"
                      style={{ gap: CELL_GAP }}
                    >
                      {wi === 0 &&
                        week.length < 7 &&
                        Array.from({
                          length: 7 - week.length,
                        }).map((_, pi) => (
                          <div
                            key={`pad-${pi}`}
                            className="w-full"
                            style={{ aspectRatio: '1' }}
                          />
                        ))}
                      {week.map(day => (
                        <div
                          key={day.date}
                          className={`w-full cursor-default transition-all duration-150 hover:ring-1 hover:ring-outline-bright ${LEVEL_STYLES[day.level]}`}
                          style={{
                            aspectRatio: '1',
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
                              .closest('.terminal-card')
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
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline font-mono text-[10px] tracking-wider">
                  {/* Legend */}
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface-variant">
                      LOAD_INTENSITY:
                    </span>
                    {Object.entries(LEVEL_STYLES).map(([level, style]) => (
                      <div
                        key={level}
                        className={`w-3 h-3 ${style}`}
                        style={{
                          backgroundColor:
                            Number(level) === 0
                              ? 'var(--surface-high)'
                              : 'var(--primary)',
                        }}
                      />
                    ))}
                    <span className="text-on-surface-variant ml-1">
                      SCALE [0-100%]
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <span
                      className="inline-block w-2.5 h-2.5 border border-outline flex items-center justify-center text-[7px] text-primary"
                      style={{ lineHeight: 1 }}
                    >
                      &#9632;
                    </span>
                    <span>
                      STAT_SUM: {totalContributions.toLocaleString()} COMMITS //
                      AVG_UPTIME: 99.98%
                    </span>
                  </div>
                </div>

                {/* Hover tooltip */}
                {hoveredDay && (
                  <div
                    className="absolute pointer-events-none z-50 px-2.5 py-1.5 border border-outline text-xs font-mono whitespace-nowrap"
                    style={{
                      left: hoverPos.x,
                      top: hoverPos.y,
                      transform: 'translate(-50%, -100%)',
                      backgroundColor: 'var(--surface-high)',
                      color: 'var(--on-surface)',
                    }}
                  >
                    <span className="text-on-surface-variant">
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
