/**
 * ============================================
 * CORE PAGES SITEMAP
 * ============================================
 */

import { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

export default function sitemapCore(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const currentDate = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/room`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guidelines`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}

