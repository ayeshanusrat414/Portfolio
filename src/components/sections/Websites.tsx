"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Monitor } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { websites } from "@/lib/content";

/** A live, scaled-down render of the actual site as a card thumbnail. */
function LivePreview({ file }: { file: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <iframe
        src={file}
        title="preview"
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        className="origin-top-left"
        style={{
          width: "1280px",
          height: "1600px",
          transform: "scale(0.3125)", // 400px card width / 1280
        }}
      />
    </div>
  );
}

export function Websites() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(websites.map((w) => w.category)))],
    []
  );
  const [category, setCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => websites.filter((w) => category === "All" || w.category === category),
    [category]
  );

  return (
    <Section
      id="websites"
      eyebrow="Web Design"
      title="Website design showcase"
      description="Nine full landing pages, rendered live. Hover to explore, or open any one full-screen."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              category === c
                ? "bg-accent text-white"
                : "border border-default bg-card text-muted hover:text-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((site, i) => (
          <motion.div
            key={site.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
            className="group overflow-hidden rounded-2xl border border-default bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10"
          >
            <button
              onClick={() => setOpenIndex(websites.indexOf(site))}
              className="relative block aspect-[4/3] w-full overflow-hidden border-b border-default bg-white"
              aria-label={`Open ${site.title} full screen`}
            >
              <LivePreview file={site.file} />
              <span
                className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/40"
                style={{ backdropFilter: "saturate(1.1)" }}
              >
                <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black opacity-0 transition group-hover:opacity-100">
                  <Monitor className="h-4 w-4" /> View full screen
                </span>
              </span>
            </button>

            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-semibold">
                  {site.title}
                </h3>
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-medium text-white"
                  style={{ backgroundColor: site.accent }}
                >
                  {site.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{site.description}</p>
              <a
                href={site.file}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-accent"
              >
                <ExternalLink className="h-4 w-4" /> Open in new tab
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-screen live viewer */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <span className="font-display font-semibold">
                  {websites[openIndex].title}
                </span>
                <a
                  href={websites[openIndex].file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" /> New tab
                </a>
              </div>
              <button
                onClick={() => setOpenIndex(null)}
                className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <iframe
              src={websites[openIndex].file}
              title={websites[openIndex].title}
              className="w-full flex-1 bg-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
