"use client";

import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import copy from "@/copy.json";

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

export default function Footer() {
  return (
    <footer className="py-12 border-t border-dark-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {copy.footer.socials.map((s) => {
              const Icon = iconMap[s.platform];
              return (
                <a
                  key={s.platform}
                  href={s.href}
                  target={s.platform === "email" ? undefined : "_blank"}
                  rel={s.platform === "email" ? undefined : "noopener noreferrer"}
                  className="text-dark-500 hover:text-primary-400 transition-colors"
                  aria-label={s.label}
                >
                  {Icon && <Icon size={18} />}
                </a>
              );
            })}
          </div>

          <p className="text-dark-500 text-sm font-mono">
            &copy; {new Date().getFullYear()} {copy.footer.copyright}
          </p>

          <p className="text-dark-600 text-xs">
            {copy.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
