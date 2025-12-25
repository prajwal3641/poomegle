/**
 * ============================================
 * OG IMAGE UTILITIES
 * ============================================
 * 
 * Helper functions for generating and managing Open Graph images.
 * For dynamic OG images, consider using @vercel/og or similar.
 * 
 * Note: Import BRAND from @/lib/seo instead of ./config
 */

// Import from the main SEO module instead
import { BRAND } from "@/lib/seo";

/**
 * Generate OG image URL
 * You can use this with @vercel/og for dynamic image generation
 * or point to static images in the public folder
 */
export function generateOGImageUrl(
  title: string,
  subtitle?: string,
  options?: {
    width?: number;
    height?: number;
  }
): string {
  // Option 1: Use static OG images from public folder
  // Place images in public/og/ folder and reference them
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  
  // Return path to static image or dynamic OG image endpoint
  return `${BRAND.url}/og/${slug}.png`;
}

/**
 * Default OG image dimensions
 */
export const OG_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const;

/**
 * Generate OG image metadata object
 */
export function createOGImage(
  url: string,
  title?: string,
  width: number = OG_IMAGE_DIMENSIONS.width,
  height: number = OG_IMAGE_DIMENSIONS.height
) {
  return {
    url,
    width,
    height,
    alt: title || BRAND.name,
  };
}

/**
 * Default OG image for the site
 * Update this path to point to your actual OG image
 */
export const DEFAULT_OG_IMAGE = `${BRAND.url}/og-image.svg`;

