/**
 * ============================================
 * HELP PAGES SITEMAP
 * ============================================
 */

import { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

export default function sitemapHelp(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const currentDate = new Date().toISOString();

  const helpPages = [
    "help",
    "help/connection-issues",
    "help/not-loading",
    "help/webcam-fix",
    "help/stay-safe",
    "help/data-privacy",
    "help/report-user",
    "help/anonymous-chatroulette",
    "help/bots-protection",
    "help/legal-random-video-chat",
    "help/public-wifi",
    "help/pomegle-location",
    "help/chatroulette-filters",
  ];

  return helpPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
}

