"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { Lightbox } from "@/components/ui/Lightbox";
import { designs } from "@/lib/content";

const CATEGORIES = [
  "All",
  "Book Covers",
  "Branding",
  "Posters",
  "Packaging",
  "Editorial",
  "Social Media",
];

export function Graphics() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered = useMemo(
    () => designs.filter((d) => category === "All" || d.category === category),
    [category]
  );

  const lightboxItems = filtered.map((d) => ({ src: d.image, title: d.title }));

  return (
    <Section
      id="graphics"
      eyebrow="Graphic Design"
      title="Design portfolio"
      description="Book covers, branding, posters, packaging and social campaigns. Click any piece to preview."
      className="bg-subtle"
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
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

      {/* True masonry via CSS columns — preserves each piece's aspect ratio. */}
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {filtered.map((design, i) => (
          <motion.button
            key={design.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
            onClick={() => setActive(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl border border-default bg-card"
            aria-label={`Preview ${design.title}`}
          >
            <SmartImage
              src={design.image}
              alt={design.title}
              label={design.title}
              width={800}
              height={1100}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  {design.title}
                </p>
                <p className="text-xs text-white/70">{design.category}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        items={lightboxItems}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </Section>
  );
}
