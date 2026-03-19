"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Cloud,
  Server,
  Database,
  GitBranch,
  Shield,
  Workflow,
  Container,
  Cpu,
  Globe,
  Code2,
  Terminal,
  Layers,
} from "lucide-react";

const expertiseAreas = [
  {
    title: "Cloud & DevOps",
    description:
      "AWS, GCP, Docker, Terraform, Serverless Architecture, CI/CD (CircleCI), infrastructure provisioning & cloud-native deployments",
    icon: Cloud,
    color: "from-orange-500 to-yellow-500",
  },
  {
    title: "Backend Development",
    description:
      "Node.js, GraphQL, RESTful APIs, microservices, server-side rendering, backend infrastructure engineering for scalable digital experiences",
    icon: Server,
    color: "from-primary-500 to-blue-500",
  },
  {
    title: "Database & Storage",
    description:
      "PostgreSQL, MySQL, MongoDB, data modeling, ETL pipelines, enterprise data migrations & integration",
    icon: Database,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Frontend Development",
    description:
      "React, Next.js, React Native, TypeScript, monorepo architecture, component libraries & design systems",
    icon: Layers,
    color: "from-cyan-500 to-teal-500",
  },
  {
    title: "Full-Stack Architecture",
    description:
      "End-to-end application design, proof-of-concept prototyping to production, framework standards & best practices",
    icon: GitBranch,
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Tools & Workflow",
    description:
      "Git, GitHub, Mercurial, Jira, Postman, Figma, VSCode, open-source contributions & internal tooling",
    icon: Shield,
    color: "from-red-500 to-rose-500",
  },
];

const techStack = [
  { name: "JavaScript", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "PHP", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "SQL", category: "Language" },
  { name: "Java", category: "Language" },
  { name: "HTML/CSS/SCSS", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "React Native", category: "Mobile" },
  { name: "Node.js", category: "Runtime" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "GraphQL", category: "API" },
  { name: "AWS", category: "Cloud" },
  { name: "GCP", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Terraform", category: "IaC" },
  { name: "Serverless", category: "Architecture" },
  { name: "CircleCI", category: "CI/CD" },
  { name: "Git", category: "Tool" },
  { name: "Mercurial", category: "Tool" },
  { name: "Jira", category: "Tool" },
  { name: "Figma", category: "Tool" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Expertise() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="expertise" className="py-24 md:py-32 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/5 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subheading font-mono">
            <span className="text-primary-400">02.</span> Expertise
          </p>
          <h2 className="section-heading mb-4">What I Do</h2>
          <p className="text-dark-400 max-w-2xl mb-12">
            I build and scale cloud infrastructure and backend systems. Here&apos;s
            what I bring to the table.
          </p>
        </motion.div>

        {/* Expertise cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {expertiseAreas.map((area) => (
            <motion.div
              key={area.title}
              variants={itemVariants}
              className="glass-card p-6 hover-glow group cursor-default"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${area.color} flex items-center justify-center mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}
              >
                <area.icon size={20} className="text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">{area.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech stack tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-white font-semibold mb-4 text-lg">Tech Stack</h3>
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
      </div>
    </section>
  );
}
