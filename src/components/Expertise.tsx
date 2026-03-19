"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Cloud,
  Server,
  Database,
  GitBranch,
  Shield,
  Layers,
  Send,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import copy from "@/copy.json";

const iconMap: Record<string, LucideIcon> = {
  Cloud, Server, Database, Layers, GitBranch, Shield,
};

// Tailwind can't detect dynamic classes from JSON, so map them here
const colorMap: Record<string, string> = {
  "from-orange-500 to-yellow-500": "from-orange-500 to-yellow-500",
  "from-primary-500 to-blue-500": "from-primary-500 to-blue-500",
  "from-green-500 to-emerald-500": "from-green-500 to-emerald-500",
  "from-cyan-500 to-teal-500": "from-cyan-500 to-teal-500",
  "from-purple-500 to-violet-500": "from-purple-500 to-violet-500",
  "from-red-500 to-rose-500": "from-red-500 to-rose-500",
};

const expertiseAreas = copy.expertise.areas;
const techStack = copy.expertise.techStack;

type RequestState = "idle" | "loading" | "done";

export default function Expertise() {
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const handleSend = useCallback(() => {
    if (requestState !== "idle") return;
    setRequestState("loading");
    setTimeout(() => setRequestState("done"), 900);
  }, [requestState]);

  return (
    <section id="expertise" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/5 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subheading font-mono">
            <span className="text-primary-400">{copy.expertise.sectionNumber}.</span> {copy.expertise.sectionLabel}
          </p>
          <h2 className="section-heading mb-4">{copy.expertise.heading}</h2>
          <p className="text-dark-400 max-w-2xl mb-10">
            {copy.expertise.description}
          </p>
        </motion.div>

        {/* API Request Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <div className="glass-card overflow-hidden">
            {/* Request line */}
            <div className="flex items-center gap-3 p-4 border-b border-dark-700/50">
              <span className="shrink-0 px-3 py-1 rounded-md bg-green-500/15 text-green-400 text-xs font-bold font-mono tracking-wider">
                GET
              </span>
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  readOnly
                  value={copy.expertise.apiEndpoint}
                  className="w-full bg-transparent text-dark-200 font-mono text-sm outline-none cursor-default truncate"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  tabIndex={0}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={requestState !== "idle"}
                className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-default ${
                  requestState === "idle"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 animate-pulse hover:animate-none"
                    : "bg-primary-600 text-white"
                }`}
              >
                {requestState === "loading" ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : requestState === "done" ? (
                  <Send size={14} />
                ) : (
                  <Send size={14} />
                )}
                {requestState === "idle" ? copy.expertise.sendLabel : "Send"}
              </button>
            </div>

            {/* Response area */}
            <AnimatePresence mode="wait">
              {requestState === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 flex items-center gap-3 text-dark-400 font-mono text-sm"
                >
                  <Loader2 size={14} className="animate-spin text-primary-400" />
                  <span>{copy.expertise.loadingText}</span>
                </motion.div>
              )}

              {requestState === "done" && (
                <motion.div
                  key="response"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4 }}
                  className="border-t border-dark-700/30"
                >
                  {/* Status line */}
                  <div className="px-4 py-2 flex items-center gap-3 border-b border-dark-700/30 bg-dark-900/30">
                    <span className="text-green-400 font-mono text-xs font-bold">
                      200 OK
                    </span>
                    <span className="text-dark-500 font-mono text-xs">
                      application/json &middot; {expertiseAreas.length + techStack.length} items &middot; 12ms
                    </span>
                  </div>

                  {/* JSON-style preview */}
                  <div className="px-4 py-3 max-h-32 overflow-auto">
                    <pre className="text-xs font-mono text-dark-400 leading-relaxed">
                      <span className="text-dark-500">{"{"}</span>{"\n"}
                      {"  "}<span className="text-primary-400">&quot;status&quot;</span>: <span className="text-green-400">&quot;success&quot;</span>,{"\n"}
                      {"  "}<span className="text-primary-400">&quot;expertise&quot;</span>: <span className="text-dark-500">[</span><span className="text-dark-500">{expertiseAreas.length} areas</span><span className="text-dark-500">]</span>,{"\n"}
                      {"  "}<span className="text-primary-400">&quot;techStack&quot;</span>: <span className="text-dark-500">[</span><span className="text-dark-500">{techStack.length} technologies</span><span className="text-dark-500">]</span>{"\n"}
                      <span className="text-dark-500">{"}"}</span>
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Expertise cards — only show after request completes */}
        <AnimatePresence>
          {requestState === "done" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                  },
                }}
              >
                {expertiseAreas.map((area) => (
                  <motion.div
                    key={area.title}
                    variants={{
                      hidden: { opacity: 0, y: 24, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.4 }}
                    className="glass-card p-6 hover-glow group cursor-default"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[area.color] || area.color} flex items-center justify-center mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}
                    >
                      {iconMap[area.icon] && (() => {
                        const Icon = iconMap[area.icon];
                        return <Icon size={20} className="text-white" />;
                      })()}
                    </div>
                    <h3 className="text-white font-semibold mb-2">
                      {area.title}
                    </h3>
                    <p className="text-dark-400 text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Tech stack tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-white font-semibold mb-4 text-lg">
                  {copy.expertise.techStackHeading}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-3 py-1.5 rounded-lg bg-dark-800/60 border border-dark-700/40 text-dark-200 text-sm font-mono hover:border-primary-500/30 hover:text-primary-400 transition-colors cursor-default"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
