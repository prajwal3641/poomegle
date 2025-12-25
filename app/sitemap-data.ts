/**
 * ============================================
 * DATA/STATISTICS PAGES SITEMAP
 * ============================================
 */

import { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

export default function sitemapData(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const currentDate = new Date().toISOString();

  const dataPages = [
    "random-chat-statistics-2025",
    "omegle-usage-by-country",
    "average-chat-session-length",
  ];

  return dataPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
}

