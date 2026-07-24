# Deployment Guide

This portfolio is optimized for **Vercel** but runs anywhere that supports Node.js.

## Prerequisites

- Node.js 18.18+ (Node 20+ recommended)
- A GitHub account (for the Vercel workflow)

## Deploy to Vercel (recommended)

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Import into Vercel**
   - Go to https://vercel.com/new
   - Select your repository. Vercel auto-detects Next.js — no configuration needed.
   - Framework preset: **Next.js** · Build command: `next build` · Output: automatic.

3. **Add environment variables** (only needed for the contact form)

   In **Project Settings → Environment Variables**, add:

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | your EmailJS service id |
   | `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | your EmailJS template id |
   | `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | your EmailJS public key |

   Without these, the form gracefully opens the visitor's mail client instead.

4. **Deploy.** Every push to `main` redeploys automatically.

## Set your production URL

Edit `content/profile.json` → `seo.siteUrl` to your live domain (e.g. `https://your-domain.com`). This is used for canonical URLs, `sitemap.xml`, Open Graph, and JSON-LD. Redeploy after changing it.

## Custom domain

In Vercel: **Project → Settings → Domains → Add**, then point your DNS as instructed. HTTPS is automatic.

## Deploy elsewhere

Any Node host works:

```bash
npm install
npm run build
npm start        # serves on PORT (default 3000)
```

For Netlify, use the official Next.js adapter. For a Docker/VPS setup, run `npm run build && npm start` behind a reverse proxy (nginx/Caddy).

## EmailJS setup (contact form)

1. Create a free account at https://www.emailjs.com
2. Add an email **service** (Gmail, Outlook, etc.) → copy the **Service ID**
3. Create a **template** with variables `from_name`, `from_email`, `subject`, `message` → copy the **Template ID**
4. Copy your **Public Key** from Account → API Keys
5. Put all three into `.env.local` (local) and Vercel env vars (production)

```bash
cp .env.example .env.local
# then fill in the three values
```

## Pre-deploy checklist

- [ ] Updated `content/profile.json` (name, email, social, `seo.siteUrl`)
- [ ] Replaced content JSON with your real projects/experience/etc.
- [ ] Added images to `public/*` folders
- [ ] Added `public/resume.pdf`
- [ ] `npm run build` passes locally
- [ ] EmailJS env vars set (if using the form)

## Lighthouse

Run against the production build (`npm run build && npm start`), not the dev server, for accurate scores. The template ships with static rendering, optimized images, and lazy loading for strong Performance/SEO/Accessibility/Best-Practices results.
