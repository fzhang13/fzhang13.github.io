"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Computer Programming & Analysis — Associate's Degree (With Honours)",
    school: "Seneca College",
    location: "Toronto, Ontario · 2017 — 2019",
    highlights: ["3.9 / 4.0 GPA", "President's Honour List"],
  },
];

const involvements = [
  "Game Institute Hackathon — May 2019",
  "Jam3 Tech Hackathon — May 2022",
  "Jam3 Midjourney AI Hackathon — July 2022",
  "MediaMonks AI Hackathon — July 2023",
];

export default function Education() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subheading font-mono">
            <span className="text-primary-400">05.</span> Education
          </p>
          <h2 className="section-heading mb-12">Where I Studied</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card p-6 hover-glow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0">
                  <GraduationCap size={20} className="text-primary-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{edu.degree}</h3>
                  <p className="text-primary-400 text-sm">{edu.school}</p>
                  <p className="text-dark-500 text-sm mb-3">{edu.location}</p>
                  {edu.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {edu.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="text-dark-300 text-sm flex items-center gap-2"
                        >
                          <span className="text-primary-500">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Hackathons / Involvements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card p-6 hover-glow"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0">
                <GraduationCap size={20} className="text-primary-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Hackathons & Involvements</h3>
                <ul className="space-y-1 mt-2">
                  {involvements.map((item, i) => (
                    <li
                      key={i}
                      className="text-dark-300 text-sm flex items-center gap-2"
                    >
                      <span className="text-primary-500">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
