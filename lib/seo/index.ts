/**
 * ============================================
 * POMEGLE SEO MODULE
 * ============================================
 * 
 * Central export for all SEO-related utilities.
 * 
 * Usage:
 *   import { BRAND, generatePageMetadata, HomeStructuredData } from "@/lib/seo";
 */

// Configuration and constants
export {
  BRAND,
  META_DESCRIPTIONS,
  SEO_KEYWORDS,
  ALL_KEYWORDS,
  STRUCTURED_DATA,
  DEFAULT_FAQS,
  OG_DEFAULTS,
  TWITTER_DEFAULTS,
  COMPETITORS,
  BLOG_CATEGORIES,
} from "./config";

// Metadata generators
export {
  generatePageMetadata,
  homeMetadata,
  omegleAlternativeMetadata,
  randomVideoChatMetadata,
  talkToStrangersMetadata,
  blogMetadata,
  guidelinesMetadata,
  generateComparisonMetadata,
  generateBlogPostMetadata,
} from "./metadata";

// Structured data components
export {
  JsonLd,
  WebApplicationJsonLd,
  OrganizationJsonLd,
  DefaultFAQJsonLd,
  FAQJsonLd,
  BreadcrumbJsonLd,
  ArticleJsonLd,
  SoftwareApplicationJsonLd,
  VideoObjectJsonLd,
  BaseStructuredData,
  HomeStructuredData,
} from "./structured-data";

