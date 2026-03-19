"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-dark-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/fzhang13"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/f-zhang/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:felix.zhang.dev@gmail.com"
              className="text-dark-500 hover:text-primary-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <p className="text-dark-500 text-sm font-mono">
            &copy; {new Date().getFullYear()} Felix Zhang
          </p>

          <p className="text-dark-600 text-xs">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
