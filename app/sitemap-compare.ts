/**
 * ============================================
 * COMPARISON PAGES SITEMAP
 * ============================================
 */

import { MetadataRoute } from "next";
import { BRAND, COMPETITORS } from "@/lib/seo";

export default function sitemapCompare(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const currentDate = new Date().toISOString();

  return [
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...(Object.values(COMPETITORS) as Array<{ slug: string }>).map((competitor) => ({
      url: `${baseUrl}/compare/${competitor.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    {
      url: `${baseUrl}/compare/pomegle-vs-ometv-vs-chatroulette`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/pomegle-vs-chathub-vs-chatspin`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/compare/pomegle-vs-shagle-vs-camsurf`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/compare/pomegle-vs-monkey-vs-chatroulette`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    },
  ];
}

