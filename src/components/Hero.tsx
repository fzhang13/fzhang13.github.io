"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,145,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,145,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-transparent to-dark-950" />

      {/* Glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-mono text-primary-400 text-sm md:text-base mb-6 tracking-wider">
            $ whoami
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
        >
          Felix{" "}
          <span className="gradient-text">Zhang</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl text-dark-300 mb-8 font-light">
            Full-Stack Engineer{" "}
            <span className="text-dark-500">—</span>{" "}
            <span className="text-primary-400/80">Cloud & Backend</span> ·{" "}
            <span className="text-primary-400/80">AWS</span> ·{" "}
            <span className="text-primary-400/80">Scalable Systems</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <a
            href="https://github.com/fzhang13"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-dark-800/50 border border-dark-700/50 text-dark-300 hover:text-primary-400 hover:border-primary-500/30 transition-all hover-glow"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/f-zhang/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-dark-800/50 border border-dark-700/50 text-dark-300 hover:text-primary-400 hover:border-primary-500/30 transition-all hover-glow"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:felix.zhang.dev@gmail.com"
            className="p-3 rounded-xl bg-dark-800/50 border border-dark-700/50 text-dark-300 hover:text-primary-400 hover:border-primary-500/30 transition-all hover-glow"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#about"
            className="px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-500 transition-colors"
          >
            View My Work
          </a>
          <a
            href="/resume/FelixZhang.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl border border-dark-600 text-dark-200 font-medium hover:border-primary-500/30 hover:text-primary-400 transition-all"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-dark-500 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </motion.a>
    </section>
  );
}
