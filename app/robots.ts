/**
 * ============================================
 * POMEGLE ROBOTS.TXT GENERATOR
 * ============================================
 * 
 * SEO Purpose: Control search engine crawling.
 * Next.js automatically serves this at /robots.txt
 */

import { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",           // Don't crawl API routes
          "/room",           // Don't index the chat room itself
          "/_next/",         // Don't crawl Next.js internals
          "/private/",       // Any private pages
        ],
      },
      {
        // Specific rules for Googlebot
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/room", "/_next/"],
      },
      {
        // Block aggressive bots
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: `${BRAND.url}/sitemap.xml`,
    host: BRAND.url,
  };
}

