/**
 * ============================================
 * POMEGLE MAIN SITEMAP
 * ============================================
 * 
 * Main sitemap that combines all category sitemaps.
 * Also serves as fallback - includes all pages.
 * 
 * For better organization, use the category-specific sitemaps:
 * - /sitemap-index.xml (references all category sitemaps)
 * - /sitemap-blog.xml
 * - /sitemap-compare.xml
 * - /sitemap-topics.xml
 * - etc.
 */

import { MetadataRoute } from "next";
import { BRAND, COMPETITORS, BLOG_CATEGORIES } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

// Get blog posts with their dates for accurate lastModified
const BLOG_POSTS_WITH_DATES = getAllPosts();

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const currentDate = new Date().toISOString();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
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

  // SEO Landing pages
  const seoPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/omegle-alternative`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/random-video-chat`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/talk-to-strangers`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/anonymous-chat-strangers`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/anonymous-chat-app`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mobile-video-chat-app`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-omegle-alternatives`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...BLOG_POSTS_WITH_DATES.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  // Blog category pages
  const categoryPages: MetadataRoute.Sitemap = (Object.values(BLOG_CATEGORIES) as Array<{ slug: string }>).map(
    (category) => ({
      url: `${baseUrl}/blog/category/${category.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })
  );

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = [
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

  // Long-tail topic pages
  const topicPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/how-to-use-pomegle`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/is-pomegle-free`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/why-did-omegle-shut-down`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/how-to-filter-adult-content`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-does-pomegle-work`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/chatroulette-without-signup`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-to-get-more-matches`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-to-block-users`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/why-pomegle-is-safe`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vpn-chat-sites`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/next-best-chat-app`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/how-to-unban-pomegle`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/non-adult-chat-rooms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/avoid-boredom-random-chat`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Help/FAQ pages
  const helpPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/help`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help/connection-issues`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/not-loading`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/webcam-fix`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/stay-safe`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help/data-privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/help/report-user`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/anonymous-chatroulette`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/bots-protection`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/legal-random-video-chat`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/public-wifi`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/pomegle-location`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help/chatroulette-filters`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [
    ...corePages,
    ...seoPages,
    ...blogPages,
    ...categoryPages,
    ...comparisonPages,
    ...topicPages,
    ...helpPages,
  ];
}

