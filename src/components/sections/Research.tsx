import { Section } from "@/components/ui/Section";
import { Reveal, scaleIn } from "@/components/ui/motion";
import { research } from "@/lib/content";
import { FileText, Sparkles } from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  const done = status.toLowerCase() === "published";
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        done
          ? "bg-green-500/10 text-green-600 dark:text-green-400"
          : "bg-accent/10 text-accent"
      }`}
    >
      {status}
    </span>
  );
}

export function Research() {
  return (
    <Section
      id="research"
      eyebrow="Research"
      title="Research & experiments"
      description="Studies and experiments exploring AI systems and engineering practice."
      className="bg-subtle"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {research.map((item) => (
          <Reveal key={item.title} variants={scaleIn}>
            <div className="flex h-full flex-col rounded-2xl border border-default bg-card p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <h3 className="font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <StatusBadge status={item.status} />
              </div>

              <p className="text-sm text-muted">{item.abstract}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-subtle px-2.5 py-1 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto space-y-3 border-t border-default pt-4">
                <div className="flex items-start gap-2 text-sm">
                  <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <span className="text-muted">
                    {item.publications.join(", ")}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <span className="text-muted">{item.futureWork}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
