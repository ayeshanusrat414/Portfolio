import type { ReactNode } from "react";
import { Reveal } from "./motion";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className ?? ""}`}>
      <div className="container-page">
        <Reveal className="max-w-2xl">
          {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
          <h2 className="section-title">{title}</h2>
          {description && (
            <p className="mt-4 text-lg text-muted">{description}</p>
          )}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
