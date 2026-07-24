import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-default py-12">
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-default bg-card p-2.5 text-muted transition hover:text-accent"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Link
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-default bg-card p-2.5 text-muted transition hover:text-accent"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-full border border-default bg-card p-2.5 text-muted transition hover:text-accent"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
