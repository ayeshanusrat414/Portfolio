import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/motion";
import { education } from "@/lib/content";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Academic background"
      description="From matriculation to a Master's in Artificial Intelligence."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((edu) => (
          <Reveal key={edu.degree}>
            <div className="flex h-full gap-4 rounded-2xl border border-default bg-card p-6">
              <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">
                    {edu.degree}
                  </h3>
                </div>
                <p className="mt-0.5 text-sm font-medium text-accent">
                  {edu.institution}
                </p>
                <p className="mt-1 text-xs text-muted">{edu.duration}</p>
                <p className="mt-2 text-sm text-muted">{edu.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
