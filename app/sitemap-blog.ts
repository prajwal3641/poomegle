/**
 * ============================================
 * BLOG SITEMAP
 * ============================================
 * 
 * Sitemap specifically for blog posts
 */

import { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

export default function sitemapBlog(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const posts = getAllPosts();

  return [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

