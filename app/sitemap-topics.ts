/**
 * ============================================
 * TOPIC PAGES SITEMAP
 * ============================================
 */

import { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

export default function sitemapTopics(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const currentDate = new Date().toISOString();

  const topicPages = [
    "how-to-use-pomegle",
    "is-pomegle-free",
    "why-did-omegle-shut-down",
    "how-to-filter-adult-content",
    "how-does-pomegle-work",
    "chatroulette-without-signup",
    "how-to-get-more-matches",
    "how-to-block-users",
    "why-pomegle-is-safe",
    "vpn-chat-sites",
    "next-best-chat-app",
    "how-to-unban-pomegle",
    "non-adult-chat-rooms",
    "avoid-boredom-random-chat",
  ];

  return topicPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}

