"use client";

import { useState, useRef, useCallback, useEffect, type ComponentType, type SVGProps } from "react";
import {
  JavaScript,
  TypeScript,
  Python,
  PHP,
  Java,
  HTML5,
  CSS3,
  React as ReactIcon,
  NextJs,
  NodeJs,
  PostgreSQL,
  MySQL,
  MongoDB,
  GraphQL,
  AWS,
  GoogleCloud,
  Docker,
  Terraform,
  Serverless,
  Git,
  CircleCI,
  Figma,
  Jira,
  TailwindCSS,
} from "developer-icons";

/* ------------------------------------------------------------------ */
/*  Tech data                                                          */
/* ------------------------------------------------------------------ */
interface TechItem {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  category: string;
}

const TECHS: TechItem[] = [
  { name: "JavaScript",   icon: JavaScript,   category: "Language" },
  { name: "TypeScript",   icon: TypeScript,   category: "Language" },
  { name: "Python",       icon: Python,       category: "Language" },
  { name: "PHP",          icon: PHP,          category: "Language" },
  { name: "Java",         icon: Java,         category: "Language" },
  { name: "HTML",         icon: HTML5,        category: "Language" },
  { name: "CSS",          icon: CSS3,         category: "Language" },
  { name: "React",        icon: ReactIcon,    category: "Frontend" },
  { name: "Next.js",      icon: NextJs,       category: "Framework" },
  { name: "Node.js",      icon: NodeJs,       category: "Runtime" },
  { name: "PostgreSQL",   icon: PostgreSQL,   category: "Database" },
  { name: "MySQL",        icon: MySQL,        category: "Database" },
  { name: "MongoDB",      icon: MongoDB,      category: "Database" },
  { name: "GraphQL",      icon: GraphQL,      category: "API" },
  { name: "AWS",          icon: AWS,          category: "Cloud" },
  { name: "GCP",          icon: GoogleCloud,  category: "Cloud" },
  { name: "Docker",       icon: Docker,       category: "DevOps" },
  { name: "Terraform",    icon: Terraform,    category: "IaC" },
  { name: "Serverless",   icon: Serverless,   category: "Arch" },
  { name: "Git",          icon: Git,          category: "Tool" },
  { name: "CircleCI",     icon: CircleCI,     category: "CI/CD" },
  { name: "Figma",        icon: Figma,        category: "Tool" },
  { name: "Jira",         icon: Jira,         category: "Tool" },
  { name: "Tailwind CSS", icon: TailwindCSS,  category: "Frontend" },
];

/* ------------------------------------------------------------------ */
/*  Physics state per badge                                            */
/* ------------------------------------------------------------------ */
interface Badge {
  id: number;
  tech: TechItem;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  active: boolean;
  rotation: number;
  vr: number;
  scale: number;
}

const BADGE_SIZE = 52;
const RESTITUTION = 0.75;
const FRICTION = 0.995;
const GRAVITY = 0.15;
const POP_SPEED_MIN = 8;
const POP_SPEED_MAX = 18;
const SETTLE_SPEED = 0.3;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/* ------------------------------------------------------------------ */
/*  Component – designed to overlay inside the Hero section            */
/* ------------------------------------------------------------------ */
interface TechPlaygroundProps {
  revealed: boolean;
}

