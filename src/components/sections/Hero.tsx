"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      2600
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-16"
    >
      {/* Animated background: dotted grid + slow-drifting accent glow. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0 animate-grid-pan" />
        <motion.div
          className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-default bg-card px-4 py-1.5 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Available for new projects
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            {profile.name}
          </h1>
	  <p className="mt-3 text-sm font-medium text-muted">
            Design &amp; client partner: Sehrish Nusrat
          </p>

          <div className="mt-4 flex h-10 items-center text-2xl font-medium sm:text-3xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="text-accent"
              >
                {profile.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="mt-6 max-w-xl text-lg text-muted">{profile.tagline}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#projects" className="btn-primary">
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={profile.resumeUrl}
              download
              className="btn-secondary"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <Link href="#contact" className="btn-secondary">
              <Mail className="h-4 w-4" /> Contact Me
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
