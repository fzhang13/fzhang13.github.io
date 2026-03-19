"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, ExternalLink, ChevronDown } from "lucide-react";
import copy from "@/copy.json";

const experiences = copy.experience.items;

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpanded((prev) => (prev === index ? null : index));
  };

  return (
    <section id="experience" className="py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subheading font-mono">
            <span className="text-primary-400">{copy.experience.sectionNumber}.</span> {copy.experience.sectionLabel}
          </p>
          <h2 className="section-heading mb-12">{copy.experience.heading}</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-dark-700/50" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isOpen = expanded === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative pl-8 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 md:left-8 top-1 -translate-x-1/2 w-3 h-3 rounded-full border-4 border-dark-950 z-10 transition-colors duration-300 ${
                      isOpen ? "bg-green-400" : "bg-primary-500"
                    }`}
                  />

                  <div className="glass-card hover-glow overflow-hidden">
                    {/* Clickable header */}
                    <button
                      onClick={() => toggle(index)}
                      className="w-full text-left p-6 cursor-pointer group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <h3 className="text-white font-semibold text-lg">
                              {exp.title}
                            </h3>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="shrink-0 text-dark-400 group-hover:text-primary-400 transition-colors"
                            >
                              <ChevronDown size={18} />
                            </motion.div>
                          </div>
                          <p className="text-dark-300 mt-1">
                            {exp.companyUrl ? (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-primary-400 hover:underline inline-flex items-center gap-1"
                              >
                                {exp.company}
                                <ExternalLink size={12} />
                              </a>
                            ) : (
                              <span className="text-primary-400">
                                {exp.company}
                              </span>
                            )}
                            {" · "}
                            {exp.location}
                          </p>
                        </div>
                        <span className="text-dark-500 font-mono text-sm whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>

                      {/* Tags always visible */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md bg-primary-500/10 text-primary-400 text-xs font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Expand hint */}
                      {!isOpen && (
                        <p className="text-dark-500 text-xs mt-3 font-mono group-hover:text-dark-400 transition-colors">
                          Click to expand {exp.highlights.length} highlights
                        </p>
                      )}
                    </button>

                    {/* Expandable highlights */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-dark-700/40">
                            <ul className="space-y-3 pt-4">
                              {exp.highlights.map((highlight, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: i * 0.04,
                                  }}
                                  className="text-dark-300 text-sm flex items-start gap-2"
                                >
                                  <span className="text-primary-500 mt-1.5 shrink-0">
                                    ▹
                                  </span>
                                  {highlight}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
