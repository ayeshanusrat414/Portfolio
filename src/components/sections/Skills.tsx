"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal, scaleIn } from "@/components/ui/motion";
import { skillCategories } from "@/lib/content";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I reach for"
      description="A categorized view of the technologies I use day to day."
      className="bg-subtle"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category) => (
          <Reveal key={category.name} variants={scaleIn}>
            <div className="h-full rounded-2xl border border-default bg-card p-6">
              <h3 className="mb-6 font-display text-lg font-semibold">
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-subtle">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
