/**
 * ============================================
 * GLOSSARY/DEFINITION PAGES SITEMAP
 * ============================================
 */

import { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

export default function sitemapGlossary(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const currentDate = new Date().toISOString();

  const glossaryPages = [
    "what-is-random-video-chat",
    "what-is-omegle-alternative",
  ];

  return glossaryPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
}

