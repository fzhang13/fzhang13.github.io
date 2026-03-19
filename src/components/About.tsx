"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Cloud, Terminal, Boxes, MapPin } from "lucide-react";

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subheading font-mono">
            <span className="text-primary-400">01.</span> About
          </p>
          <h2 className="section-heading mb-12">Who I Am</h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div
            className="md:col-span-3 space-y-5"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-dark-200 text-lg leading-relaxed">
              Hey there! I&apos;m <span className="text-white font-semibold">Felix Zhang</span>, 
              a Full-Stack Engineer with 6+ years of experience, based in{" "}
              <span className="text-primary-400 inline-flex items-center gap-1">
                <MapPin size={14} /> Toronto, Canada
              </span>.
            </p>

            <p className="text-dark-300 leading-relaxed">
              I specialize in delivering scalable web applications, cloud
              infrastructure, and digital experiences. From architecting
              serverless backends on{" "}
              <span className="text-white">AWS</span> and{" "}
              <span className="text-white">GCP</span> to building full-stack
              monorepo architectures.
            </p>

            <p className="text-dark-300 leading-relaxed">
              I&apos;ve shipped production code at{" "}
              <span className="text-white">Meta (Facebook)</span> as a contingent
              engineer, and built high-profile experiences for brands like{" "}
              <span className="text-white">Adidas</span>,{" "}
              <span className="text-white">Airbnb</span>,{" "}
              <span className="text-white">KFC</span>, and{" "}
              <span className="text-white">Zoox</span> at{" "}
              <a
                href="https://www.mediamonks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:underline"
              >
                MediaMonks (formerly Jam3)
              </a>
              . My backend focus includes Node.js, PostgreSQL, GraphQL, Docker,
              Terraform, and serverless architecture.
            </p>

            <p className="text-dark-300 leading-relaxed">
              Outside of work, I&apos;m either chasing powder on the slopes,
              building custom mechanical keyboards, running, cycling, or coding
              to{" "}
              <a
                href="https://youtu.be/hHW1oY26kxQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:underline"
              >
                chill beats
              </a>
              .
            </p>
          </motion.div>

          <motion.div
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Terminal-style info card */}
            <div className="glass-card p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-dark-500 text-xs">about.sh</span>
              </div>
              <div className="space-y-2 text-dark-300">
                <p>
                  <span className="text-primary-400">$</span> cat profile.yml
                </p>
                <p className="pl-4">
                  <span className="text-dark-500">name:</span>{" "}
                  <span className="text-white">Felix Zhang</span>
                </p>
                <p className="pl-4">
                  <span className="text-dark-500">role:</span>{" "}
                  <span className="text-green-400">Full-Stack Engineer</span>
                </p>
                <p className="pl-4">
                  <span className="text-dark-500">location:</span> Toronto, CA
                </p>
                <p className="pl-4">
                  <span className="text-dark-500">focus:</span>{" "}
                  <span className="text-yellow-400">AWS</span> ·{" "}
                  <span className="text-yellow-400">Cloud</span> ·{" "}
                  <span className="text-yellow-400">Backend</span>
                </p>
                <p className="pl-4">
                  <span className="text-dark-500">languages:</span>
                </p>
                <p className="pl-8">
                  - JS · TypeScript · PHP · Python
                </p>
                <p className="pl-8">
                  - SQL · Java · HTML/CSS/SCSS
                </p>
                <p className="pl-4">
                  <span className="text-dark-500">hobbies:</span>{" "}
                  keyboards, snowboarding,
                </p>
                <p className="pl-8">
                  running, cycling
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Cloud, label: "Cloud", value: "AWS/GCP" },
                { icon: Terminal, label: "Experience", value: "6+ yrs" },
                { icon: Boxes, label: "Projects", value: "20+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 text-center"
                >
                  <stat.icon className="mx-auto mb-2 text-primary-400" size={18} />
                  <p className="text-white font-semibold text-sm">{stat.value}</p>
                  <p className="text-dark-500 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
