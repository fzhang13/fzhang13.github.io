"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, type LucideIcon } from "lucide-react";
import copy from "@/copy.json";
import TechPlayground from "@/components/TechPlayground";

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

interface HeroProps {
  revealed: boolean;
  onReveal: () => void;
}

export default function Hero({ revealed, onReveal }: HeroProps) {
  const handleReveal = useCallback(() => {
    if (!revealed) onReveal();
  }, [revealed, onReveal]);

  // Lock scroll until revealed — but only if the user is near the top.
  // If they refreshed while scrolled down, auto-reveal so the page isn't stuck.
  useEffect(() => {
    if (!revealed) {
      if (window.scrollY > 100) {
        onReveal();
      } else {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [revealed, onReveal]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleReveal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleReveal]);

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

      {/* Tech icons – clustered center-bottom, launch on reveal */}
      <TechPlayground revealed={revealed} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-mono text-primary-400 text-sm md:text-base mb-6 tracking-wider">
            {copy.hero.prompt}
            {!revealed && (
              <span className="inline-block w-2 h-4 bg-primary-400 ml-1 align-middle animate-[blink_1s_step-end_infinite]" />
            )}
          </p>
        </motion.div>

        {/* Name — blurred until revealed */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight transition-all duration-700 ${
            revealed ? "blur-0" : "blur-md select-none"
          }`}
        >
          {copy.hero.firstName}{" "}
          <span className="gradient-text">{copy.hero.lastName}</span>
        </motion.h1>

        {/* Description — blurred until revealed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`transition-all duration-700 ${
            revealed ? "blur-0" : "blur-md select-none"
          }`}
        >
          <h2 className="text-xl md:text-2xl text-dark-300 mb-8 font-light">
            {copy.hero.subtitle}{" "}
            <span className="text-dark-500">—</span>{" "}
            {copy.hero.subtitleParts.map((part, i) => (
              <span key={part}>
                <span className="text-primary-400/80">{part}</span>
                {i < copy.hero.subtitleParts.length - 1 && " · "}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* CTA: press enter or click to reveal */}
        <div className={`mb-8 transition-all duration-500 ${revealed ? 'h-0 overflow-hidden opacity-0' : 'opacity-100'}`}>
          {!revealed && (
            <button
              onClick={handleReveal}
              className="px-6 py-3 rounded-xl bg-primary-600/20 border border-primary-500/40 text-primary-400 font-mono text-sm hover:bg-primary-600/30 transition-all cursor-pointer"
            >
              {copy.hero.revealCta}
            </button>
          )}
        </div>

        {/* Social links + CTAs — appear after reveal */}
        <motion.div
          initial={false}
          animate={{
            opacity: revealed ? 1 : 0,
            y: revealed ? 0 : 20,
          }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          {copy.hero.socials.map((s) => {
            const Icon = iconMap[s.platform];
            return (
              <a
                key={s.platform}
                href={s.href}
                target={s.platform === "email" ? undefined : "_blank"}
                rel={s.platform === "email" ? undefined : "noopener noreferrer"}
                className="p-3 rounded-xl bg-dark-800/50 border border-dark-700/50 text-dark-300 hover:text-primary-400 hover:border-primary-500/30 transition-all hover-glow"
                aria-label={s.label}
              >
                {Icon && <Icon size={20} />}
              </a>
            );
          })}
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            opacity: revealed ? 1 : 0,
            y: revealed ? 0 : 20,
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={copy.hero.viewWorkHref}
            className="px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-500 transition-colors"
          >
            {copy.hero.viewWorkLabel}
          </a>
          <a
            href={copy.hero.downloadCvHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl border border-dark-600 text-dark-200 font-medium hover:border-primary-500/30 hover:text-primary-400 transition-all"
          >
            {copy.hero.downloadCvLabel}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — only after reveal */}
      {revealed && (
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-dark-500 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={24} />
        </motion.a>
      )}
    </section>
  );
}
