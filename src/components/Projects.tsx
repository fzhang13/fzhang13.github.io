"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import GitHubActivity from "@/components/GitHubActivity";
import copy from "@/copy.json";

const projects = copy.projects.items;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/5 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subheading font-mono">
            <span className="text-primary-400">{copy.projects.sectionNumber}.</span> {copy.projects.sectionLabel}
          </p>
          <h2 className="section-heading mb-4">{copy.projects.heading}</h2>
          <p className="text-dark-400 max-w-2xl mb-12">
            {copy.projects.description}
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="glass-card p-6 flex flex-col hover-glow group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-primary-400 font-mono text-xs tracking-wider">
                  {project.category}
                </span>
                <div className="flex items-center gap-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-400 hover:text-primary-400 transition-colors"
                      aria-label={`Live: ${project.title}`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-dark-400 text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-dark-800/80 text-dark-300 text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub Activity Graph */}
        <div className="mt-16">
          <GitHubActivity />
        </div>
      </div>
    </section>
  );
}
