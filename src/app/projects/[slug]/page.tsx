import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  profile,
} from "@/lib/content";
import { SmartImage } from "@/components/ui/SmartImage";

// Statically render every project page at build time.
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.thumbnail || profile.seo.ogImage }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="pt-28 pb-20">
      <div className="container-page max-w-4xl">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>

        <p className="section-eyebrow">{project.category}</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github className="h-4 w-4" /> View Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
        </div>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-default">
          <SmartImage
            src={project.thumbnail}
            alt={project.title}
            label={project.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-display text-xl font-semibold">Overview</h2>
            <p className="mt-3 text-muted">{project.details.overview}</p>

            <h2 className="mt-8 font-display text-xl font-semibold">
              Highlights
            </h2>
            <ul className="mt-3 space-y-2">
              {project.details.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-muted">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <aside>
            <h2 className="font-display text-xl font-semibold">Tech Stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-subtle px-3 py-1 text-sm text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {project.images.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {project.images.map((img, i) => (
              <div
                key={img}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-default"
              >
                <SmartImage
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  label={`Screenshot ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
