import { Section } from "@/components/ui/Section";
import { Reveal, scaleIn } from "@/components/ui/motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { certifications } from "@/lib/content";

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Achievements"
      title="Achievements & recognition"
      description="Competitions, incubation and recognition along the way."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert) => (
          <Reveal key={cert.title} variants={scaleIn}>
            <div className="group h-full overflow-hidden rounded-2xl border border-default bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5">
              <div className="relative aspect-[4/3] overflow-hidden bg-subtle">
                <SmartImage
                  src={cert.image}
                  alt={cert.title}
                  label={cert.organization}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-sm font-semibold leading-snug">
                  {cert.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{cert.organization}</p>
                <p className="mt-1 text-xs text-muted">{cert.year}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
