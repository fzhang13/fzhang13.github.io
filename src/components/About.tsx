"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Cloud, Terminal, Boxes, MapPin, type LucideIcon } from "lucide-react";
import InteractiveTerminal from "./InteractiveTerminal";
import copy from "@/copy.json";

const statIcons: Record<string, LucideIcon> = {
  Cloud, Terminal, Boxes,
};

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
            <span className="text-primary-400">{copy.about.sectionNumber}.</span> {copy.about.sectionLabel}
          </p>
          <h2 className="section-heading mb-12">{copy.about.heading}</h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Node.js-style code card */}
            <div className="glass-card p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-dark-500 text-xs">felix.js</span>
              </div>

              <div className="space-y-1 text-dark-300">
                <p><span className="text-purple-400">const</span> <span className="text-blue-300">felix</span> <span className="text-primary-400">=</span> {`{`}</p>

                <p className="pl-4">
                  <span className="text-dark-500">name:</span>{" "}
                  <span className="text-green-400">&quot;Felix Zhang&quot;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-dark-500">role:</span>{" "}
                  <span className="text-green-400">&quot;Full-Stack Engineer&quot;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-dark-500">experience:</span>{" "}
                  <span className="text-green-400">&quot;6+ years&quot;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-dark-500">location:</span>{" "}
                  <span className="text-green-400">&quot;Toronto, Canada&quot;</span>,
                </p>

                <p className="mt-3 pl-4">
                  <span className="text-dark-500">summary:</span> [
                </p>
                <p className="pl-8">
                  <span className="text-green-400">&quot;Scalable web apps, cloud infra &amp; digital experiences&quot;</span>,
                </p>
                <p className="pl-8">
                  <span className="text-green-400">&quot;Serverless backends on AWS &amp; GCP&quot;</span>,
                </p>
                <p className="pl-8">
                  <span className="text-green-400">&quot;Full-stack monorepo architectures&quot;</span>,
                </p>
                <p className="pl-4">],</p>

                <p className="mt-3 pl-4">
                  <span className="text-dark-500">shipped:</span> [
                </p>
                <p className="pl-8">
                  <span className="text-green-400">&quot;Meta (Facebook)&quot;</span>,{" "}
                  <span className="text-dark-600">// contingent engineer</span>
                </p>
                <p className="pl-8">
                  <span className="text-green-400">&quot;Adidas&quot;</span>,{" "}
                  <span className="text-green-400">&quot;Airbnb&quot;</span>,{" "}
                  <span className="text-green-400">&quot;KFC&quot;</span>,{" "}
                  <span className="text-green-400">&quot;Zoox&quot;</span>,
                </p>
                <p className="pl-8">
                  <span className="text-green-400">&quot;WhatsApp&quot;</span>,{" "}
                  <span className="text-green-400">&quot;Oculus&quot;</span>,{" "}
                  <span className="text-green-400">&quot;Visa&quot;</span>,
                </p>
                <p className="pl-4">],</p>

                <p className="mt-3 pl-4">
                  <span className="text-dark-500">backend:</span> [
                </p>
                <p className="pl-8">
                  <span className="text-green-400">&quot;Node.js&quot;</span>,{" "}
                  <span className="text-green-400">&quot;PostgreSQL&quot;</span>,{" "}
                  <span className="text-green-400">&quot;GraphQL&quot;</span>,
                </p>
                <p className="pl-8">
                  <span className="text-green-400">&quot;Docker&quot;</span>,{" "}
                  <span className="text-green-400">&quot;Terraform&quot;</span>,{" "}
                  <span className="text-green-400">&quot;Serverless&quot;</span>,
                </p>
                <p className="pl-4">],</p>

                <p className="mt-3 pl-4">
                  <span className="text-dark-500">offHours:</span> [
                </p>
                <p className="pl-8">
                  <span className="text-green-400">&quot;chasing powder &#x26d7;&quot;</span>,{" "}
                  <span className="text-green-400">&quot;building keyboards &#x2328;&quot;</span>,
                </p>
                <p className="pl-8">
                  <span className="text-green-400">&quot;running&quot;</span>,{" "}
                  <span className="text-green-400">&quot;cycling&quot;</span>,{" "}
                  <span className="text-green-400">&quot;coding to{" "}
                  <a
                    href="https://youtu.be/hHW1oY26kxQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:underline"
                  >chill beats</a>&quot;</span>,
                </p>
                <p className="pl-4">],</p>

                <p>{`}`};</p>

                <p className="mt-3">
                  <span className="text-purple-400">module</span>.<span className="text-blue-300">exports</span> <span className="text-primary-400">=</span> felix;
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Interactive terminal */}
            <InteractiveTerminal />

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {copy.about.stats.map((stat) => {
                const Icon = statIcons[stat.icon];
                return (
                  <div
                    key={stat.label}
                    className="glass-card p-4 text-center"
                  >
                    {Icon && <Icon className="mx-auto mb-2 text-primary-400" size={18} />}
                    <p className="text-white font-semibold text-sm">{stat.value}</p>
                    <p className="text-dark-500 text-xs">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
