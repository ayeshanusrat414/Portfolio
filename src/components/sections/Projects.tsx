"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { projects } from "@/lib/content";

const FILTERS = ["All", "Web Development", "AI", "Full Stack", "Research"] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === "All" || p.category === filter;
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="Filter by category or search by technology. Each project has its own detail page."
      className="bg-subtle"
    >
      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                filter === f
                  ? "bg-accent text-white"
                  : "border border-default bg-card text-muted hover:text-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            aria-label="Search projects"
            className="w-full rounded-full border border-default bg-card py-2 pl-9 pr-4 text-sm outline-none transition focus:border-accent"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted">
          No projects match your search. Try a different term.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <motion.article
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-default bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={project.thumbnail}
                    alt={project.title}
                    label={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
                    {project.category}
                  </span>
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-5">
                <Link href={`/projects/${project.slug}`}>
                  <h3 className="flex items-center gap-1 font-display text-lg font-semibold transition group-hover:text-accent">
                    {project.title}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                  </h3>
                </Link>
                <p className="mt-2 flex-1 text-sm text-muted">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-subtle px-2.5 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-4 border-t border-default pt-4 text-sm">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted transition hover:text-accent"
                    >
                      <Github className="h-4 w-4" /> Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted transition hover:text-accent"
                    >
                      <ExternalLink className="h-4 w-4" /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </Section>
  );
}
