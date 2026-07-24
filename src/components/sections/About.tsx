import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup, scaleIn } from "@/components/ui/motion";
import { profile } from "@/lib/content";
import { Briefcase, Code2, Brain, Server, Palette } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Briefcase,
    title: "5+ Years Experience",
    body: "Shipping production web and AI software across startups and enterprise.",
  },
  {
    icon: Server,
    title: ".NET & Databases",
    body: "ASP.NET Core, ASP.NET MVC, SQL Server and PostgreSQL at scale.",
  },
  {
    icon: Code2,
    title: "Full Stack",
    body: "Angular, React and Next.js front ends wired to robust Web APIs.",
  },
  {
    icon: Brain,
    title: "AI & LLMs",
    body: "Python, ML, LLM tool-calling research and AI-assisted product features.",
  },
  {
    icon: Palette,
    title: "Design",
    body: "Book covers, branding, posters, packaging and full website concepts.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineering across the stack — and into AI"
      description={profile.intro}
    >
      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
          <Reveal key={title} variants={scaleIn}>
            <div className="group h-full rounded-2xl border border-default bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
              <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </div>
          </Reveal>
        ))}
      </StaggerGroup>
    </Section>
  );
}
