"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface DayData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionData {
  total: Record<string, number>;
  contributions: DayData[];
}

const GITHUB_USERNAME = "fzhang13";
const WEEKS_TO_SHOW = 52;
const CELL_SIZE = 11;
const CELL_GAP = 3;

const LEVEL_COLORS = [
  "bg-dark-800/60",        // 0 - no contributions
  "bg-emerald-900/70",     // 1
  "bg-emerald-700/80",     // 2
  "bg-emerald-500/90",     // 3
  "bg-emerald-400",        // 4
];

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

/* ------------------------------------------------------------------ */
/*  Helper: build week columns from flat day array                     */
/* ------------------------------------------------------------------ */
function buildWeeks(contributions: DayData[]): DayData[][] {
  // contributions is day-by-day for the past year
  // We need to group by week (Sun-Sat columns)
  const weeks: DayData[][] = [];
  let currentWeek: DayData[] = [];

  for (const day of contributions) {
    const d = new Date(day.date);
    const dayOfWeek = d.getDay(); // 0 = Sun

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Only show last N weeks
  return weeks.slice(-WEEKS_TO_SHOW);
}

/* ------------------------------------------------------------------ */
/*  Helper: figure out month labels from weeks                         */
/* ------------------------------------------------------------------ */
function getMonthMarkers(weeks: DayData[][]): { label: string; col: number }[] {
  const markers: { label: string; col: number }[] = [];
  let lastMonth = -1;

  for (let i = 0; i < weeks.length; i++) {
    const firstDay = weeks[i][0];
    if (!firstDay) continue;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      markers.push({ label: MONTH_LABELS[month], col: i });
      lastMonth = month;
    }
  }
  return markers;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function GitHubActivity() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((r) => (r.ok ? r.json() : null))
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

  const monthMarkers = useMemo(() => getMonthMarkers(weeks), [weeks]);

  const totalContributions = data
    ? Object.values(data.total).reduce((a, b) => a + b, 0)
    : 0;

  const gridWidth = weeks.length * (CELL_SIZE + CELL_GAP);

  return (
    <div ref={ref} className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Github size={20} className="text-dark-400" />
            <h3 className="text-white font-semibold text-lg">
              GitHub Activity
            </h3>
            {totalContributions > 0 && (
              <span className="text-dark-400 text-sm font-mono">
                {totalContributions.toLocaleString()} contributions in the last year
              </span>
            )}
          </div>

          {/* Graph */}
          <div className="glass-card p-5 overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32 text-dark-500 font-mono text-sm">
                Loading contributions...
              </div>
            ) : !data ? (
              <div className="flex items-center justify-center h-32 text-dark-500 font-mono text-sm">
                Unable to load contribution data
              </div>
            ) : (
              <div className="relative">
                {/* Month labels */}
                <div
                  className="flex text-xs text-dark-500 font-mono mb-1"
                  style={{ paddingLeft: 32 }}
                >
                  {monthMarkers.map((m, i) => (
                    <span
                      key={`${m.label}-${i}`}
                      className="absolute"
                      style={{
                        left: 32 + m.col * (CELL_SIZE + CELL_GAP),
                      }}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>

                <div className="flex mt-5">
                  {/* Day labels */}
                  <div
                    className="flex flex-col shrink-0 mr-2 text-xs text-dark-500 font-mono"
                    style={{ gap: CELL_GAP }}
                  >
                    {DAY_LABELS.map((label, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-end"
                        style={{ height: CELL_SIZE, width: 24 }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Grid */}
                  <div
                    className="flex"
                    style={{
                      gap: CELL_GAP,
                      minWidth: gridWidth,
                    }}
                  >
                    {weeks.map((week, wi) => (
                      <div
                        key={wi}
                        className="flex flex-col"
                        style={{ gap: CELL_GAP }}
                      >
                        {/* Pad first week if it doesn't start on Sunday */}
                        {wi === 0 &&
                          week.length < 7 &&
                          Array.from({
                            length: 7 - week.length,
                          }).map((_, pi) => (
                            <div
                              key={`pad-${pi}`}
                              style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                              }}
                            />
                          ))}
                        {week.map((day) => (
                          <div
                            key={day.date}
                            className={`rounded-sm cursor-default transition-all duration-150 hover:ring-1 hover:ring-dark-400 ${LEVEL_COLORS[day.level]}`}
                            style={{
                              width: CELL_SIZE,
                              height: CELL_SIZE,
                            }}
                            onMouseEnter={(e) => {
                              setHoveredDay(day);
                              const rect = (e.target as HTMLElement).getBoundingClientRect();
                              const parent = (e.target as HTMLElement).closest('.glass-card')?.getBoundingClientRect();
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
                </div>

                {/* Legend */}
                <div className="flex items-center gap-2 mt-4 justify-end">
                  <span className="text-dark-500 text-xs font-mono">Less</span>
                  {LEVEL_COLORS.map((color, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${color}`}
                      style={{ width: CELL_SIZE, height: CELL_SIZE }}
                    />
                  ))}
                  <span className="text-dark-500 text-xs font-mono">More</span>
                </div>

                {/* Hover tooltip */}
                {hoveredDay && (
                  <div
                    className="absolute pointer-events-none z-50 px-2.5 py-1.5 rounded-md bg-dark-800/95 border border-dark-600/50 text-xs text-white font-mono whitespace-nowrap backdrop-blur-sm"
                    style={{
                      left: hoverPos.x,
                      top: hoverPos.y,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <span className="text-dark-300">
                      {hoveredDay.count} contribution{hoveredDay.count !== 1 ? "s" : ""}
                    </span>{" "}
                    on{" "}
                    {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
    </div>
  );
}
