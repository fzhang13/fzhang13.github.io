"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: "Zoox.com",
    description:
      "Full-stack digital experience for Zoox, Amazon's autonomous vehicle subsidiary. Architected and delivered a high-performance web platform showcasing their robotaxi technology.",
    tags: ["React", "Next.js", "Node.js", "AWS"],
    category: "FULLSTACK · MEDIAMONKS",
    live: "https://www.zoox.com",
  },
  {
    title: "Adidas Experiences",
    description:
      "Multiple high-profile Adidas projects including the LA flagship retail installation, FIFA World Cup campaign, and Adidas Community platform.",
    tags: ["React", "TypeScript", "Node.js", "GraphQL"],
    category: "FULLSTACK · MEDIAMONKS",
  },
  {
    title: "Airbnb x Obama Voyager",
    description:
      "Built the Airbnb x Obama Voyager Scholarship portal — a digital experience connecting students to travel scholarship opportunities.",
    tags: ["React", "Next.js", "Node.js"],
    category: "FULLSTACK · MEDIAMONKS",
  },
  {
    title: "Novi.com (Meta)",
    description:
      "Led development of the Novi digital wallet marketing site at Meta. Multi-locale launch with advanced content management and the Novi Newsroom feature.",
    tags: ["React", "PHP", "Hacklang", "Node.js"],
    category: "FULLSTACK · META",
  },
  {
    title: "WhatsApp.com & Meta Properties",
    description:
      "Contributing developer on Facebook Marketplace, CreativeX, Brand Portal, WhatsApp.com, Oculus.com, and Visa Super Bowl digital experience.",
    tags: ["React", "PHP", "Hacklang", "Web Performance"],
    category: "FULLSTACK · META",
    live: "https://www.whatsapp.com",
  },
  {
    title: "Portfolio Website",
    description:
      "This site — built with Next.js 14, Tailwind CSS, and Framer Motion. Statically exported and deployed to GitHub Pages via GitHub Actions CI/CD.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "FRONTEND · OSS",
    github: "https://github.com/fzhang13/fzhang13.github.io",
  },
];

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
            <span className="text-primary-400">04.</span> Projects
          </p>
          <h2 className="section-heading mb-4">Things I&apos;ve Built</h2>
          <p className="text-dark-400 max-w-2xl mb-12">
            A mix of cloud infrastructure, backend services, and full-stack
            applications I&apos;ve worked on.
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
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-400 hover:text-primary-400 transition-colors"
                      aria-label={`GitHub: ${project.title}`}
                    >
                      <Github size={18} />
                    </a>
                  )}
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
      </div>
    </section>
  );
}
