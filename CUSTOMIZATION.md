# Customization Guide

Everything visible on the site is driven by JSON in `content/`. In most cases you'll never touch component code. Restart `npm run dev` after editing JSON if changes don't hot-reload.

## 1. Your identity — `content/profile.json`

```jsonc
{
  "name": "Your Name",
  "roles": ["Software Engineer", "AI Engineer", "Full Stack Developer"], // rotate in hero
  "tagline": "One-line pitch shown in the hero.",
  "intro": "Longer paragraph shown in the About section.",
  "location": "Remote / Worldwide",
  "email": "you@example.com",
  "resumeUrl": "/resume.pdf",
  "avatar": "/profile/avatar.jpg",
  "social": { "github": "...", "linkedin": "..." },
  "seo": {
    "siteUrl": "https://your-domain.com",   // ← set before deploying
    "title": "...", "description": "...", "keywords": ["..."],
    "ogImage": "/profile/og.jpg", "twitterHandle": "@you"
  }
}
```

The **GitHub URL, LinkedIn URL, email, and resume PDF** placeholders all live here.

## 2. Add a project (no code changes)

Append an object to `items` in `content/projects.json`:

```jsonc
{
  "slug": "my-new-project",          // becomes /projects/my-new-project
  "title": "My New Project",
  "category": "AI",                   // "Web Development" | "AI" | "Full Stack" | "Research"
  "description": "One-line summary.",
  "thumbnail": "/projects/my-new-project/thumbnail.jpg",
  "technologies": ["Next.js", "FastAPI"],
  "github": "https://github.com/...",
  "demo": "https://...",             // leave "" to hide the Live button
  "featured": true,
  "images": ["/projects/my-new-project/1.jpg"],
  "details": {
    "overview": "A paragraph for the detail page.",
    "highlights": ["Point one.", "Point two."]
  }
}
```

The card, filtering, search, sitemap entry, and a statically-generated detail page are all created automatically.

## 3. Other sections

| Section | File | Notes |
| --- | --- | --- |
| Skills | `content/skills.json` | `level` is 0–100 for the progress bar |
| Experience | `content/experience.json` | timeline order = array order |
| Graphic Design | `content/designs.json` | `category` must match a filter; images go in `public/graphics/` |
| Website Showcase | `content/websites.json` | `file` points to an `.html` in `public/sites/`; rendered live |
| Research | `content/research.json` | `status: "Published"` shows a green badge |
| Education | `content/education.json` | degree / institution / duration / detail |
| Achievements | `content/certifications.json` | grid of cards |

To change the **filter categories** for graphics/banners/projects, edit the `CATEGORIES`/`FILTERS` arrays at the top of the matching file in `src/components/sections/`.

## 4. Images

Drop files into the `public/` subfolders using the paths in your JSON:

```
public/projects/   public/profile/   public/logos/
public/graphics/    (your design images — already loaded)
public/sites/       (your website .html files — already loaded)
public/resume.pdf   (your CV — already included)
```

To add a website: drop an `.html` file in `public/sites/` and add an entry to `content/websites.json` with its `file` path. It renders live automatically.

Until an image exists, a styled gradient placeholder (with the item's title) shows automatically. Remote URLs also work — `next.config.mjs` allows `https://` hosts.

## 5. Colors & theme — `tailwind.config.ts` + `globals.css`

- **Accent color**: change `accent.DEFAULT` (`#3B82F6`) in `tailwind.config.ts`. Also update the `--outline` accent in `globals.css` `:focus-visible` and the hero glow if you want them to match.
- **Light/dark tokens**: edit the `:root` (light) and `.dark` (dark) CSS variables in `src/app/globals.css` — `--background`, `--foreground`, `--muted`, `--card`, `--border`, `--subtle` (space-separated RGB values).

## 6. Fonts — `src/app/layout.tsx`

Body uses **Inter**, headings use **Sora**, loaded via `next/font/google`. Swap either by importing a different family:

```ts
import { Inter, Space_Grotesk } from "next/font/google";
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
```

## 7. Navigation

Edit `NAV_LINKS` at the top of `src/components/Navbar.tsx` to change which sections appear in the navbar. Each `id` must match a section's `id`.

## 8. Reordering / removing sections

Edit `src/app/page.tsx` — reorder or delete the section components. Remove the matching nav link too.

## 9. Animations

Reusable variants live in `src/components/ui/motion.tsx` (`fadeUp`, `fadeIn`, `scaleIn`, `staggerContainer`). Adjust durations/offsets there to tune the feel globally. All animations respect `prefers-reduced-motion`.
