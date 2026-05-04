'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import copy from '@/copy.json';
import BootSequence from '@/components/shared/BootSequence';
import HomeShell from '@/components/HomeShell';

const socials = [
  { icon: Github, ...copy.hero.socials[0] },
  { icon: Linkedin, ...copy.hero.socials[1] },
  { icon: Mail, ...copy.hero.socials[2] },
];

export default function HomePage() {
  return (
    <>
      <BootSequence />

      <div className="min-h-[calc(100vh-theme(spacing.topnav)-6rem)]  flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {/* Terminal prompt */}
          <div className="font-mono text-sm text-on-surface-variant mb-6">
            <span className="text-primary">$</span>{' '}
            {copy.hero.prompt.replace('$ ', '')}
          </div>

          {/* Name */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-on-surface tracking-tight leading-none mb-4 phosphor-glow">
            {copy.hero.firstName}
            <br />
            {copy.hero.lastName}
          </h1>

          {/* Role */}
          <div className="font-mono text-lg md:text-xl text-primary-dim mb-2">
            {copy.hero.subtitle}
          </div>

          {/* Subtitle parts */}
          <div className="font-mono text-sm text-on-surface-variant mb-8 flex flex-wrap gap-x-4 gap-y-1">
            {copy.hero.subtitleParts.map((part, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-primary">&gt;</span> {part}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href={copy.hero.viewWorkHref.replace('#about', '/about')}
              className="px-6 py-2 border border-primary bg-primary text-bg font-mono text-sm uppercase tracking-wider hover:bg-transparent hover:text-primary transition-colors"
            >
              {copy.hero.viewWorkLabel}
            </a>
            <a
              href={copy.hero.downloadCvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-outline text-on-surface-variant font-mono text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
            >
              <FileDown size={14} />
              {copy.hero.downloadCvLabel}
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-4">
            {socials.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Interactive Shell */}
          <div className="mt-12">
            <HomeShell />
          </div>
        </motion.div>
      </div>
    </>
  );
}
