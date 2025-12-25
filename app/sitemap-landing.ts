/**
 * ============================================
 * LANDING PAGES SITEMAP
 * ============================================
 */

import { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

export default function sitemapLanding(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const currentDate = new Date().toISOString();

  const landingPages = [
    { slug: "omegle-alternative", priority: 0.95 },
    { slug: "random-video-chat", priority: 0.9 },
    { slug: "talk-to-strangers", priority: 0.9 },
    { slug: "anonymous-chat-strangers", priority: 0.9 },
    { slug: "anonymous-chat-app", priority: 0.85 },
    { slug: "mobile-video-chat-app", priority: 0.85 },
    { slug: "best-omegle-alternatives", priority: 0.9 },
  ];

  return landingPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: page.priority,
  }));
}

