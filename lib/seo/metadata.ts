/**
 * ============================================
 * POMEGLE SEO METADATA HELPERS
 * ============================================
 * 
 * Helper functions to generate consistent metadata across pages.
 * Import these in your page.tsx files to maintain SEO consistency.
 */

import type { Metadata } from "next";
import { 
  BRAND, 
  OG_DEFAULTS, 
  TWITTER_DEFAULTS,
  ALL_KEYWORDS,
  SEO_KEYWORDS,
  META_DESCRIPTIONS,
} from "./config";

// ============================================
// BASE METADATA GENERATOR
// ============================================

interface GenerateMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
}

/**
 * Generates complete metadata for a page
 * Use this in your page.tsx exports
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [...ALL_KEYWORDS],
  path = "",
  noIndex = false,
  ogImage,
}: GenerateMetadataOptions): Metadata {
  const url = `${BRAND.url}${path}`;
  
  return {
    title,
    description,
    keywords,
    authors: [{ name: BRAND.name }],
    creator: BRAND.name,
    publisher: BRAND.name,
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      ...OG_DEFAULTS,
      title,
      description,
      url,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : [...OG_DEFAULTS.images],
    },
    twitter: {
      ...TWITTER_DEFAULTS,
      title,
      description,
      images: ogImage ? [ogImage] : [...TWITTER_DEFAULTS.images],
    },
    alternates: {
      canonical: url,
    },
  };
}

// ============================================
// PRE-CONFIGURED PAGE METADATA
// ============================================

/**
 * Home page metadata
 */
export const homeMetadata: Metadata = generatePageMetadata({
  title: `${BRAND.name} - Best Omegle Alternative | Free Random Video Chat with Strangers`,
  description: META_DESCRIPTIONS.home,
  keywords: [...ALL_KEYWORDS],
  path: "",
});

/**
 * Omegle Alternative page metadata
 */
export const omegleAlternativeMetadata: Metadata = generatePageMetadata({
  title: `Best Omegle Alternative 2025 | ${BRAND.name} - Free Video Chat`,
  description: META_DESCRIPTIONS.omegleAlternative,
  keywords: [...SEO_KEYWORDS.omegleAlternative, ...SEO_KEYWORDS.primary],
  path: "/omegle-alternative",
});

/**
 * Random Video Chat page metadata
 */
export const randomVideoChatMetadata: Metadata = generatePageMetadata({
  title: `Free Random Video Chat with Strangers | ${BRAND.name}`,
  description: META_DESCRIPTIONS.randomVideoChat,
  keywords: [...SEO_KEYWORDS.randomVideoChat, ...SEO_KEYWORDS.primary],
  path: "/random-video-chat",
});

/**
 * Talk to Strangers page metadata
 */
export const talkToStrangersMetadata: Metadata = generatePageMetadata({
  title: `Talk to Strangers - Free Anonymous Video Chat | ${BRAND.name}`,
  description: META_DESCRIPTIONS.talkToStrangers,
  keywords: [...SEO_KEYWORDS.talkToStrangers, ...SEO_KEYWORDS.primary],
  path: "/talk-to-strangers",
});

/**
 * Blog page metadata
 */
export const blogMetadata: Metadata = generatePageMetadata({
  title: `Blog - Video Chat Tips, Safety & Guides | ${BRAND.name}`,
  description: META_DESCRIPTIONS.blog,
  keywords: [...SEO_KEYWORDS.longTail, ...SEO_KEYWORDS.primary],
  path: "/blog",
});

/**
 * Guidelines page metadata
 */
export const guidelinesMetadata: Metadata = generatePageMetadata({
  title: `Community Guidelines | ${BRAND.name}`,
  description: META_DESCRIPTIONS.guidelines,
  path: "/guidelines",
});

/**
 * Generate comparison page metadata
 */
export function generateComparisonMetadata(competitorName: string, competitorSlug: string): Metadata {
  return generatePageMetadata({
    title: `${BRAND.name} vs ${competitorName} - Which is Better? [2025 Comparison]`,
    description: META_DESCRIPTIONS.compare(competitorName),
    keywords: [
      `${competitorSlug} alternative`,
      `${BRAND.name.toLowerCase()} vs ${competitorSlug}`,
      `better than ${competitorSlug}`,
      ...SEO_KEYWORDS.primary,
    ],
    path: `/compare/${competitorSlug}`,
  });
}

/**
 * Generate blog post metadata
 */
export function generateBlogPostMetadata(post: {
  title: string;
  description: string;
  slug: string;
  keywords?: string[];
  ogImage?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}): Metadata {
  const url = `${BRAND.url}/blog/${post.slug}`;
  const publishedTime = post.datePublished ? new Date(post.datePublished).toISOString() : undefined;
  const modifiedTime = post.dateModified ? new Date(post.dateModified).toISOString() : publishedTime;
  
  return {
    ...generatePageMetadata({
      title: `${post.title} | ${BRAND.name} Blog`,
      description: post.description,
      keywords: post.keywords || [...SEO_KEYWORDS.longTail],
      path: `/blog/${post.slug}`,
      ogImage: post.ogImage,
    }),
    // Article-specific metadata
    ...(publishedTime && {
      publishedTime: publishedTime,
    }),
    ...(modifiedTime && {
      modifiedTime: modifiedTime,
    }),
    authors: post.author ? [{ name: post.author }] : [{ name: BRAND.name }],
    openGraph: {
      ...OG_DEFAULTS,
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: publishedTime,
      modifiedTime: modifiedTime,
      authors: post.author ? [post.author] : [BRAND.name],
      images: post.ogImage ? [{ url: post.ogImage, width: 1200, height: 630, alt: post.title }] : [...OG_DEFAULTS.images],
    },
    twitter: {
      ...TWITTER_DEFAULTS,
      title: post.title,
      description: post.description,
      images: post.ogImage ? [post.ogImage] : [...TWITTER_DEFAULTS.images],
      card: "summary_large_image",
    },
  };
}

