import type { MetadataRoute } from "next";
import { profile, getAllProjectSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.seo.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map(
    (slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...projectRoutes];
}
