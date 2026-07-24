# Premium Personal Portfolio

A production-ready, content-driven personal portfolio built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Minimal, Apple-inspired design with dark/light mode, full SEO, and a JSON content system so you can update everything without touching code.

## Features

- **Next.js 15 App Router** with static rendering and SSG project pages
- **TypeScript** throughout, strict mode
- **Tailwind CSS** with an Apple-inspired token system (white / black / gray + blue `#3B82F6`)
- **Framer Motion** animations: fade, slide-up, scale, hover, scroll reveals, page transitions
- **Dark / light mode** via `next-themes` (respects system preference)
- **JSON content system** — add a project/design/etc. by editing one file, no code changes
- **Dynamic project detail pages** generated from `content/projects.json`
- **SEO**: metadata, Open Graph, Twitter cards, JSON-LD structured data, `sitemap.xml`, `robots.txt`, canonical URLs, SVG favicon
- **Accessibility**: semantic HTML, ARIA labels, keyboard navigation, visible focus, reduced-motion support
- **Performance**: `next/image`, lazy loading, code splitting, static generation
- **Contact form** with EmailJS (graceful `mailto:` fallback when unconfigured)
- Zero unnecessary dependencies

## Sections

Hero · About · Skills · Experience · Projects · Graphic Design · Website Showcase · Research · Education · Achievements · Resume · Contact · Footer

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Requires Node.js 18.18+ (Node 20+ recommended).

## Project structure

```
├── content/                 # ← All your data lives here (JSON)
│   ├── profile.json         # name, roles, links, SEO
│   ├── skills.json
│   ├── experience.json
│   ├── projects.json        # drives project cards + detail pages
│   ├── designs.json          # graphic design gallery
│   ├── websites.json         # live website showcase
│   ├── research.json
│   ├── education.json
│   └── certifications.json    # "Achievements" section
├── public/                  # ← Drop your images here
│   ├── projects/  profile/  logos/
│   ├── graphics/             # your design images
│   └── sites/                # your website .html files
│   └── resume.pdf           # add your resume
├── src/
│   ├── app/
│   │   ├── layout.tsx        # fonts, SEO metadata, JSON-LD, theme
│   │   ├── page.tsx          # composes all sections
│   │   ├── globals.css       # theme tokens + utilities
│   │   ├── icon.svg          # favicon (auto-detected)
│   │   ├── robots.ts  sitemap.ts
│   │   └── projects/[slug]/page.tsx   # dynamic project pages
│   ├── components/
│   │   ├── Navbar.tsx  Footer.tsx  ThemeProvider.tsx
│   │   ├── sections/         # one file per section
│   │   └── ui/               # Section, SmartImage, Lightbox, motion
│   └── lib/
│       ├── content.ts        # typed loaders for the JSON
│       └── types.ts
├── .env.example              # EmailJS keys
└── tailwind.config.ts
```

See `CUSTOMIZATION.md` to make it yours and `DEPLOYMENT.md` to ship it.

## Images

The site works immediately with elegant gradient placeholders. When you add real images to the folders in `public/` using the paths referenced in the `content/*.json` files, they load automatically — no code changes needed.

## License

Free to use for your personal portfolio.
