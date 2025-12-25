/**
 * ============================================
 * STATUS PAGES SITEMAP
 * ============================================
 */

import { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

export default function sitemapStatus(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const currentDate = new Date().toISOString();

  const statusPages = [
    "is-omegle-down-right-now",
    "is-ometv-down-right-now",
  ];

  return statusPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));
}

