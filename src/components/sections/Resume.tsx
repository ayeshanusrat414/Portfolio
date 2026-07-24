import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/motion";
import { profile } from "@/lib/content";
import { Download, FileText } from "lucide-react";

export function Resume() {
  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title="My resume"
      description="Preview or download a copy for offline reading."
      className="bg-subtle"
    >
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-default bg-card">
          <div className="flex flex-col items-center justify-between gap-4 border-b border-default p-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-semibold">
                  {profile.name} — Resume
                </p>
                <p className="text-sm text-muted">PDF · Updated regularly</p>
              </div>
            </div>
            <a href={profile.resumeUrl} download className="btn-primary">
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>

          {/* Inline PDF preview. Drop your resume at public/resume.pdf. */}
          <object
            data={profile.resumeUrl}
            type="application/pdf"
            className="h-[70vh] w-full bg-subtle"
            aria-label="Resume preview"
          >
            <div className="flex h-64 flex-col items-center justify-center gap-3 text-center text-muted">
              <FileText className="h-8 w-8" />
              <p className="text-sm">
                Preview unavailable. Add your file at{" "}
                <code className="rounded bg-subtle px-1.5 py-0.5">
                  public/resume.pdf
                </code>{" "}
                or use the download button above.
              </p>
            </div>
          </object>
        </div>
      </Reveal>
    </Section>
  );
}
