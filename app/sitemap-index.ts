/**
 * ============================================
 * SITEMAP INDEX
 * ============================================
 * 
 * Main sitemap index that references category-specific sitemaps.
 * This helps bots categorize and crawl faster.
 */

import { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

export default function sitemapIndex(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const currentDate = new Date().toISOString();

  return [
    {
      url: `${baseUrl}/sitemap-core.xml`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sitemap-blog.xml`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sitemap-compare.xml`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sitemap-topics.xml`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap-help.xml`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/sitemap-landing.xml`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sitemap-data.xml`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap-glossary.xml`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/sitemap-status.xml`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 0.8,
    },
  ];
}

