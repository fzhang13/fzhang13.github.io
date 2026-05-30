'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import copy from '@/copy.json';
import BootSequence from '@/components/shared/BootSequence';
import HomeShell from '@/components/HomeShell';
import styles from './HomePage.module.scss';

const socials = [
  { icon: Github, ...copy.hero.socials[0] },
  { icon: Linkedin, ...copy.hero.socials[1] },
  { icon: Mail, ...copy.hero.socials[2] },
];

export default function HomePage() {
  return (
    <>
      <BootSequence />

      <div className={styles.hero}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {/* Terminal prompt */}
          <div className={styles.prompt}>
            <span className={styles.accent}>$</span>{' '}
            {copy.hero.prompt.replace('$ ', '')}
          </div>

          {/* Name */}
          <h1 className={`${styles.name} phosphor-glow`}>
            {copy.hero.firstName}
            <br />
            {copy.hero.lastName}
          </h1>

          {/* Role */}
          <div className={styles.role}>{copy.hero.subtitle}</div>

          {/* Subtitle parts */}
          <div className={styles.subtitle}>
            {copy.hero.subtitleParts.map((part, i) => (
              <span key={i} className={styles.subtitlePart}>
                <span className={styles.accent}>&gt;</span> {part}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className={styles.ctaRow}>
            <a
              href={copy.hero.viewWorkHref.replace('#about', '/about')}
              className={`${styles.btnBase} ${styles.btnPrimary}`}
            >
              {copy.hero.viewWorkLabel}
            </a>
            <a
              href={copy.hero.downloadCvHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btnBase} ${styles.btnSecondary}`}
            >
              <FileDown size={14} />
              {copy.hero.downloadCvLabel}
            </a>
          </div>

          {/* Social links */}
          <div className={styles.socials}>
            {socials.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Interactive Shell */}
          <div className={styles.shell}>
            <HomeShell />
          </div>
        </motion.div>
      </div>
    </>
  );
}