export default function TechPlayground({ revealed }: TechPlaygroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<Badge[]>([]);
  const rafRef = useRef<number>(0);
  const hasLaunchedRef = useRef(false);
  const [, forceRender] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  /* initialise badges clustered in the center-bottom --------------- */
  const initBadges = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const W = el.clientWidth;
    const H = el.clientHeight;
    const cx = W / 2;
    const cy = H * 0.65;

    badgesRef.current = TECHS.map((tech, i) => ({
      id: i,
      tech,
      x: cx - BADGE_SIZE / 2 + rand(-80, 80),
      y: cy + rand(-40, 40),
      vx: 0,
      vy: 0,
      size: BADGE_SIZE,
      active: false,
      rotation: rand(-20, 20),
      vr: 0,
      scale: 1,
    }));
    hasLaunchedRef.current = false;
    forceRender((n) => n + 1);
  }, []);

  /* physics loop --------------------------------------------------- */
  const tick = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const W = el.clientWidth;
    const H = el.clientHeight;
    let anyActive = false;

    for (const b of badgesRef.current) {
      if (!b.active) continue;
      anyActive = true;

      b.vy += GRAVITY;
      b.vx *= FRICTION;
      b.vy *= FRICTION;
      b.x += b.vx;
      b.y += b.vy;
      b.rotation += b.vr;
      b.vr *= 0.98;

      // bounce off walls
      if (b.x < 0) { b.x = 0; b.vx = -b.vx * RESTITUTION; b.vr = rand(-8, 8); }
      if (b.x + b.size > W) { b.x = W - b.size; b.vx = -b.vx * RESTITUTION; b.vr = rand(-8, 8); }
      if (b.y < 0) { b.y = 0; b.vy = -b.vy * RESTITUTION; b.vr = rand(-8, 8); }
      if (b.y + b.size > H) { b.y = H - b.size; b.vy = -b.vy * RESTITUTION; b.vr = rand(-8, 8); }

      // badge–badge collisions
      for (const o of badgesRef.current) {
        if (o.id <= b.id) continue;
        const dx = (o.x + o.size / 2) - (b.x + b.size / 2);
        const dy = (o.y + o.size / 2) - (b.y + b.size / 2);
        const dist = Math.hypot(dx, dy);
        const minDist = (b.size + o.size) / 2;
        if (dist < minDist && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = minDist - dist;
          b.x -= nx * overlap / 2;
          b.y -= ny * overlap / 2;
          o.x += nx * overlap / 2;
          o.y += ny * overlap / 2;
          const dvx = b.vx - o.vx;
          const dvy = b.vy - o.vy;
          const dot = dvx * nx + dvy * ny;
          if (dot > 0) {
            b.vx -= dot * nx * RESTITUTION;
            b.vy -= dot * ny * RESTITUTION;
            o.vx += dot * nx * RESTITUTION;
            o.vy += dot * ny * RESTITUTION;
            o.active = true;
            b.vr = rand(-6, 6);
            o.vr = rand(-6, 6);
          }
        }
      }

      // settle
      const speed = Math.hypot(b.vx, b.vy);
      if (speed < SETTLE_SPEED && b.y + b.size >= H - 2) {
        b.vy = 0;
        b.vx = 0;
        b.vr = 0;
        b.active = false;
      }
    }

    forceRender((n) => n + 1);
    if (anyActive) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  /* launch all badges outward -------------------------------------- */
  const launchAll = useCallback(() => {
    for (const b of badgesRef.current) {
      const angle = rand(-Math.PI * 0.85, -Math.PI * 0.15);
      const speed = rand(POP_SPEED_MIN, POP_SPEED_MAX);
      b.vx = Math.cos(angle) * speed;
      b.vy = Math.sin(angle) * speed;
      b.vr = rand(-12, 12);
      b.active = true;
    }
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  /* clicking any badge re-launches all ----------------------------- */
  const handleClick = useCallback(() => {
    launchAll();
  }, [launchAll]);

  /* mount ---------------------------------------------------------- */
  useEffect(() => {
    initBadges();
    const onResize = () => {
      cancelAnimationFrame(rafRef.current);
      initBadges();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initBadges]);

  /* auto-launch when revealed for the first time ------------------- */
  useEffect(() => {
    if (revealed && !hasLaunchedRef.current && badgesRef.current.length > 0) {
      hasLaunchedRef.current = true;
      // small delay so the unblur transition is visible first
      const timer = setTimeout(() => launchAll(), 300);
      return () => clearTimeout(timer);
    }
  }, [revealed, launchAll]);

  const badges = badgesRef.current;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none transition-opacity duration-700 ${
        revealed ? "opacity-100" : "opacity-0"
      }`}
    >
      {badges.map((b) => {
        const Icon = b.tech.icon;
        const isHovered = hoveredId === b.id;
        return (
          <button
            key={b.id}
            onClick={handleClick}
            onMouseEnter={() => setHoveredId(b.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute top-0 left-0 flex items-center justify-center rounded-xl pointer-events-auto cursor-pointer"
            style={{
              width: b.size,
              height: b.size,
              transform: `translate3d(${b.x}px, ${b.y}px, 0) rotate(${b.rotation}deg) scale(${b.scale})`,
              willChange: "transform",
              filter: isHovered ? "brightness(1.2) drop-shadow(0 0 12px rgba(255,255,255,0.3))" : "none",
            }}
            title={b.tech.name}
          >
            <Icon size={36} />
          </button>
        );
      })}

      {/* Hovered label tooltip */}
      {hoveredId !== null && badgesRef.current[hoveredId] && revealed && (
        <div
          className="absolute top-0 left-0 pointer-events-none z-50 px-2 py-1 rounded bg-dark-800/90 border border-dark-600/50 text-xs text-white font-mono whitespace-nowrap backdrop-blur-sm"
          style={{
            transform: `translate3d(${badgesRef.current[hoveredId].x + badgesRef.current[hoveredId].size / 2}px, ${badgesRef.current[hoveredId].y - 28}px, 0) translateX(-50%)`,
          }}
        >
          {badgesRef.current[hoveredId].tech.name}
        </div>
      )}
    </div>
  );
}
