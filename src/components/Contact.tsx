"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Github, Linkedin, Send } from "lucide-react";
import copy from "@/copy.json";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="section-subheading font-mono">
            <span className="text-primary-400">{copy.contact.sectionNumber}.</span> {copy.contact.sectionLabel}
          </p>
          <h2 className="section-heading mb-4">{copy.contact.heading}</h2>
          <p className="text-dark-400 mb-12">
            {copy.contact.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <div className="glass-card p-8">
            <form
              action={copy.contact.form.action}
              method="POST"
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-dark-300 mb-2"
                >
                  {copy.contact.form.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder={copy.contact.form.namePlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-dark-300 mb-2"
                >
                  {copy.contact.form.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="_replyto"
                  required
                  maxLength={254}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder={copy.contact.form.emailPlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-dark-300 mb-2"
                >
                  {copy.contact.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={2000}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder={copy.contact.form.messagePlaceholder}
                />
              </div>

              <input
                type="hidden"
                name="_subject"
                value={copy.contact.form.subject}
              />

              {/* Honeypot — hidden from real users, catches bots */}
              <input
                type="text"
                name="_gotcha"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-500 transition-colors"
              >
                <Send size={16} />
                {copy.contact.form.submitLabel}
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <a
              href={`mailto:${copy.contact.email}`}
              className="flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors"
            >
              <Mail size={16} />
              {copy.contact.email}
            </a>
            <span className="flex items-center gap-2 text-dark-400">
              <MapPin size={16} />
              {copy.contact.location}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
