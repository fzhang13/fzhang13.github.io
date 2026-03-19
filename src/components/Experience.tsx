"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, ExternalLink } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  highlights: string[];
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Full Stack Developer",
    company: "MediaMonks Inc. (formerly Jam3)",
    companyUrl: "https://www.mediamonks.com",
    location: "Toronto, Ontario, Canada",
    period: "2020 — Present",
    highlights: [
      "Architected and delivered full-stack solutions for high-profile digital experiences including Zoox.com, Adidas LA flagship retail installation, Oculus Creators platform, Adidas FIFA World Cup campaign, Airbnb x Obama Voyager Scholarship portal, and Novi.com",
      "Engineered backend infrastructure for KFC Polladas (Mexico City) and Texas State Technical College digital experiences, ensuring scalability and performance",
      "Contributing developer on Facebook Marketplace, CreativeX, Brand Portal, WhatsApp.com, Oculus.com, Adidas Community, and Visa Super Bowl digital experience",
      "Deployed production code to Meta's internal infrastructure as a contingent engineering employee, adhering to enterprise-level code quality and security standards",
      "Advanced full-stack monorepo architecture and front-end framework standards, establishing best practices for scalable application development",
      "Maintained and enhanced open-source projects and internal toolings, improving developer productivity across teams",
      "Transformed proof-of-concept prototypes into production applications",
      "Led co-op recruitment strategy and mentorship programs to develop junior engineering talent",
      "Spearheaded documentation initiative to improve visibility and adoption of tools used across the department",
    ],
    tags: ["React", "Next.js", "Node.js", "PHP", "AWS", "Docker", "GraphQL", "Terraform"],
  },
  {
    title: "Full-Stack Application Developer",
    company: "Palomino Systems Innovations Inc.",
    companyUrl: "https://www.palominosys.com/",
    location: "Toronto, Ontario, Canada",
    period: "2019 — 2020",
    highlights: [
      "Designed and implemented custom subscription management system leveraging Stripe API with automated renewal processing",
      "Orchestrated enterprise data migration for Sterling Capital Brokers, transferring legacy datasets across MySQL and PostgreSQL using Laravel-based ETL pipelines",
      "Delivered full-stack web applications using Laravel, MySQL, and JavaScript",
    ],
    tags: ["Laravel", "PHP", "MySQL", "PostgreSQL", "JavaScript", "Stripe"],
  },
];

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subheading font-mono">
            <span className="text-primary-400">03.</span> Experience
          </p>
          <h2 className="section-heading mb-12">Where I&apos;ve Worked</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-dark-700/50" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-500 border-4 border-dark-950 z-10" />

                <div className="glass-card p-6 hover-glow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {exp.title}
                      </h3>
                      <p className="text-dark-300">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-400 hover:underline inline-flex items-center gap-1"
                          >
                            {exp.company}
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span className="text-primary-400">{exp.company}</span>
                        )}
                        {" · "}
                        {exp.location}
                      </p>
                    </div>
                    <span className="text-dark-500 font-mono text-sm whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-dark-300 text-sm flex items-start gap-2"
                      >
                        <span className="text-primary-500 mt-1.5 shrink-0">
                          ▹
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-primary-500/10 text-primary-400 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
