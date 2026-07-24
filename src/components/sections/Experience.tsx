import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/motion";
import { experiences } from "@/lib/content";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked"
      description="A timeline of the roles that shaped how I build."
    >
      <div className="relative ml-3 border-l border-default pl-8">
        {experiences.map((exp, i) => (
          <Reveal key={`${exp.company}-${i}`}>
            <div className="relative pb-12 last:pb-0">
              {/* Timeline node */}
              <span className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-[rgb(var(--background))]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              <div className="rounded-2xl border border-default bg-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-muted">{exp.duration}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">
                  {exp.company}
                </p>

                <ul className="mt-4 space-y-2">
                  {exp.responsibilities.map((r) => (
                    <li
                      key={r}
                      className="flex gap-2 text-sm text-muted"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-subtle px-3 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
