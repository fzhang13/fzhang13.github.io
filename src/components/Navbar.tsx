"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import copy from "@/copy.json";

const navItems = copy.nav.items;

interface NavbarProps {
  revealed: boolean;
}

export default function Navbar({ revealed }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Update indicator position when active section changes
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector<HTMLAnchorElement>(
      `a[href="#${activeSection}"]`
    );
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-950/80 backdrop-blur-xl border-b border-dark-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl font-bold text-white hover:text-primary-400 transition-colors font-mono"
        >
          {copy.nav.brand.split(".")[0]}<span className="text-primary-400">.</span>{copy.nav.brand.split(".")[1]}
        </a>

        {/* Desktop nav */}
        <ul ref={navRef} className={`hidden md:flex items-center gap-8 relative transition-all duration-700 ${revealed ? 'blur-0 opacity-100' : 'blur-md opacity-40 pointer-events-none'}`}>
          {/* Sliding indicator */}
          <motion.div
            className="absolute -bottom-1 h-0.5 bg-primary-400 rounded-full"
            animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-400 ${
                  activeSection === item.href.slice(1)
                    ? "text-primary-400"
                    : "text-dark-300"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={copy.nav.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-4 py-2 rounded-lg border border-primary-500 text-primary-400 hover:bg-primary-500/10 transition-all"
            >
              {copy.nav.resumeLabel}
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden text-white p-2 transition-all duration-700 ${revealed ? 'blur-0 opacity-100' : 'blur-md opacity-40 pointer-events-none'}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-950/95 backdrop-blur-xl border-b border-dark-800/50"
          >
            <ul className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm font-medium transition-colors ${
                      activeSection === item.href.slice(1)
                        ? "text-primary-400"
                        : "text-dark-300"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={copy.nav.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium px-4 py-2 rounded-lg border border-primary-500 text-primary-400"
                >
                  {copy.nav.resumeLabel}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
